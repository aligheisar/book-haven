import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { addBook, getGenres } from "../supabase/books";
import { GetUser } from "./UserContext";
import { newBookSchema } from "../config/schema";
import { GetNotifi } from "./NotifiContext";
import { formatError } from "../util/format";
import { useNavigate } from "react-router-dom";

let NewBookContext = createContext();

export let GetNewBook = () => useContext(NewBookContext);

let NewBookProvider = ({ children }) => {
  let { user } = GetUser();
  let { addNotif } = GetNotifi();

  let navigate = useNavigate();

  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreInput, setGenreInput] = useState("");
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    let fetchGenres = async () => {
      let data = (await getGenres()).data.sort();
      setGenres(data);
      setLoadingGenres(false);
    };

    fetchGenres();
  }, []);

  let handleFormSubmit = async (e, formData) => {
    e.preventDefault();

    let formValues = {
      title: formData.title.value,
      description: formData.description.value,
      price: parseFloat(formData.price.value),
    };
    let response = newBookSchema.safeParse(formValues);

    if (!response.success) {
      addNotif({
        type: "danger",
        title: "Invalid Inputs",
        desc: "Form inputs are not Valid",
      });
      return;
    }

    let { title, description, price } = response.data;

    try {
      setUploading(true);
      let response = await addBook(
        user.username,
        title,
        description,
        price,
        imageFile,
        selectedGenres,
      );

      if (response.success) {
        addNotif({
          type: "success",
          title: "Book Added",
          desc: "your new book was added successfuly",
        });

        navigate(
          `/users/${encodeURIComponent(user.username)}/${encodeURIComponent(title)}`,
        );
      }
    } catch (error) {
      addNotif({
        type: "danger",
        ...formatError(error),
      });
    } finally {
      setUploading(false);
    }
  };

  let handleFileChange = async (e) => {
    let firstFile = e.target.files[0];

    if (!firstFile) return;
    setImageFile(firstFile);
    let imageUrl = URL.createObjectURL(firstFile);
    if (imageUrl) setImage(imageUrl);
  };

  let handleRemoveFile = () => {
    setImage(null);
    setImageFile(null);
  };

  const filteredGenres = useMemo(() => {
    return genres.filter(
      (genre) =>
        !selectedGenres.includes(genre) &&
        genre.toLowerCase().includes(genreInput.trim().toLowerCase()),
    );
  }, [genres, selectedGenres, genreInput]);

  let handleGenreInputFocus = () => {
    setShowGenres(true);
  };

  let handleGenreInputBlur = () => {
    setShowGenres(false);
  };

  let handleGenreInputChange = (e) => {
    let value = e.target.value;

    setGenreInput(value);
  };

  let clearGenreInput = () => {
    setGenreInput("");

    setSelectedGenres((prevSelected) => {
      const updatedSelectedGenres = [...prevSelected];
      return updatedSelectedGenres;
    });
  };

  let handleRemoveGenre = (name) => {
    setSelectedGenres((prevState) => prevState.filter((i) => i !== name));
  };

  let handleAddGenre = (name) => {
    setSelectedGenres((prevState) => [...prevState, name]);
    clearGenreInput();
  };
  let value = {
    uploading,
    filteredGenres,
    loadingGenres,
    selectedGenres,
    genreInput,
    showGenres,
    image,
    handleFormSubmit,
    handleFileChange,
    handleRemoveFile,
    handleGenreInputFocus,
    handleGenreInputBlur,
    handleGenreInputChange,
    clearGenreInput,
    handleRemoveGenre,
    handleAddGenre,
  };
  return (
    <NewBookContext.Provider value={value}>{children}</NewBookContext.Provider>
  );
};

export default NewBookProvider;

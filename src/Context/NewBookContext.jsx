import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { addBook, getGenres } from "../supabase/books";
import { GetUser } from "./UserContext";
import { validateNewBookInputs } from "../util/validate";
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

  const [formData, setFormData] = useState({
    title: { value: "", error: null },
    description: { value: "", error: null },
    price: { value: 0, error: null },
  });
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genreInput, setGenreInput] = useState("");

  useEffect(() => {
    let fetchGenres = async () => {
      let data = (await getGenres()).data.sort();
      setGenres(data);
      setLoadingGenres(false);
    };

    fetchGenres();
  }, []);

  const filteredGenres = useMemo(() => {
    return genres.filter(
      (genre) =>
        !selectedGenres.includes(genre) &&
        genre.toLowerCase().includes(genreInput.trim().toLowerCase()),
    );
  }, [genres, selectedGenres, genreInput]);

  let handleFormSubmit = async (e) => {
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

        navigate(`/users/${user.username}/${title}`);
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

  let handleFormChange = (e) => {
    let { name, value } = e.target;

    let error = validateNewBookInputs(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: { error, value },
    }));
  };

  let handleFileChange = async (e) => {
    let firstFile = e.target.files[0];

    if (!firstFile) return;
    setImageFile(firstFile);
    let imageUrl = URL.createObjectURL(firstFile);
    if (imageUrl) setImage(imageUrl);
  };

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
    formData,
    image,
    uploading,
    filteredGenres,
    loadingGenres,
    selectedGenres,
    genreInput,
    showGenres,
    handleFormSubmit,
    handleFileChange,
    handleFormChange,
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

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getGenres } from "../supabase/books";

let NewBookContex = createContext();

export let GetNewBook = () => useContext(NewBookContex);

let NewBookProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: { value: "", error: null },
    description: { value: "", error: null },
    price: { value: 0, error: null },
  });
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loadingGenres, setLoadingGenres] = useState(true);
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

  let handleFormSubmit = (e) => {
    e.preventDefault();
  };

  let handleFormChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
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
    let trimValue = value.trim();

    setGenreInput(value);

    if (!trimValue) {
    } else {
    }
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
    <NewBookContex.Provider value={value}>{children}</NewBookContex.Provider>
  );
};

export default NewBookProvider;

import { createContext, useContext, useState } from "react";

let NewBookContex = createContext();

export let GetNewBook = () => useContext(NewBookContex);

let NewBookProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: { value: "", error: null },
    description: { value: "", error: null },
    price: { value: 0, error: null },
  });
  const [imageUrl, setImageUrl] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  let handleFormChange = (e) => {
    let { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: { ...prev[name], value },
    }));
  };

  let handleFileChange = async (e) => {};

  let handleRemoveGenre = (name) => {
    setSelectedGenres((prevState) => prevState.filter((i) => i !== name));
    setGenres((prevState) => [...prevState, name]);
  };
  let handleAddGenre = (name) => {
    setSelectedGenres((prevState) => [...prevState, name]);
    setGenres((prevState) => prevState.filter((i) => i !== name));
  };
  let value = {
    formData,
    imageUrl,
    genres,
    selectedGenres,
    handleFileChange,
    handleFormChange,
    handleRemoveGenre,
    handleAddGenre,
  };
  return (
    <NewBookContex.Provider value={value}>{children}</NewBookContex.Provider>
  );
};

export default NewBookProvider;

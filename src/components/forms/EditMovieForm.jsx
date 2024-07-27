import React, { useState } from "react";
import "../../css/admin/CreateMovieForm.css";
import { Input, Textarea } from "@nextui-org/react";
import { Button } from "@mui/material";
import { GoBack } from "../common/GoBack";

export const EditMovieForm = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (title.trim() === "")
      newErrors.title = "El título de la película es requerido";
    if (genre.trim() === "")
      newErrors.genre = "El género de la película es requerido";
    if (image.trim() === "")
      newErrors.image = "La URL de la imagen es requerida";
    if (description.trim() === "")
      newErrors.description = "La descripción de la película es requerida";
    return newErrors;
  };

  const handleChange = (setter, field) => (event) => {
    setter(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log({ title, genre, image, description });
    }
  };

  const onCancel = () => {
    setTitle("");
    setGenre("");
    setImage("");
    setDescription("");
    setErrors({});
  };

  return (
    <>
      <h1 className="title">Editar Película</h1>
      <GoBack />
      <div className="forms">
        <Input
          className="input"
          label="Título de la película"
          placeholder="Ingrese el título de la película"
          labelPlacement="outside"
          isInvalid={!!errors.title}
          errorMessage={errors.title}
          value={title}
          onChange={handleChange(setTitle, "title")}
        />
        <Input
          className="input"
          label="Género de la película"
          placeholder="Ingrese el género de la película"
          labelPlacement="outside"
          isInvalid={!!errors.genre}
          errorMessage={errors.genre}
          value={genre}
          onChange={handleChange(setGenre, "genre")}
        />
        <Input
          className="input"
          label="Imagen de la película"
          placeholder="Ingrese la URL de la imagen"
          labelPlacement="outside"
          isInvalid={!!errors.image}
          errorMessage={errors.image}
          value={image}
          onChange={handleChange(setImage, "image")}
        />
        <Textarea
          className="textarea"
          label="Descripción de la película"
          placeholder="Ingrese la descripción de la película"
          labelPlacement="outside"
          rows={10}
          isInvalid={!!errors.description}
          errorMessage={errors.description}
          value={description}
          onChange={handleChange(setDescription, "description")}
        />
        <div className="buttons">
          <Button variant="contained" className="save" onClick={onSubmit}>
            Actualizar Película
          </Button>
          <Button variant="contained" className="cancel" onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    </>
  );
};

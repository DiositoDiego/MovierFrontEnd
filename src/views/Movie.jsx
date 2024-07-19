import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function Movie() {
  
  const { id } = useParams();

  const movie = {
    id: 1,
    title: "Movie 1",
    description: "Description 1",
    image: "https://picsum.photos/"+500,
    genre: "Genre 1",
    status: "Available",
  }

  return (
    <div>
      <h1>
        { id }
      </h1>
      <Container fluid>
        <img src={movie.image} alt={movie.title} />
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <p>Genre: {movie.genre}</p>
        <p>Status: {movie.status}</p>
      </Container>
    </div>
  );
}

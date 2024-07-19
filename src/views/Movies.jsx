import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import api from '../config/axios/client-gateway'
import './styles.css'
import { Link, useNavigate } from "react-router-dom";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const imgSize = 300;
  const navigate = useNavigate();

  useEffect(() => {
    getMovies();
  }, [window.location.toString()]);

  const handleClick = (id) => {
    navigate(`/movies/m/${id}`);
  }

  const getMovies = async () => {
    const response = await api.doGet("/getAll");

    const newMovies = [
      {
        id: 1,
        title: "Movie 1",
        description: "Description 1",
        image: "https://picsum.photos/"+imgSize,
        genre: "Genre 1",
        status: "Available",
      },
      {
        id: 2,
        title: "Movie 2",
        description: "Description 2",
        image: "https://picsum.photos/"+imgSize,
        genre: "Genre 2",
        status: "Available",
      },
      {
        id: 3,
        title: "Movie 3",
        description: "Description 3",
        image: "https://picsum.photos/"+imgSize,
        genre: "Genre 3",
        status: "Available",
      },
      {
        id: 4,
        title: "Movie 4",
        description: "Description 4",
        image: "https://picsum.photos/"+imgSize,
        genre: "Genre 4",
        status: "Available",
      },
      {
        id: 5,
        title: "Movie 5",
        description: "Description 5",
        image: "https://picsum.photos/"+imgSize,
        genre: "Genre 5",
        status: "Available",
      }
    ]
    setMovies(newMovies);
  };

  const styles = {
    card: {
      width: imgSize + 'px',
      margin: '10px'
    }
  }

  return (
    <div>
      <Container fluid className="movies-container">
        {
          movies.map((movie) => {
            return (
              <Card onClick={() => handleClick(movie.id)} key={movie.id} style={styles.card} className="movie">
                <Card.Img variant="top" src={movie.image} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.description.substring(0,5)} <Link>...más</Link> </Card.Text>
                </Card.Body>
              </Card>
            )
          })
        }
      </Container>
    </div>
  );
}

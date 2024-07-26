import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import api from '../config/axios/client-gateway'
import './styles.css'
import { Link, useNavigate } from "react-router-dom";
import endpoints from "../utils/endpoints";
import Loader from "./common/Loader";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const imgSize = 300;
  const navigate = useNavigate();

  useEffect(() => {
    getMovies();
  }, [window.location.toString()]);

  const handleClick = (id) => {
    navigate(`/movies/m/${id}`);
  }

  const getMovies = async () => {
    setIsLoading(true);
    try {
      const response = await api.doGet(endpoints.GetMovieFunction);
      if(response && response.status === 200){
        setMovies(response.data.Peliculas);
      }
    } catch (error) {
      console.log({error});
      
    } finally {
      setIsLoading(false);
    }
  };

  const styles = {
    card: {
      width: imgSize + 'px',
      margin: '10px'
    }
  }

  return (
    <div className="d-flex justify-content-center">
      <Container fluid className="movies-container">
        {
          isLoading ? <Loader /> 
        :
          movies.length > 0 ? movies.map((movie) => {
            return (
              <Card onClick={() => handleClick(movie.id)} key={movie.id} style={styles.card} className="movie">
                <Card.Img variant="top" src={movie.image} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.description.substring(0,75)} <Link>...más</Link> </Card.Text>
                </Card.Body>
              </Card>
            )
          }) 
          : null
        }
      </Container>
    </div>
  );
}

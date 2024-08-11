// navigation/SearchModal.js
import React, { useState, useEffect } from "react";
import { Modal, Container, Form } from "react-bootstrap";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button, CardMedia } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import endpoints from "../../utils/endpoints";
import Loader from "../../views/common/Loader";
import { Input } from "@nextui-org/react";
import SearchIcon from "@mui/icons-material/Search";

const SearchModal = ({ initialSearchQuery, show, handleClose }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery || "");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchQuery) {
      searchMovies(searchQuery);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (!show) {
      setSearchQuery("");
      setMovies([]); 
    }
  }, [show]);

  const searchMovies = async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.get(endpoints.SearchMoviesFunction(query));
      if (response && response.status === 200) {
        setMovies(response.data.Peliculas);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClick = (id) => {
    navigate(`/movies/m/${id}`);
    handleClose(); 
  };
  

  const styles = {
    modalContent: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      padding: '20px',
    },
    card: {
      width: '200px',
      margin: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
      overflow: 'hidden',
      height: 'auto', 
    },
    cardMedia: {
      height: '200px', 
      width: '100%',
      objectFit: 'cover',
    },
    titleText: {
      fontWeight: 'bold',
      fontSize: 'large',
    },
    descriptionText: {
      fontSize: '14px',
    },
    button: {
      width: '100%',
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Resultados de la búsqueda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="form">
          <Input
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Busca películas"
            startContent={
              <div>
                <SearchIcon className="search" />
              </div>
            }
          />
        </Form>
        <Container fluid style={styles.modalContent}>
          {isLoading ? (
            <Loader />
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <Card key={movie.id} style={styles.card}>
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                  <h4 style={styles.titleText}>
                    {movie.title.length > 24 ? movie.title.substring(0, 24) + "..." : movie.title}
                  </h4>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                  <CardMedia
                    style={styles.cardMedia}
                    image={movie.image}
                    title="Movie Image"
                  />
                  <p style={styles.descriptionText}>
                    {movie.description.substring(0, 50)}
                    <span>...</span>
                  </p>
                </CardBody>
                <CardFooter className="flex-col items-center">
                  <Button
                    variant="contained"
                    auto
                    onClick={() => handleClick(movie.id)}
                    style={styles.button}
                  >
                    Ver más
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <p>No se encontraron resultados.</p>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default SearchModal;

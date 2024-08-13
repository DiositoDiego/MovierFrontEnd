import React, { useState, useEffect } from "react";
import { Modal, Container, Form } from "react-bootstrap";
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
  let timeoutId;

  useEffect(() => {
    if (!show) {
      setSearchQuery("");
      setMovies([]);
    }
  }, [show]);

  const searchMovies = async (query) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${endpoints.SearchMoviesFunction}${query}`);
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
    const value = e.target.value;
    setSearchQuery(value);

    clearTimeout(timeoutId); 
    if (value) {
      timeoutId = setTimeout(() => {
        searchMovies(value);
      }, 500);
    } else {
      setMovies([]); 
    }
  };

  const handleClick = (id) => {
    navigate(`/movies/m/${id}`);
    handleClose(); 
  };

  const styles = {
    modalContent: {
      display: 'flex',
      flexDirection: 'column',
      padding: '20px',
    },
    listItem: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderBottom: '1px solid #ddd',
      cursor: 'pointer',
    },
    listItemImage: {
      height: '50px',
      width: '50px',
      marginRight: '10px',
      objectFit: 'cover',
      borderRadius: '5px',
    },
    listItemText: {
      display: 'flex',
      flexDirection: 'column',
    },
    listItemTitle: {
      fontWeight: 'bold',
      fontSize: 'large',
    },
    listItemDescription: {
      fontSize: '14px',
      color: '#666',
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
              <div key={movie.id} style={styles.listItem} onClick={() => handleClick(movie.id)}>
                <img 
                  src={movie.image} 
                  alt={movie.title} 
                  style={styles.listItemImage} 
                />
                <div style={styles.listItemText}>
                  <p style={styles.listItemTitle}>
                    {movie.title.length > 24 ? movie.title.substring(0, 24) + "..." : movie.title}
                  </p>
                  <p style={styles.listItemDescription}>
                    {movie.description.substring(0, 50)}...
                  </p>
                </div>
              </div>
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

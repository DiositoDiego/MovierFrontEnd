import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Input } from "@nextui-org/react";
import SearchIcon from "@mui/icons-material/Search";
import "../../css/navigation/MovierNavbar.css";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import LogoutIcon from "@mui/icons-material/Logout";
import SearchModal from "./SearchModal"; // Importa el modal

export default function MoviesNavbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchClick = () => {
    setShowModal(true); 
  };
  const handleClose = () => {
    setSearchQuery(''); 
    setShowModal(false); 
  };

  return (
    <div>
      <Navbar className="nav" bg="light" expand="lg">
        <Container fluid className="nav">
          <Navbar href="/movies" className="brand">
            <a className="logo" href="/home">
              <p>MOVIER</p>
            </a>
          </Navbar>
          <Form className="form">
            <Input
              placeholder="Busca películas"
              startContent={
                <div>
                  <SearchIcon className="search" />
                </div>
              }
              value={searchQuery}
              onClick={handleSearchClick} 
              onChange={handleSearchChange} 
            />
          </Form>
          <Navbar className="user">
            <IconButton aria-label="delete">
              <Link to="/movies/watched">
                <MovieFilterIcon fontSize="large" />
              </Link>
            </IconButton>
            <IconButton aria-label="delete">
              <PersonIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="delete">
              <Link to="/logout">
                <LogoutIcon fontSize="large" />
              </Link>
            </IconButton>
          </Navbar>
        </Container>
      </Navbar>
      <SearchModal 
        initialSearchQuery={searchQuery}
        show={showModal}
        handleClose={handleClose} 
      />
      <Outlet />
    </div>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Input } from "@nextui-org/react";
import SearchIcon from "@mui/icons-material/Search";
import "../../css/navigation/MovierNavbar.css";
import PersonIcon from "@mui/icons-material/Person";
import { IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
export default function MoviesNavbar() {
  return (
    <div>
      <Navbar className="nav" bg="light" expand="lg">
        <Container fluid className="nav">
          <Navbar href="/movies" className="brand">
            <a className="logo" href="/movies">
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
            />
          </Form>
          <Navbar className="user">
            <IconButton aria-label="delete">
              <PersonIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="delete">
              <LogoutIcon fontSize="large" />
            </IconButton>
          </Navbar>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

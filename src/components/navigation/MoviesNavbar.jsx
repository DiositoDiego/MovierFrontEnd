import React from "react";
import { Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Input } from "@nextui-org/react";
import SearchIcon from "@mui/icons-material/Search";
import "../../css/navigation/MovierNavbar.css";
import PersonIcon from "@mui/icons-material/Person";
import { Dropdown, Nav, NavDropdown } from "react-bootstrap";
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
            <Nav>
              <NavDropdown title={
                <>
                  <label style={{width: '100px'}}></label>
                  <PersonIcon fontSize="large" />
                </>
              } >
                <NavDropdown.Item href="/logout">Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}

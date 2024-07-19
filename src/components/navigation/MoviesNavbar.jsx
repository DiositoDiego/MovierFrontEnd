import React from "react";
import { Outlet } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Form from'react-bootstrap/Form';
import FormControl from'react-bootstrap/FormControl';
import { FaSearch, FaUser } from'react-icons/fa';
import { InputGroup, Button } from "react-bootstrap";


export default function MoviesNavbar() {

  const styles = {
    brand: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: '20px'
    },
    user: {
      margin: '20px'
    }
  }

  return ( 
  <div>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/movies" style={styles.brand}>
          <img
            src="https://picsum.photos/150"
            width="100"
            height="50"
            className="d-inline-block align-top"
            alt="Logo X"
          />
          <h4>
            Movier
          </h4>
        </Navbar.Brand>
        <Form className="d-flex">
          <InputGroup>
            <FormControl
              type="search"
              placeholder="Search"
              size="lg"
              aria-label="Search"
              style={{ width: '800px' }}
              />
              <Button variant="secondary" id="button-addon2">
                <FaSearch size={30}/>
              </Button>
          </InputGroup>
        </Form>
        <Navbar.Text style={styles.user}>
          <FaUser size={35} />
        </Navbar.Text>
      </Container>
    </Navbar>
    <Outlet/>
  </div>
  );
}

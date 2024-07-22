import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import './styles.css'

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

  const styles = {
    container: {
      padding: '20px',
      border: '1px solid #ccc'
    }
  }

  return (
    <Container fluid style={styles.container}>
      <Row>
        <Col xl={3} >
          <img src={movie.image} alt={movie.title} />
        </Col>
        <Col xl={5}>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <h4>{movie.genre}</h4>
        </Col>
        <Col xl={1} className="d-flex justify-content-center">
          <div className="vertical-line" />
        </Col>
        <Col xl={3}>
          <h3>Reservas</h3>
          <p>Estatus: {movie.status}</p>
        </Col>
      </Row>
    </Container>
  );
}

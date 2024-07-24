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
      backgroundColor: "#555555"
    },
    textColorWhite: {
      color: "white"
    }
  }

  return (
    <div>
      <Container fluid style={styles.container}>
        <Row>
          <Col xl={4} >
            <img src={movie.image} alt={movie.title} />
          </Col>
          <Col xl={5}>
            <Row>
              <Col>
                <h2 style={styles.textColorWhite}>{movie.title}</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={styles.textColorWhite}>{movie.description}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h5 style={styles.textColorWhite}>{movie.genre}</h5>
              </Col>
            </Row>
          </Col>
          <Col xl={1} className="d-flex justify-content-center">
            <div className="vertical-line" />
          </Col>
          <Col xl={2}>
            <h3 style={styles.textColorWhite}>Reservas</h3>
            <p style={styles.textColorWhite}>Estatus: {movie.status}</p>
          </Col>
        </Row>
      </Container>

    </div>
  );
}

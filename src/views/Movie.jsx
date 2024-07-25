import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import './styles.css'
import CommentForm from "../components/forms/CommentForm";

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
    mainContainer: {
      padding: '20px',
      backgroundColor: "#555555"
    },
    commentContainer: {
      width: '35%',
    },
    textColorWhite: {
      color: "white"
    }
  }

  return (
    <div>
      <Container fluid style={styles.mainContainer}>
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
      <Container className="mt-5" style={styles.commentContainer}>
        <CommentForm rows={4} />
      </Container>
      <hr />
      <Container fluid>
        
      </Container>
    </div>
  );
}

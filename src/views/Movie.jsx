import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "../css/movies/movie.css";
import CommentForm from "../components/forms/CommentForm";
import Comment from "../components/misc/Comment";
import api from "../config/axios/client-gateway";
import endpoints from "../utils/endpoints";
import Loader from "./common/Loader";
import { Chip } from "@nextui-org/react";
import { Button } from "@mui/material";
import MoviesNavbar from "../components/navigation/MoviesNavbar";

export default function Movie() {
  const { id } = useParams();

  const [comments, setComments] = useState([]);
  const [movie, setMovie] = useState({});
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [isWatchedLoading, setIsWatchedLoading] = useState(false);

  useEffect(() => {
    fetchMovie(id);
    fetchComments(id);
  }, [id]);

  const fetchMovie = async (id) => {
    try {
      setIsMovieLoading(true);
      const response = await api.doGet(endpoints.GetMovieByIdFunction + id);
      if (response && response.status === 200) {
        setMovie(response.data.Pelicula);
      }
    } catch (error) {
      console.error("Error fetching movie:", error);
    } finally {
      setIsMovieLoading(false);
    }
  };

  const fetchComments = async (id) => {
    try {
      setIsCommentsLoading(true);
      const response = await api.doGet(endpoints.GetCommentsFunction + id);
      if (response && response.status === 200) {
        setComments(response.data.Comentarios);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsCommentsLoading(false);
    }
  };

  const handleClick = async() => {
    setIsWatchedLoading(true);
    try {
      const response = await api.doPost(endpoints.WatchedMovieFunction, {
        movie_id: parseInt(id),
        user_id: parseInt(localStorage.getItem("userId")),
      });
      if (response && response.status === 200) {
        
      }
    } catch (error) {} finally {
      setIsWatchedLoading(false);
    }
  }

  return (
    <div>
      {isMovieLoading ? (
        <div className="loader-container">
          <Loader />
        </div>
      ) : (
        <div>
          <MoviesNavbar />
          <Container fluid className="mainContainer">
            <Row>
              <Col xl={4} className="Col">
                <img
                  src={movie.image || ""}
                  className="img"
                  alt={movie.title}
                  title={movie.title}
                />
              </Col>
              <Col xl={5} className="d-flex flex-column">
                <Row>
                  <Col>
                    <h1 className="textColorWhite title-movie-2">
                      {movie.title}
                    </h1>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="textColorWhite">{movie.description}</p>
                  </Col>
                </Row>
                <Row className="align-self-end">
                  <Col>
                    <h5 className="textColorWhite">Género: {movie.genre}</h5>
                  </Col>
                </Row>
                <Col>
                  <Button onClick={handleClick} className="button-movie" variant="contained">
                    { !isWatchedLoading ?
                      "Marcar como vista"
                      :
                      <Spinner size="sm" />
                    }
                  </Button>
                </Col>
              </Col>
              <Col xl={1} className="d-flex justify-content-center">
                <div className="vertical-line" />
              </Col>
              <Col xl={2}>
                <h3 className="textColorWhite mr-2">Estado</h3>
                <Chip color={movie.status === 1 ? "primary" : "error"}>
                  {movie.status === 1 ? "Activa" : "Inactiva"}
                </Chip>
                {/* AQUI CAMBIAR POR EL ESTADO DEL GET WATCHED */}
                <Chip
                  className="mx-2"
                  color={movie.status === 1 ? "primary" : "error"}
                >
                  {movie.status === 1 ? "Vista" : "No vista"}
                </Chip>
              </Col>
            </Row>
          </Container>
          <hr />

          <Container className="mt-5 commentContainer">
            <CommentForm rows={4} fetchComments={fetchComments} idMovie={id} />
          </Container>
          <hr />
          <Container className="mb-5" fluid>
            {isCommentsLoading ? (
              <div className="w-100 d-flex justify-content-center">
                <Spinner size="md" />
              </div>
            ) : (
              <div>
                <h2 className="text-center mb-3 comment-title">Comentarios</h2>
                {comments && comments.length > 0 ? (
                  comments.map((m) => (
                    <div key={m.comment_id}>
                      <Comment
                        comment={m.comment}
                        date={m.date}
                        user={m.username}
                      />
                    </div>
                  ))
                ) : (
                  <Alert variant="warning">
                    No hay comentarios disponibles.
                  </Alert>
                )}
              </div>
            )}
          </Container>
        </div>
      )}
    </div>
  );
}

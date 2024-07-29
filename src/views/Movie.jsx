import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import './styles.css'
import CommentForm from "../components/forms/CommentForm";
import Comment from "../components/misc/Comment";
import api from "../config/axios/client-gateway";
import endpoints from "../utils/endpoints";
import Loader from "./common/Loader";

export default function Movie() {
  
  const { id } = useParams();

  const [comments, setComments] = useState([])
  const [movie, setMovie] = useState({});
  const [isMovieLoading, setIsMovieLoading] = useState(false);
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);

  useEffect(() => {
    fetchMovie(id);
    fetchComments(id);
  }, []);

  const fetchMovie = async (id) => {
    try {
      setIsMovieLoading(true);
      const response = await api.doGet(endpoints.GetMovieByIdFunction+id);
      if(response && response.status === 200){
        setMovie(response.data.Pelicula);
      }
    } catch (error) {} finally {
      setIsMovieLoading(false);
    }
  }

  const fetchComments = async (id) => {
    try {
      setIsCommentsLoading(true);
      const response = await api.doGet(endpoints.GetCommentsFunction+id);
      if(response && response.status === 200){
        setComments(response.data.Comentarios);
      }
    } catch (error) {} finally {
      setIsCommentsLoading(false);
    }
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
    },
    Col: {
      maxHeight: '450px',
      display: 'flex',
      justifyContent: 'center'
    },
    img: {
      height: '100%',
      width: 'auto',
    }
  }

  return (
    <div>
      { !isMovieLoading  ?
        <div>
          <Container fluid style={styles.mainContainer}>
            <Row>
              <Col xl={4} style={styles.Col} >
                <img src={movie.image || ''} style={styles.img}/>
              </Col>
              <Col xl={5} className="d-flex flex-column">
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
                <Row className="align-self-end" >
                  <Col>
                    <h5 style={styles.textColorWhite}>Género: {movie.genre}</h5>
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
            <CommentForm rows={4} fetchComments={fetchComments} idMovie={id} />
          </Container>
          <hr />
            <Container className="mb-5" fluid>
              { !isCommentsLoading ?
                <div>
                  { comments && comments.length > 0 ? comments.map((m) => {
                      return <div key={m.comment_id}><Comment comment={m.comment} date={m.date} user={m.username} /></div>
                    }) : <Alert variant="warning">No hay comentarios disponibles.</Alert>
                  }
                </div>
                :
                <div className="w-100 d-flex justify-content-center">
                  <Spinner size="md" />
                </div>
              }
            </Container>
        </div>
        :
        <div>
          <Loader />
        </div>
      }
    </div>
  );
}

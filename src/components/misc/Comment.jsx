import React from "react";
import { Card, Container } from "react-bootstrap";

export default function Comment(props) {

  const { comment, date, user } = props;

  return (
  <Container className="mb-3">
    <Card>
      <Card.Body>
        <div className="d-flex justify-content-between">
          <Card.Title>{user}</Card.Title>
          <div className="text-end w-100">
            <small className="text-muted">
              Fecha de publicación: {new Date(date).toLocaleString()}
            </small>
          </div>
        </div>
        <Card.Text>{comment}</Card.Text>
      </Card.Body>
    </Card>
  </Container>
  );
}

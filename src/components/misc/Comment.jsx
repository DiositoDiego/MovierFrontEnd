import React from "react";
import { Card, Container } from "react-bootstrap";
import "../../css/misc/comment.css";
export default function Comment(props) {
  const { comment, date, user } = props;

  return (
    <Container className="mb-4">
      <Card className="comment-card">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <Card.Title className="comment-user">{user}</Card.Title>
            <div className="text-end">
              <small className="text-muted comment-date">
                {new Date(date).toLocaleString()}
              </small>
            </div>
          </div>
          <Card.Text className="comment-text">{comment}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

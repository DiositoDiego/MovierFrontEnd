import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

export default function SignUpForm() {
  const styles = {
    container: {
      backgroundColor: "#F9F9F9",
      borderRadius: "25px",
      padding: "50px",
      display: "flex",
      justifyContent: "center",
      width: "50%",
    },
    form: {
      width: "80%",
    },
    formText: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "10px",
    },
  };

  return (
    <>
      <Row>
        <Col>
          <h3>¡Regístrate con nosotros!</h3>
        </Col>
      </Row>
      <Container style={styles.container}>
        <Form style={styles.form}>
          <Form.Group className="mb-3" controlId="usernameFormCreate">
            <Form.Label>Nombre de usuario:</Form.Label>
            <Form.Control type="text" placeholder="username123" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="emailFormCreate">
            <Form.Label>Correo:</Form.Label>
            <Form.Control type="email" placeholder="correo@example.com" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordFormCreate">
            <Form.Label>Contraseña:</Form.Label>
            <Form.Control type="password" placeholder="example123" />
          </Form.Group>
          <Button variant="primary" style={{ width: "100%" }} type="submit">
            Registrarse
          </Button>
          <Form.Text className="text-muted" style={styles.formText}>
            ¿Ya tienes cuenta?&nbsp;<a href="login">Inicia sesión.</a>
          </Form.Text>
        </Form>
      </Container>
    </>
  );
}

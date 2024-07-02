import React from "react";
import { Button, Container, Form } from "react-bootstrap";

export default function LoginForm() {

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
      width: "80%"
    },
    formText: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "10px",
    }
  }

  return (
    <Container style={styles.container}>
      <Form style={styles.form}>
        <Form.Group className="mb-3" controlId="emailForm">
          <Form.Label>Ingresa tu correo:</Form.Label>
          <Form.Control type="email" placeholder="correo@example.com" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordForm">
          <Form.Label>Ingresa tu contraseña:</Form.Label>
          <Form.Control type="password" placeholder="example123" />
        </Form.Group>
        <Button variant="primary" style={{ width: '100%' }} type="submit">
          Iniciar sesión
        </Button>
        <Form.Text className="text-muted" style={styles.formText}>
          ¿No tienes cuenta?&nbsp;<a href="signup">Crea una.</a>
        </Form.Text>
      </Form>
    </Container>
  );
}

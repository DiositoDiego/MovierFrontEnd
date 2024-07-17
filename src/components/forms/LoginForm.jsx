import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { emailRegex, passwordRegex } from "../../utils/regex";
import api from "../../config/axios/client-gateway";

export default function LoginForm() {

  const [email, setEmail ] = useState("");
  const [password, setPassword ] = useState("");

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

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();
    if(validateEmail(email) && validatePassword(password)){
      console.log({email, password});
      const response = ""//await api.doPost("/login", { username: email, password: password });
      fetch("https://zhhrsa4dth.execute-api.us-east-1.amazonaws.com/Prod/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password: password }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
      console.log({response});
    } else {
      console.log("Campos invalidos");
    }
  }

  const validateEmail = (email) => {
    return Boolean(email) && emailRegex.test(email);
  }

  const validatePassword = (password) => {
    return Boolean(password) && passwordRegex.test(password);
  }

  return (
    <Container style={styles.container}>
      <Form onSubmit={handleSubmitForm} style={styles.form}>
        <Form.Group className="mb-3" controlId="emailForm">
          <Form.Label>Ingresa tu correo:</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="correo@example.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordForm">
          <Form.Label>Ingresa tu contraseña:</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="example123" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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

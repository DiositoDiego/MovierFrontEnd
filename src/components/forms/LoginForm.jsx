import React, { useState, useEffect } from "react";
import { Button, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { emailRegex, passwordRegex } from "../../utils/regex";
import api from "../../config/axios/client-gateway";
import endpoints from "../../utils/endpoints";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
  };

  useEffect(() => {
    if (isSubmitted) {
      setValidEmail(emailRegex.test(email));
    }
  }, [email, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      setValidPassword(passwordRegex.test(password));
    }
  }, [password, isSubmitted]);

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();
    setIsSubmitted(true);

    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = passwordRegex.test(password);

    setValidEmail(isEmailValid);
    setValidPassword(isPasswordValid);

    if (!isLoading && isEmailValid && isPasswordValid) {
      setIsLoading(true);
      try {
        const response = await api.doPost(endpoints.LoginFunction, { username: email, password: password });
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.access_token);
          localStorage.setItem("refreshToken", response.data.refresh_token);
          localStorage.setItem("idToken", response.data.id_token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("userId", response.data.id);
          window.location.href = "/movies";
        }
      } catch (e) {} finally {
        setIsLoading(false);
      }
    }
  };

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
            className={validEmail ? "" : "border-error"}
          />
          {isSubmitted && !validEmail && (
            <Form.Text className="message-error">
              Correo electrónico no válido.
            </Form.Text>
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="passwordForm">
          <Form.Label>Ingresa tu contraseña:</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="example123"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={validPassword ? "" : "border-error"}
            />
            <Button variant="secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {isSubmitted && !validPassword && (
            <Form.Text className="message-error">
              Contraseña no válida.
            </Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" disabled={isLoading} style={{ width: '100%' }} type="submit">
          {!isLoading ? "Iniciar sesión" : <Spinner animation="border" size="sm" role="status" />}
        </Button>
        <Form.Text className="text-muted" style={styles.formText}>
          ¿No tienes cuenta?&nbsp;<a href="signup">Crea una.</a>
        </Form.Text>
      </Form>
    </Container>
  );
}

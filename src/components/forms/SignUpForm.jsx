import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { emailRegex } from "../../utils/regex";
import Swal from "sweetalert2";
import api from "../../config/axios/client-gateway";
import endpoints from "../../utils/endpoints";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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
      width: "80%",
    },
    formText: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "10px",
    },
  };

  useEffect(() => {
    if (isSubmitted) {
      setValidEmail(emailRegex.test(email));
    }
  }, [email, isSubmitted]);

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();
    setIsSubmitted(true);

    const isEmailValid = emailRegex.test(email);
    setValidEmail(isEmailValid);

    if (!isLoading && isEmailValid) {
      setIsLoading(true);

      try {
        const response = await api.doPost(endpoints.CreateUserFunction, {
          username: email,
          user_name: email
        });
        console.log({ response });

        Swal.fire({
          title: "¡Éxito!",
          text: "Se ha enviado un email con una contraseña temporal, por favor inicia sesión para completar el registro.",
          icon: "success",
          confirmButtonText: "Ir a inicio de sesión",
          allowEscapeKey: false,
          allowOutsideClick: false,
          showConfirmButton: true,
          focusConfirm: true,
        }).then(() => {
          window.location.href = "/login";
        });
      } catch (e) {} finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <h3>¡Regístrate con nosotros!</h3>
        </Col>
      </Row>
      <Container style={styles.container}>
        <Form onSubmit={handleSubmitForm} style={styles.form}>
          <Form.Group className="mb-3" controlId="emailFormCreate">
            <Form.Label>Correo:</Form.Label>
            <Form.Control
              className={validEmail ? "" : "border-error"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@example.com"
            />
            {isSubmitted && !validEmail && (
              <Form.Text className="message-error">
                Ingresa un correo electrónico válido.
              </Form.Text>
            )}
          </Form.Group>
          <Button variant="primary" disabled={isLoading} style={{ width: "100%" }} type="submit">
            {!isLoading ? "Registrarse" : <Spinner size="sm" />}
          </Button>
          <Form.Text className="text-muted" style={styles.formText}>
            ¿Ya tienes cuenta?&nbsp;<a href="login">Inicia sesión.</a>
          </Form.Text>
        </Form>
      </Container>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { emailRegex, passwordRegex } from "../../utils/regex";
import api from "../../config/axios/client-gateway";
import endpoints from "../../utils/endpoints";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../../css/auth/Login.css";
import { Button } from "@mui/material";
import { Input } from "@nextui-org/react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!emailRegex.test(email)) newErrors.email = "Email no válido";
    if (!passwordRegex.test(password))
      newErrors.password = "Contraseña no válida";
    return newErrors;
  };

  const handleChange = (setter, field) => (event) => {
    setter(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();
    setIsSubmitted(true);
    const newErrors = validate();
    setErrors(newErrors);

    if (!isLoading && Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await api.doPost(endpoints.LoginFunction, {
          username: email,
          password: password,
        });
        if (response.status === 200) {
          localStorage.setItem("accessToken", response.data.access_token);
          localStorage.setItem("refreshToken", response.data.refresh_token);
          localStorage.setItem("idToken", response.data.id_token);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("userId", response.data.id);
          window.location.href = "/movies";
        } else {
          setErrors({ form: "Error en el inicio de sesión" });
        }
      } catch (e) {
        setErrors({ form: "Error en el inicio de sesión" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <h1 className="title movier">MOVIER</h1>
      <h4 className="subtitle">Inicia Sesión</h4>
      <Container className="login-container">
        <Form onSubmit={handleSubmitForm} className="form-group">
          <Form.Group className="mb-3" controlId="emailForm">
            <Input
              type="email"
              label="Email"
              placeholder="Ingresa tu correo electrónico"
              value={email}
              onChange={handleChange(setEmail, "email")}
              errorMessage={errors.email}
              isInvalid={!!errors.email}
              color="secondary"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="passwordForm">
            <Input
              type={showPassword ? "text" : "password"}
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={handleChange(setPassword, "password")}
              endContent={
                <Button onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </Button>
              }
              color="secondary"
              errorMessage={errors.password}
              isInvalid={!!errors.password}
            />
          </Form.Group>
          {errors.form && <p className="error-message">{errors.form}</p>}
          <Button
            variant="contained"
            disabled={isLoading}
            className="button-submit"
            type="submit"
          >
            {!isLoading ? (
              "Iniciar sesión"
            ) : (
              <Spinner animation="border" size="sm" role="status" />
            )}
          </Button>
        </Form>
        <div className="create-account">
          <p className="text-account">
            ¿No tienes una cuenta? <a href="/signup">Regístrate aquí</a>
          </p>
        </div>
      </Container>
    </>
  );
}

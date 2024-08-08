import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Container, Form, InputGroup } from "react-bootstrap";
import { Spinner } from "@nextui-org/react";
import { passwordRegex } from "../../utils/regex";
import api from "../../config/axios/client-gateway";
import endpoints from "../../utils/endpoints";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { Input } from "@nextui-org/react";

export default function CompleteLoginForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

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
  };

  const validate = () => {
    const newErrors = {};
    if (!passwordRegex.test(password)) newErrors.password = "Contraseña no válida";
    if (password !== confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    return newErrors;
  };

  const handleChange = (setter, field) => (event) => {
    setter(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (!isLoading && Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const response = await api.doPost(endpoints.SetPasswordFunction, {
          username: localStorage.getItem('email'),
          temporary_password: localStorage.getItem('password'),
          new_password: password,
        });

        if (response.status === 200) {
          Swal.fire({
            title: "¡Éxito!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "Cerrar",
            allowEscapeKey: false,
          }).then(async () => {
            Swal.fire({
              html: '<h3>Iniciando sesión...</h3><span class="spinner-border spinner-border-sm"></span>',
              showConfirmButton: false,
              allowOutsideClick: false,
              allowEscapeKey: false,
            });

            const responseLogin = await api.doPost(endpoints.LoginFunction, {
              username: localStorage.getItem('email'),
              password: password
            });

            if (responseLogin.status === 200) {
              localStorage.removeItem('email');
              localStorage.removeItem('password');
              localStorage.setItem("accessToken", responseLogin.data.access_token);
              localStorage.setItem("refreshToken", responseLogin.data.refresh_token);
              localStorage.setItem("idToken", responseLogin.data.id_token);
              localStorage.setItem("role", responseLogin.data.role);
              localStorage.setItem("userId", responseLogin.data.id);
              window.location.href = "/movies";
            }
          });
        }
      } catch (error) {
        setErrors({ form: "Error en el proceso de completar el registro" });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Container fluid style={styles.container}>
      <Form onSubmit={handleSubmitForm} style={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Input
            type={showPassword ? "text" : "password"}
            label="Nueva contraseña"
            placeholder="Ingresa tu nueva contraseña"
            value={password}
            onChange={handleChange(setPassword, "password")}
            endContent={
              <Button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            }
            errorMessage={errors.password}
            isInvalid={!!errors.password}
            color="secondary"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmedPassword">
          <Input
            type={showPassword ? "text" : "password"}
            label="Confirmar nueva contraseña"
            placeholder="Confirma tu nueva contraseña"
            value={confirmPassword}
            onChange={handleChange(setConfirmPassword, "confirmPassword")}
            endContent={
              <Button onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            }
            errorMessage={errors.confirmPassword}
            isInvalid={!!errors.confirmPassword}
            color="secondary"
          />
        </Form.Group>
        {errors.form && <p className="error-message">{errors.form}</p>}
        <Form.Text className="mb-3">
          Recuerda que tu contraseña debe contener mínimo 8 caracteres con al menos: <br />
          - Una letra mayúscula. <br />
          - Una letra minúscula. <br />
          - Un número. <br />
          - Un carácter especial. <br />
        </Form.Text>
        <Button variant="contained" className="mt-3" disabled={isLoading} style={{ width: "100%" }} type="submit">
          {!isLoading ? "Completar registro" : <Spinner color="secondary" />}
        </Button>
      </Form>
    </Container>
  );
}

import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button, Container, Form, InputGroup, Spinner } from "react-bootstrap";
import { passwordRegex } from "../../utils/regex";
import api from "../../config/axios/client-gateway";
import endpoints from "../../utils/endpoints";
import Swal from "sweetalert2";

export default function CompleteLoginForm() {
  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(true);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(true);
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
      width: "80%",
    },
  };

  useEffect(() => {
    if (isSubmitted) {
      setValidUsername(Boolean(username));
    }
  }, [username, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      setValidPassword(passwordRegex.test(password));
    }
  }, [password, isSubmitted]);

  useEffect(() => {
    if (isSubmitted) {
      setValidConfirmPassword(password && password === confirmPassword);
    }
  }, [confirmPassword, password, isSubmitted]);

  const handleSubmitForm = async (evt) => {
    evt.preventDefault();
    setIsSubmitted(true);

    const isUsernameValid = Boolean(username);
    const isPasswordValid = passwordRegex.test(password);
    const isConfirmPasswordValid = password && password === confirmPassword;

    setValidUsername(isUsernameValid);
    setValidPassword(isPasswordValid);
    setValidConfirmPassword(isConfirmPasswordValid);

    if (isUsernameValid && isPasswordValid && isConfirmPasswordValid) {
      try {
        setIsLoading(true);
        console.log("entre");
        const response = await api.doPost(endpoints.SetPasswordFunction, {
          username: localStorage.getItem('email'),
          temporary_password: localStorage.getItem('password'),
          new_password: password,
        });
        
        if(response.status === 200){
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
              localStorage.setItem("userId", response.data.id);
              window.location.href = "/movies";
            }
          })
        }
      } catch (error) {} finally {
        setIsLoading(false);
      };
    }
  };

  return (
    <Container fluid style={styles.container}>
      <Form onSubmit={handleSubmitForm} style={styles.form}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre de usuario:</Form.Label>
          <Form.Control
            className={validUsername ? "" : "border-error"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nombre de usuario"
          />
          { !validUsername ?  
          <Form.Text className="message-error">
            Nombre de usuario inválido.
          </Form.Text>
          : ""
          }
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Nueva contraseña:</Form.Label>
          <InputGroup>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className={validPassword ? "" : "border-error"}
            />
            <Button
              variant="secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          {validPassword ? "" :
            <Form.Text className="message-error">
              Contraseña no válida.
            </Form.Text>
          }
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicConfirmedPassword">
          <Form.Label>Confirmar nueva contraseña:</Form.Label>
          <InputGroup>
            <Form.Control
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Confirmar contraseña"
              className={validConfirmPassword ? "" : "border-error"}
            />
            <Button
              variant="secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
          { validConfirmPassword ? "" :
            <Form.Text className="message-error">
              Las contraseñas no coinciden.
            </Form.Text>
          }
        </Form.Group>
        <Form.Text className="mb-3">
          Recuerda que tu contraseña debe contener mínimo 8 caracteres con al menos: <br />
          - Una letra mayúscula. <br />
          - Una letra minúscula. <br />
          - Un número. <br />
          - Un carácter especial. <br />
        </Form.Text>
        <Button className="mt-3" disabled={isLoading} style={{ width: "100%" }} type="submit">
          {!isLoading ? "Completar registro" : <Spinner size="sm" />}
        </Button>
      </Form>
    </Container>
  );
}

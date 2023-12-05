import React, { useState } from "react";
import logo1 from "../login/logo1.webp";
import axios from "axios";
import {
  Logo,
  LoginButton,
  Input,
  LoginForm,
  LoginFormContainer,
  ImagePanel,
  LoginContainer,
  RegisterLink,
} from "./login.styles";
import { useNavigate, Link } from "react-router-dom";
const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError("O email e a senha são obrigatórios.");
      return;
    }
    console.log("Enviando:", { email, password });

    try {
      const response = await axios.post("http://127.0.0.1:3000/sessao", {
        password: password,
        email: email,
      });

      localStorage.setItem("userToken", response.data.token);

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          setLoginError("Credenciais inválidas. Por favor, tente novamente.");
        } else if (error.response.status === 404) {
          setLoginError("Email não registado.");
        } else {
          setLoginError("Ocorreu um erro ao tentar efetuar o login.");
        }
      } else {
        setLoginError(
          "Erro de conexão. Por favor, tente novamente mais tarde."
        );
      }
      console.error(
        "Erro no login:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <>
      <LoginContainer>
        <ImagePanel />
        <LoginFormContainer>
          <LoginForm onSubmit={handleSubmit}>
            <h1>Passarinhos LDA</h1>
            <Logo src={logo1} alt="Logotipo" />

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
            />
            {loginError && <p>{loginError}</p>}
            <LoginButton type="submit">Login</LoginButton>
            <RegisterLink>
              Não tem uma conta? <Link to="/registoescolha">Registe-se</Link>
            </RegisterLink>
          </LoginForm>
        </LoginFormContainer>
      </LoginContainer>
    </>
  );
};

export default LoginComponent;

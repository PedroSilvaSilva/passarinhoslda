import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import logo1 from "../login/logo1.webp";
import { useNavigate } from "react-router-dom";
const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f5f5f5;
`;

const RegistrationForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 50%;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const RegistrationButton = styled.button`
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 25%;
  margin: 10px;
  &:hover {
    background-color: darkblue;
  }
`;

const Logo = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
`;

const ErrorText = styled.p`
  color: red;
`;
const SuccessModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
`;

const RegistrationComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [morada, setMorada] = useState("");
  const [nif, setNif] = useState("");
  const [telefone, setTelefone] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [password, setPassword] = useState("");
  const [registrationError, setRegistrationError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleBackToLogin = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistrationError("");

    const formData = {
      username,
      email,
      morada,
      nif,
      telefone,
      localidade,
      codigoPostal,
      userTypeId: parseInt(1, 10),
      tipopagamentoId: parseInt(1, 10),
      password,
      statusId: parseInt(1, 10),
    };
    console.log("Dados sendo enviados:", formData);
    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/create",
        formData
      );
      setUsername("");
      setEmail("");
      setMorada("");
      setNif("");
      setTelefone("");
      setLocalidade("");
      setCodigoPostal("");
      setPassword("");

      console.log("Registro bem-sucedido:", response.data);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);
    } catch (error) {
      if (error.response && error.response.data === "Email já registado") {
        setRegistrationError("E-mail já registado. Tente outro e-mail.");
      } else {
        setRegistrationError("Falha no registro. Verifique suas informações.");
      }
      console.error(
        "Erro no registro:",
        error.response ? error.response.data : error
      );
    }
  };

  return (
    <RegistrationContainer>
      <h1>Passarinhos LDA</h1>
      <Logo src={logo1} alt="Logotipo" />
      <RegistrationForm onSubmit={handleSubmit}>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />

        <Input
          type="text"
          value={morada}
          onChange={(e) => setMorada(e.target.value)}
          placeholder="Morada"
        />
        <Input
          type="text"
          value={nif}
          onChange={(e) => setNif(e.target.value)}
          placeholder="NIF"
        />
        <Input
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Telefone"
        />
        <Input
          type="text"
          value={localidade}
          onChange={(e) => setLocalidade(e.target.value)}
          placeholder="Localidade"
        />
        <Input
          type="text"
          value={codigoPostal}
          onChange={(e) => setCodigoPostal(e.target.value)}
          placeholder="Código Postal"
        />
        {showSuccessModal && (
          <SuccessModal>Registro realizado com sucesso!</SuccessModal>
        )}
        <RegistrationButton type="submit">Registrar</RegistrationButton>
        <RegistrationButton onClick={handleBackToLogin}>
          Voltar ao Login
        </RegistrationButton>
        {registrationError && <ErrorText>{registrationError}</ErrorText>}
      </RegistrationForm>
    </RegistrationContainer>
  );
};

export default RegistrationComponent;

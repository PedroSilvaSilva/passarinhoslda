import React from "react";
import { useNavigate } from "react-router-dom";
import {
  OptionButton,
  Title,
  OptionsContainer,
  Logo,
  Wrapper,
} from "../registo/registoescolha.style";
import logo1 from "../login/logo1.webp";

const RegisterOptions = () => {
  const navigate = useNavigate();
  const handleBackToLogin = () => {
    navigate("/");
  };
  const handleRegisterAsClient = () => {
    navigate("/registocliente");
  };

  const handleRegisterAsSupplier = () => {
    navigate("/registofornecedor");
  };

  return (
    <Wrapper>
      <OptionsContainer>
        <h1>Passarinhos Lda</h1>
        <Logo src={logo1} alt="Logotipo" />
        <Title>Escolha o tipo de registo</Title>
        <OptionButton onClick={handleRegisterAsClient}>Cliente</OptionButton>
        <OptionButton onClick={handleRegisterAsSupplier}>
          Fornecedor
        </OptionButton>
        <OptionButton onClick={handleBackToLogin}>Voltar ao Login</OptionButton>
      </OptionsContainer>
    </Wrapper>
  );
};

export default RegisterOptions;

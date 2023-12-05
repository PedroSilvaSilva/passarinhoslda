import React, { useState } from "react";
import {
  ModalBackdrop,
  ModalContainer,
  ModalHeader,
  CloseButton,
  ModalTitle,
  ModalBody,
  StyledInput,
  SubmitButton,
  Form,
  SuccessPopup,
} from "../fornecedores/modal.style";
import axios from "axios";
export const CriarArtigoModal = ({ onClose, onArtigoCriado }) => {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stock, setStock] = useState("");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !descricao || !preco || !stock) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const token = localStorage.getItem("userToken");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const payload = {
        nome,
        descricao,
        preco: parseFloat(preco),
        stock: parseInt(stock, 10),
        armazemId: parseInt(1, 10),
      };
      console.log("Enviando dados para a API:", payload);
      const response = await axios.post(
        "http://127.0.0.1:3000/criarartigo",
        payload,
        config
      );
      onArtigoCriado();
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Erro ao criar artigo:", error);
    }
  };

  return (
    <ModalBackdrop>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Criar Novo Artigo</ModalTitle>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <StyledInput
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Nome do Artigo"
            />
            <StyledInput
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição"
            />
            <StyledInput
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              placeholder="Preço"
            />

            <StyledInput
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="Stock"
            />
            {errorMessage && <div>{errorMessage}</div>}
            <SubmitButton type="submit">Criar Artigo</SubmitButton>
          </Form>
        </ModalBody>
      </ModalContainer>
      {showSuccessPopup && (
        <SuccessPopup>Artigo criado com sucesso!</SuccessPopup>
      )}
    </ModalBackdrop>
  );
};

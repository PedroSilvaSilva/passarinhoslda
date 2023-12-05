import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Wrapper, Logo, StyledButton, Text } from "./perfil.style";
import UpdateProfileModal from "./modal";
import Modal from "./modal2";
import logo1 from "../login/logo1.webp";
const Perfil = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = async (updatedProfile) => {
    try {
      const userToken = localStorage.getItem("userToken");
      const response = await axios.put(
        `http://127.0.0.1:3000/fornecedoreseditar`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setProfile(response.data);
      setIsModalOpen(false);
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Erro ao atualizar o perfil."
      );
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        if (!userToken) {
          throw new Error("Não autorizado");
        }

        const response = await axios.get(`http://127.0.0.1:3000/perfil`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        setProfile(response.data.perfil);
        console.log(response.data);
      } catch (err) {
        setError(
          err.response?.data?.error ||
            err.message ||
            "Ocorreu um erro ao buscar o perfil."
        );
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!profile) {
    return <div>Carregando...</div>;
  }

  return (
    <Wrapper>
      <Container>
        <Logo src={logo1} alt="Logotipo" />
        <h1>Perfil</h1>
        <Text>Nome: {profile.username}</Text>
        <Text>Email: {profile.email}</Text>
        <Text>Localidade: {profile.localidade}</Text>
        <Text>Morada: {profile.morada}</Text>
        <Text>Nif: {profile.nif}</Text>
        <Text>Telefone: {profile.telefone}</Text>
        <StyledButton onClick={handleOpenModal}>Editar Perfil</StyledButton>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <UpdateProfileModal
            onSave={handleSaveProfile}
            onClose={handleCloseModal}
            profile={profile}
          />
        </Modal>
      </Container>
    </Wrapper>
  );
};

export default Perfil;

import React, { useState } from "react";
import {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
} from "../perfil/modal.style";
const UpdateProfileModal = ({ isOpen, onClose, onSave, profile }) => {
  const [formData, setFormData] = useState({ ...profile });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledLabel>Email:</StyledLabel>
      <StyledInput
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <StyledLabel>Username:</StyledLabel>
      <StyledInput
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <StyledLabel>Localidade:</StyledLabel>
      <StyledInput
        type="text"
        name="localidade"
        value={formData.localidade}
        onChange={handleChange}
      />
      <StyledLabel>Morada:</StyledLabel>
      <StyledInput
        type="text"
        name="morada"
        value={formData.morada}
        onChange={handleChange}
      />
      <StyledLabel>Nif:</StyledLabel>
      <StyledInput
        type="text"
        name="nif"
        value={formData.nif}
        onChange={handleChange}
      />
      <StyledLabel>Telefone:</StyledLabel>
      <StyledInput
        type="text"
        name="telefone"
        value={formData.telefone}
        onChange={handleChange}
      />

      <StyledButton type="submit">Salvar</StyledButton>
      <StyledButton type="button" onClick={onClose}>
        Cancelar
      </StyledButton>
    </StyledForm>
  );
};

export default UpdateProfileModal;

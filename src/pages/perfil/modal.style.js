import styled from "styled-components";

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  min-width: 300px;
  justify-content: center;
`;

const StyledForm = styled.form`
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: auto;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #333;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }

  &:last-child {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
`;
export {
  ModalContent,
  ModalBackdrop,
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
};

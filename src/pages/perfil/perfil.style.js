import styled from "styled-components";

const Container = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const Logo = styled.img`
  display: block;
  margin: 0 auto 20px;
  max-width: 150px;
`;
const StyledButton = styled.button`
  background-color: #4a90e2; // Escolha uma cor
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a78d2; // Um pouco mais escuro para o efeito hover
  }
`;

const Text = styled.p`
  font-size: 16px;
  margin: 10px 0;
`;

export { Container, Wrapper, Logo, StyledButton, Text };

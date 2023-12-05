import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;
const OptionsContainer = styled.div`
  text-align: center;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  gap: 20px;
`;
const Logo = styled.img`
  margin-bottom: 20px;
  width: 150px;
`;
const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`;

const OptionButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  padding: 10px 20px;
  margin: 10px 10px;
  border-radius: 5px;
  cursor: pointer;
  width: 200px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a78d2;
  }
`;

export { OptionButton, Title, OptionsContainer, Logo, Wrapper };

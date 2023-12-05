import styled from "styled-components";
import backgroundImage from "../login/logo3.webp";

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImagePanel = styled.div`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 50vh;

  @media (min-width: 768px) {
    width: 50%;
    min-height: 100vh;
  }
`;

const LoginFormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f2f5;
  text-align: center;

  @media (min-width: 768px) {
    width: 50%;
  }
`;

const LoginForm = styled.form`
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;
const RegisterLink = styled.p`
  text-align: center;
  margin-top: 20px;
  font-size: 0.9em;
  color: #4a4a4a;

  a {
    color: red;
    text-decoration: none;
    font-weight: bold;
    transition: color 0.3s;

    &:hover {
      color: blue;
    }
  }
`;
const LoginButton = styled.button`
  width: 100%;
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #0056b3;
  }
`;
const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

export {
  Logo,
  LoginButton,
  Input,
  LoginForm,
  LoginFormContainer,
  ImagePanel,
  LoginContainer,
  RegisterLink,
};

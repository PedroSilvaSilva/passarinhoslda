import styled from "styled-components";
import { NavLink } from "react-router-dom";
const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #111111;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: width 0.5s;
`;

const MenuSection = styled.div`
  padding-top: 20px;
`;

const FooterSection = styled.div`
  padding-bottom: 20px;
`;

const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 50px;
  color: white;
  text-decoration: none;
  padding-left: 20px;
  font-size: 16px;

  &:hover {
    background-color: #333;
  }

  &.active {
    background-color: #333;
  }
`;

const MenuIcon = styled.span`
  position: relative;
  margin-right: 10px;
  svg {
    font-size: 1em;
  }
`;
const LogoContainer = styled.img`
  display: flex;
  justify-content: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;
const UserProfile = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`;

const UserName = styled.div`
  margin-left: 10px;
`;
const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  background: none;
  border: none;
  color: white;
  padding-left: 20px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #333;
  }
`;
const Logo = styled.img`
  width: 150px;
  margin-left: auto;
  margin-right: auto;
`;
const ContadorCarrinho = styled.span`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 0.25em 0.5em;
  font-size: 0.75em;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1.5em;
  height: 1.5em;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  font-weight: bold;
`;
export {
  LogoutButton,
  UserName,
  UserProfile,
  MenuIcon,
  MenuItem,
  FooterSection,
  MenuSection,
  SidebarContainer,
  Logo,
  ContadorCarrinho,
  LogoContainer,
};

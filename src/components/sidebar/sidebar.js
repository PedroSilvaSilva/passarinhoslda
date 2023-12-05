import React, { useState, useEffect } from "react";
import {
  LogoutButton,
  UserName,
  UserProfile,
  MenuIcon,
  MenuItem,
  FooterSection,
  MenuSection,
  SidebarContainer,
  ContadorCarrinho,
  LogoContainer,
} from "../sidebar/sidebar.style";
import {
  FaHome,
  FaCreditCard,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaShoppingCart,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { BsGraphDown } from "react-icons/bs";
import { MdLocalShipping } from "react-icons/md";
import { BiSolidPurchaseTag } from "react-icons/bi";
import logo1 from "../../pages/login/logo1.webp";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useCarrinho } from "../../pages/encomendas/carrinhocompras";
const Sidebar = () => {
  const [userTypeId, setUserTypeId] = useState("");
  const { carrinho } = useCarrinho();
  const [contagemCarrinho, setContagemCarrinho] = useState(0);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserTypeId(decodedToken.userTypeId);
    }
  }, []);

  const navigate = useNavigate();
  useEffect(() => {
    const novaContagem = carrinho.reduce(
      (total, item) => total + item.quantidade,
      0
    );
    setContagemCarrinho(novaContagem);
  }, [carrinho]);
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };
  return (
    <SidebarContainer>
      <LogoContainer src={logo1} alt="Logotipo" />
      <MenuSection>
        <MenuItem to="/dashboard">
          <MenuIcon>
            <FaHome />
          </MenuIcon>
          <span>Dashboard</span>
        </MenuItem>
        {userTypeId === "fornecedor" && (
          <MenuItem to="artigos">
            <MenuIcon>
              <FaCreditCard />
            </MenuIcon>
            <span>Artigos</span>
          </MenuItem>
        )}
        {userTypeId === "cliente" && (
          <MenuItem to="comprarartigos">
            <MenuIcon>
              <BiSolidPurchaseTag />
            </MenuIcon>
            <span>Compras</span>
          </MenuItem>
        )}
        {userTypeId === "cliente" && (
          <MenuItem to="encomendas">
            <MenuIcon>
              <FaShoppingCart />

              {contagemCarrinho > 0 && (
                <ContadorCarrinho>{contagemCarrinho}</ContadorCarrinho>
              )}
            </MenuIcon>
            <span>Encomendas</span>
          </MenuItem>
        )}
        {userTypeId === "cliente" && (
          <MenuItem to="relatorio">
            <MenuIcon>
              <FaFileInvoiceDollar />
            </MenuIcon>
            <span>Faturas</span>
          </MenuItem>
        )}
        {userTypeId === "transportadora" && (
          <MenuItem to="transportadoras">
            <MenuIcon>
              <MdLocalShipping />
            </MenuIcon>
            <span>Transportes Pendentes</span>
          </MenuItem>
        )}
        {userTypeId === "transportadora" && (
          <MenuItem to="entregues">
            <MenuIcon>
              <MdLocalShipping />
            </MenuIcon>
            <span>Transportes Finalizados</span>
          </MenuItem>
        )}
        {userTypeId === "transportadora" && (
          <MenuItem to="grafico">
            <MenuIcon>
              <BsGraphDown />
            </MenuIcon>
            <span>Grafico</span>
          </MenuItem>
        )}
      </MenuSection>

      <FooterSection>
        <MenuItem to="perfil">
          <MenuIcon>
            <FaCog />
          </MenuIcon>
          <span>Perfil</span>
        </MenuItem>

        <UserProfile>
          <FaUsers />
          <UserName>Pedro Silva </UserName>
        </UserProfile>
        <LogoutButton onClick={handleLogout}>
          <MenuIcon>
            <FaSignOutAlt />
          </MenuIcon>
          <span>Logout</span>
        </LogoutButton>
      </FooterSection>
    </SidebarContainer>
  );
};

export default Sidebar;

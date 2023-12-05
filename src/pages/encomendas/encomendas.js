import React, { useState } from "react";
import styled from "styled-components";
import { useCarrinho } from "../encomendas/carrinhocompras";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
const CarrinhoContainer = styled.div`
  padding: 25px;
  width: 85%;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const InputQuantidade = styled.input`
  width: 50px;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 15px;
`;

const TabelaCarrinho = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const CabecalhoTabela = styled.thead`
  background-color: #f0f0f0;
`;

const LinhaTabela = styled.tr`
  &:nth-child(even) {
    background-color: #f9f9f9;
  }
  height: 60px;
`;

const CelulaTabela = styled.td`
  padding: 10px;
`;

const CelulaCabecalho = styled.th`
  padding: 10px;
  border-bottom: 2px solid #ddd;
  text-align: left;
`;

const BotaoRemover = styled.button`
  background-color: #ff6347;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const TotalCarrinho = styled.p`
  font-weight: bold;
  font-size: 18px;
  text-align: right;
`;

const BotaoEncomendar = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  font-size: 16px;

  &:hover {
    background-color: #218838;
  }
`;
const ModalSucesso = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: green;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
`;
const ModalAviso = styled(ModalSucesso)`
  background-color: red;
`;
const Encomendas = () => {
  const { carrinho, removerDoCarrinho, atualizarQuantidade, limparCarrinho } =
    useCarrinho();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalAviso, setMostrarModalAviso] = useState(false);

  const handleEncomendar = async () => {
    if (carrinho.length === 0) {
      setMostrarModalAviso(true);
      setTimeout(() => setMostrarModalAviso(false), 3000);
      return;
    }

    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("Erro: Token não encontrado.");

      return;
    }
    const decodedToken = jwtDecode(token);
    const clienteId = decodedToken.userId;

    const itensEncomenda = carrinho.map((item) => ({
      artigoId: item.id,
      quantidade: item.quantidade,
      preco: item.preco,
      satus: "realizada",
    }));
    const dadosEncomenda = {
      clienteId,
      artigos: itensEncomenda,
      total: calcularTotal(),
      transportadoraId: 1,
      satus: "realizada",
    };
    console.log("Dados sendo enviados para encomenda:", dadosEncomenda);
    limparCarrinho();
    setMostrarModal(true);
    setTimeout(() => setMostrarModal(false), 3000);
    try {
      const response = await axios.post("http://127.0.0.1:3000/encomenda", {
        clienteId,
        artigos: itensEncomenda,
        total: calcularTotal(),
        transportadoraId: 1,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao enviar encomenda:", error);
    }
  };

  const handleRemoverItem = (itemId) => {
    removerDoCarrinho(itemId);
  };
  const handleQuantidadeChange = (e, itemId) => {
    const novaQuantidade = e.target.value;
    atualizarQuantidade(itemId, novaQuantidade);
  };

  const calcularTotal = () => {
    return carrinho
      .reduce((total, item) => total + item.quantidade * item.preco, 0)
      .toFixed(2);
  };

  return (
    <CarrinhoContainer>
      <h2>Carrinho de Compras</h2>
      {carrinho.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <TabelaCarrinho>
          <CabecalhoTabela>
            <tr>
              <CelulaCabecalho>Produto</CelulaCabecalho>
              <CelulaCabecalho>Quantidade</CelulaCabecalho>
              <CelulaCabecalho>Preço</CelulaCabecalho>
              <CelulaCabecalho>Ações</CelulaCabecalho>
            </tr>
          </CabecalhoTabela>
          <tbody>
            {carrinho.map((item) => (
              <LinhaTabela key={item.id}>
                <CelulaTabela>{item.nome}</CelulaTabela>
                <InputQuantidade
                  type="number"
                  value={item.quantidade}
                  onChange={(e) => handleQuantidadeChange(e, item.id)}
                  min="1"
                />
                <CelulaTabela>€{item.preco}</CelulaTabela>
                <CelulaTabela>
                  <BotaoRemover onClick={() => handleRemoverItem(item.id)}>
                    Remover
                  </BotaoRemover>
                </CelulaTabela>
              </LinhaTabela>
            ))}
          </tbody>
        </TabelaCarrinho>
      )}
      <BotaoEncomendar onClick={handleEncomendar}>Encomendar</BotaoEncomendar>
      {mostrarModal && (
        <ModalSucesso>Encomenda realizada com sucesso!</ModalSucesso>
      )}
      {mostrarModalAviso && (
        <ModalAviso>
          O carrinho está vazio. Adicione itens antes de fazer a encomenda.
        </ModalAviso>
      )}
      <TotalCarrinho>Total: €{calcularTotal()}</TotalCarrinho>
    </CarrinhoContainer>
  );
};

export default Encomendas;

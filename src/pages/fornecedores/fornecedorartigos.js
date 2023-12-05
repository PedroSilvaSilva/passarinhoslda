import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Title,
  Table,
  TableHeader,
  TableRow,
  TableCell,
  SubmitButton,
  InputSearch,
} from "../fornecedores/fornecedorartigo.style";

import { CriarArtigoModal } from "./artigomodal";

const ArtigosComFornecedor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [artigos, setArtigos] = useState([]);
  const [erro, setErro] = useState("");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  const abrirModalCriarArtigo = () => setIsModalOpen(true);
  const fecharModalCriarArtigo = () => setIsModalOpen(false);

  const fetchArtigos = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(
        "http://127.0.0.1:3000/fornecedorartigo",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setArtigos(response.data);
    } catch (error) {
      setErro("Erro ao buscar artigos");
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    fetchArtigos();
  }, []);

  const calcularStockTotal = (armazens) => {
    return armazens.reduce(
      (total, armazem) => total + armazem.ArtigoArmazem.stock,
      0
    );
  };

  const artigosFiltrados = artigos.filter(
    (artigo) =>
      artigo.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) ||
      artigo.descricao.toLowerCase().includes(termoPesquisa.toLowerCase())
  );

  if (erro) return <div>{erro}</div>;

  return (
    <Container>
      <Title>Criar Artigos </Title>

      <InputSearch
        type="text"
        value={termoPesquisa}
        onChange={(e) => setTermoPesquisa(e.target.value)}
        placeholder="Pesquisar artigos..."
      />

      <Table>
        <thead>
          <tr>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Descrição</TableHeader>
            <TableHeader>Preço</TableHeader>
            <TableHeader>Fornecedor</TableHeader>
            <TableHeader>Email</TableHeader>
            <TableHeader>Criação</TableHeader>
            <TableHeader>Stock Total</TableHeader>
            <TableHeader>Armazem</TableHeader>
            <TableHeader>Localidade</TableHeader>
          </tr>
        </thead>
        <tbody>
          {artigosFiltrados.map((artigo) => (
            <TableRow key={artigo.id}>
              <TableCell>{artigo.nome}</TableCell>
              <TableCell>{artigo.descricao}</TableCell>
              <TableCell>{artigo.preco}€</TableCell>
              <TableCell>{artigo.fornecedor?.username}</TableCell>
              <TableCell>{artigo.fornecedor?.email}</TableCell>
              <TableCell>
                {new Date(artigo.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>{calcularStockTotal(artigo.armazens)}</TableCell>
              <TableCell>
                {artigo.armazens.length > 0
                  ? artigo.armazens[0].nome
                  : "Sem armazém"}
              </TableCell>
              <TableCell>
                {artigo.armazens.length > 0
                  ? artigo.armazens[0].localizacao
                  : "Sem localização"}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {isModalOpen && (
        <CriarArtigoModal
          onClose={fecharModalCriarArtigo}
          onArtigoCriado={fetchArtigos}
        />
      )}
      <SubmitButton onClick={abrirModalCriarArtigo}>
        Criar Novo Artigo
      </SubmitButton>
    </Container>
  );
};

export default ArtigosComFornecedor;

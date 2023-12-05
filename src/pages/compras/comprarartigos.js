import React, { useState, useEffect } from "react";
import axios from "axios";

import ReactPaginate from "react-paginate";
import "./pagination.css";
import { useCarrinho } from "../encomendas/carrinhocompras";
import {
  ComprarButton,
  Tr,
  Td,
  Th,
  Table,
  Container,
} from "../compras/comprasartigos.style";

const ITEMS_PER_PAGE = 7;

const ComprarArtigos = ({ artigo }) => {
  const { adicionarAoCarrinho } = useCarrinho();
  const [artigos, setArtigos] = useState([]);
  const [erro, setErro] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const paginatedArtigos = artigos.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  useEffect(() => {
    const fetchArtigos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:3000/artigosF");
        setArtigos(response.data.artigos);
      } catch (error) {
        setErro("Erro ao buscar artigos");
        console.error("Erro:", error);
      }
    };

    fetchArtigos();
  }, []);

  if (erro) {
    return <div>Erro: {erro}</div>;
  }

  return (
    <Container>
      <h1>Lista de Artigos </h1>
      <Table>
        <thead>
          <tr>
            <Th>Nome</Th>
            <Th>Descrição</Th>
            <Th>Preço</Th>
            <Th>Fornecedor</Th>
            <Th>Armazém</Th>
            <Th>Ação</Th>
          </tr>
        </thead>
        <tbody>
          {paginatedArtigos.map((artigo) => (
            <Tr key={artigo.id}>
              <Td>{artigo.nome}</Td>
              <Td>{artigo.descricao}</Td>
              <Td>{`${artigo.preco}€`}</Td>
              <Td>
                {artigo.fornecedor.username} (Email: {artigo.fornecedor.email})
              </Td>
              <Td>
                {artigo.armazens.map((armazem) => (
                  <p key={armazem.id}>
                    {armazem.nome} (Localização: {armazem.localizacao}), Stock:{" "}
                    {armazem.ArtigoArmazem.stock}
                  </p>
                ))}
              </Td>
              <Td>
                <ComprarButton onClick={() => adicionarAoCarrinho(artigo)}>
                  Adicionar ao Carrinho
                </ComprarButton>
              </Td>
            </Tr>
          ))}
        </tbody>
      </Table>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Próximo"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={Math.ceil(artigos.length / ITEMS_PER_PAGE)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={7}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </Container>
  );
};

export default ComprarArtigos;

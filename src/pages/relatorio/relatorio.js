import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import jsPDF from "jspdf";
import logo1 from "../login/logo1.webp";

const Tabela = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const Cabecalho = styled.thead`
  background-color: #007bff;
  color: black;
`;

const Linha = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }

  &:nth-child(odd) {
    background-color: #ffffff;
  }

  &:hover {
    background-color: #f1f3f5;
  }
`;

const Celula = styled.td`
  padding: 20px 10px;
  border-bottom: 1px solid #dee2e6;
  text-align: center;
`;

const CelulaCabecalho = styled.th`
  padding: 16px 10px;
  text-align: center;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const ITEMS_PER_PAGE = 5;

const MinhasEncomendas = () => {
  const [encomendas, setEncomendas] = useState([]);
  const [erro, setErro] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const gerarPDF = (encomenda) => {
    const doc = new jsPDF();

    doc.setFillColor(224, 224, 224);
    doc.rect(0, 0, doc.internal.pageSize.width, 55, "F");

    doc.setFontSize(18);
    doc.setFont(undefined, "bold");
    const pageTitle = "Documento Encomenda";
    const pageWidth = doc.internal.pageSize.width;
    const pageTitleWidth = doc.getTextWidth(pageTitle);
    doc.text(pageTitle, (pageWidth - pageTitleWidth) / 2, 25);

    // Constantes de posicionamento
    const margemEsquerda = 10;
    let posY = 10;

    // Logo e Dados da Empresa
    doc.addImage(logo1, "PNG", margemEsquerda, posY, 40, 20);
    posY += 30; // Incrementar a posição Y após o logotipo

    doc.setFontSize(10);
    doc.text("Passarinhos Lda", margemEsquerda, posY);
    doc.text("Portugal", margemEsquerda, posY + 5);
    doc.text("5050-231 Peso da Régua", margemEsquerda, posY + 10);
    posY += 20; // Espaço após os dados da empresa

    // Cabeçalho do Documento
    doc.setFontSize(18);
    doc.text("Detalhes da Encomenda", margemEsquerda, posY);
    posY += 10; // Espaço após o título

    // Dados da Encomenda
    doc.setFontSize(12);
    doc.text(`ID da Encomenda: ${encomenda.id}`, margemEsquerda, posY);
    posY += 10;
    doc.text(
      `Data da encomenda : ${new Date(
        encomenda.dataEncomenda
      ).toLocaleDateString()}`,
      margemEsquerda,
      posY
    );
    posY += 10;
    doc.text(`Cliente: ${encomenda.clientes.username}`, margemEsquerda, posY);
    posY += 10;
    doc.text(
      `Transportadora: ${encomenda.transportadora.username}`,
      margemEsquerda,
      posY
    );
    posY += 10;

    // Lista de Artigos
    encomenda.artigos.forEach((artigo, index) => {
      doc.setFontSize(10);
      doc.text(
        `${index + 1}. ${artigo.nome} (${artigo.descricao})`,
        margemEsquerda,
        posY
      );
      posY += 6;
      doc.text(
        `Quantidade: ${artigo.detalhes.quantidade}, Preço: €${artigo.detalhes.preco}`,
        margemEsquerda,
        posY
      );
      posY += 10; // Espaço após cada artigo
    });

    // Total da Encomenda
    doc.setFontSize(12);
    doc.text(`Total da Encomenda: €${encomenda.total}`, margemEsquerda, posY);

    // Salvar o PDF
    doc.save(`Encomenda_${encomenda.id}.pdf`);
  };

  useEffect(() => {
    const fetchEncomendas = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setErro("Token não encontrado.");
        return;
      }
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/documentoencomenda",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setEncomendas(response.data);
      } catch (error) {
        setErro("Erro ao buscar encomendas");
        console.error("Erro:", error);
      }
    };

    fetchEncomendas();
  }, []);
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  const paginatedEncomendas = encomendas.slice(
    currentPage * ITEMS_PER_PAGE,
    (currentPage + 1) * ITEMS_PER_PAGE
  );
  if (erro) {
    return <div>Erro: {erro}</div>;
  }

  return (
    <div>
      <h1>Minhas Encomendas</h1>
      <Tabela>
        <Cabecalho>
          <Linha>
            <CelulaCabecalho>ID</CelulaCabecalho>
            <CelulaCabecalho>Data da Encomenda</CelulaCabecalho>
            <CelulaCabecalho>Artigos </CelulaCabecalho>
            <CelulaCabecalho>Total</CelulaCabecalho>
            <CelulaCabecalho>Transportadora</CelulaCabecalho>
            <CelulaCabecalho>Documento</CelulaCabecalho>
          </Linha>
        </Cabecalho>
        <tbody>
          {paginatedEncomendas.map((encomenda) => (
            <Linha key={encomenda.id}>
              <Celula>{encomenda.id}</Celula>
              <Celula>
                {new Date(encomenda.dataEncomenda).toLocaleDateString()}
              </Celula>
              <Celula>
                {encomenda.artigos.map((artigo) => (
                  <div key={artigo.id}>
                    {artigo.nome} - {artigo.detalhes.quantidade} x €
                    {artigo.detalhes.preco}
                  </div>
                ))}
              </Celula>
              <Celula>€{encomenda.total}</Celula>
              <Celula>{encomenda.transportadora.username}</Celula>
              <Celula>
                <button onClick={() => gerarPDF(encomenda)}>
                  Gerar Encomenda
                </button>
              </Celula>
            </Linha>
          ))}
        </tbody>
      </Tabela>
      {encomendas.length > 0 && (
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={Math.ceil(encomendas.length / ITEMS_PER_PAGE)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default MinhasEncomendas;

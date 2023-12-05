import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableHeader = styled.th`
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 12px;
  border: 1px solid #ddd;
`;

const itemsPerPage = 10;
const EncomendasEntregues = () => {
  const [encomendas, setEncomendas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchEncomendas = async () => {
      try {
        const token = localStorage.getItem("userToken");

        if (!token) {
          console.error("Token não encontrado");
          return;
        }
        const response = await axios.get(
          "http://127.0.0.1:3000/encomendasentregues",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEncomendas(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Erro ao buscar encomendas:", error);
      }
    };

    fetchEncomendas();
  }, []);
  const displayedEncomendas = encomendas.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };
  const generatePDF = () => {
    const doc = new jsPDF();

    autoTable(doc, {
      head: [
        [
          "ID",
          "Data da Encomenda",
          "Status",
          "Total",
          "Cliente",
          "Transportadora",
          "Criado em",
          "Data de Entrega",
        ],
      ],
      body: encomendas.map((encomenda) => [
        encomenda.id,
        new Date(encomenda.dataEncomenda).toLocaleDateString(),
        encomenda.status,
        `${encomenda.total}€`,
        encomenda.clientes.username,
        encomenda.transportadora.username,
        new Date(encomenda.createdAt).toLocaleDateString(),
        new Date(encomenda.dataEntrega).toLocaleDateString(),
      ]),
    });

    doc.save("encomendas-entregues.pdf");
  };

  return (
    <>
      <h1>Encomendas Entregues</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>ID</TableHeader>
            <TableHeader>Data da Encomenda</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader>Total</TableHeader>
            <TableHeader>Cliente</TableHeader>
            <TableHeader>Transportadora</TableHeader>
            <TableHeader>Criado em</TableHeader>
            <TableHeader>Data de Entrega</TableHeader>
            <TableHeader>Relatório</TableHeader>
          </TableRow>
        </TableHead>
        <tbody>
          {displayedEncomendas.map((encomenda) => (
            <TableRow key={encomenda.id}>
              <TableCell>{encomenda.id}</TableCell>

              <TableCell>
                {new Date(encomenda.dataEncomenda).toLocaleDateString()}
              </TableCell>
              <TableCell>{encomenda.status}</TableCell>
              <TableCell>{encomenda.total}€</TableCell>
              <TableCell>{encomenda.clientes.username}</TableCell>
              <TableCell>{encomenda.transportadora.username}</TableCell>
              <TableCell>
                {new Date(encomenda.createdAt).toLocaleDateString()}
              </TableCell>

              <TableCell>
                {new Date(encomenda.dataEntrega).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <button onClick={generatePDF}>Gerar Relatório PDF</button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>

        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          breakLabel={"..."}
          pageCount={Math.ceil(encomendas.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </Table>
    </>
  );
};

export default EncomendasEntregues;

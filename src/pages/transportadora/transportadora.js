import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

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

const Modal = styled.div`
  display: ${({ show }) => (show ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  padding-top: 100px;
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
`;

const itemsPerPage = 10;
const EncomendasTable = () => {
  const [encomendas, setEncomendas] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    const fetchEncomendas = async () => {
      try {
        const token = localStorage.getItem("userToken");

        if (!token) {
          console.error("Token não encontrado");
          return;
        }
        const response = await axios.get(
          "http://127.0.0.1:3000/todasemcomendas",
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
  const handleUpdateEncomenda = async (encomendaId) => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      console.error("Token não encontrado");
      return;
    }

    try {
      const response = await axios.put(
        `http://127.0.0.1:3000/fecharencomenda/${encomendaId}`,
        {
          dataEntrega: new Date().toISOString(),
          status: "Realizada",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedEncomendas = encomendas.map((encomenda) =>
        encomenda.id === encomendaId
          ? { ...encomenda, ...response.data }
          : encomenda
      );
      setEncomendas(updatedEncomendas);
      setIsModalVisible(true);

      setTimeout(() => {
        setIsModalVisible(false);
      }, 3000);
    } catch (error) {
      console.error("Erro ao atualizar encomenda:", error);
    }
  };

  return (
    <>
      <h1>Encomendas Pendendes</h1>

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
            <TableHeader>Fecho encomenda</TableHeader>
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
                {encomenda.status === "Pendente" && (
                  <button onClick={() => handleUpdateEncomenda(encomenda.id)}>
                    Definir Entrega
                  </button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </tbody>
        <Modal show={isModalVisible}>
          <ModalContent>
            <p>Encomenda entregue com sucesso!</p>
          </ModalContent>
        </Modal>
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          breakLabel={"..."}
          pageCount={Math.ceil(encomendas.length / itemsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={10}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </Table>
    </>
  );
};

export default EncomendasTable;

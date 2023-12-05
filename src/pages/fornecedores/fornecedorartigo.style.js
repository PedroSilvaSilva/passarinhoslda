import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  width: 90%;
  margin: 0 auto;
`;

const Title = styled.h2`
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
`;

const TableHeader = styled.th`
  background-color: #4a90e2;
  color: white;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

const SubmitButton = styled.button`
  width: 20%;
  padding: 10px;
  margin-top: 25px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a78d2;
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

const InputSearch = styled.input`
  width: 50%;
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

export {
  TableCell,
  TableRow,
  TableHeader,
  Table,
  Title,
  Container,
  SubmitButton,
  Logo,
  InputSearch,
};

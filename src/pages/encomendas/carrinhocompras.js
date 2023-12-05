import React, { useState } from "react";

const CarrinhoContext = React.createContext();

export const useCarrinho = () => React.useContext(CarrinhoContext);

export const CarrinhoProvider = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const limparCarrinho = () => {
    setCarrinho([]);
  };
  const adicionarAoCarrinho = (artigo) => {
    setCarrinho((carrinhoAtual) => {
      const encontrado = carrinhoAtual.find((item) => item.id === artigo.id);
      if (encontrado) {
        return carrinhoAtual.map((item) =>
          item.id === artigo.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        return [...carrinhoAtual, { ...artigo, quantidade: 1 }];
      }
    });
  };
  const removerDoCarrinho = (itemId) => {
    setCarrinho(carrinho.filter((item) => item.id !== itemId));
  };
  const atualizarQuantidade = (itemId, novaQuantidade) => {
    setCarrinho(
      carrinho.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantidade: Number(novaQuantidade) };
        }
        return item;
      })
    );
  };

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

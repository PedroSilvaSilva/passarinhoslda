import LoginComponent from "./pages/login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationComponent from "./pages/registo/registo";
import Layout from "./pages/layout";
import { Navigate, useLocation } from "react-router-dom";
import Perfil from "./pages/perfil/perfil";
import RegisterOptions from "./pages/registo/registoescolha";
import ArtigosComFornecedor from "./pages/fornecedores/fornecedorartigos";
import RegistrationComponentF from "./pages/registo/registofornecedor";
import Comprarartigos from "./pages/compras/comprarartigos";
import Encomendas from "./pages/encomendas/encomendas";
import { CarrinhoProvider } from "../src/pages/encomendas/carrinhocompras";
import MinhasEncomendas from "./pages/relatorio/relatorio";
import EncomendasTable from "./pages/transportadora/transportadora";
import EncomendasEntregues from "./pages/entregas/entregas";
import EncomendasChart from "./pages/grafico/graficoencomendas";
const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <CarrinhoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginComponent />} />
            <Route path="/registocliente" element={<RegistrationComponent />} />
            <Route
              path="/registofornecedor"
              element={<RegistrationComponentF />}
            />
            <Route path="/registoescolha" element={<RegisterOptions />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Layout />
                </PrivateRoute>
              }
            >
              <Route path="perfil" element={<Perfil />} />
              <Route path="artigos" element={<ArtigosComFornecedor />} />
              <Route path="comprarartigos" element={<Comprarartigos />} />
              <Route path="encomendas" element={<Encomendas />} />
              <Route path="relatorio" element={<MinhasEncomendas />} />
              <Route path="transportadoras" element={<EncomendasTable />} />
              <Route path="entregues" element={<EncomendasEntregues />} />
              <Route path="grafico" element={<EncomendasChart />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CarrinhoProvider>
    </div>
  );
}

export default App;

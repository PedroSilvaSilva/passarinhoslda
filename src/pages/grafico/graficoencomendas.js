import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const EncomendasChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
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

        setChartData({
          labels: response.data.map((d) =>
            new Date(d.dataEncomenda).toLocaleDateString()
          ),
          datasets: [
            {
              label: "Total de Encomendas",
              data: response.data.map((d) => parseFloat(d.total)),
              backgroundColor: "rgba(0, 123, 255, 0.5)",
              borderColor: "rgba(0, 123, 255, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Erro a carregar dados das encomendas:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Encomendas Realizadas</h2>
      <Line data={chartData} />
    </div>
  );
};

export default EncomendasChart;

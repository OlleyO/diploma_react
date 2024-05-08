import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Історія продаж / купівлі",
    },
  },
};

const labels = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Закуплено",
      data: [10, 20, 30],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Продано",
      data: [40, 50, 60],
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const Chart = () => {
  return <Bar options={options} data={data} />;
};

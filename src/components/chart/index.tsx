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
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  barPercentage: 1,
  responsive: true,
  scales: {
    y: {
      ticks: {
        precision: 0,
      },
    },
  },
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

interface LabelsType {
  [name: string]: string;
}

interface ResultType {
  sell: { [name: string]: number };
  buy: { [name: string]: number };
}

interface ChartResultType {
  sell: number[];
  buy: number[];
}

const labels: LabelsType = {
  "1": "Січень",
  "2": "Лютий",
  "3": "Березень",
  "4": "Квітень",
  "5": "Травень",
  "6": "Червень",
  "7": "Липень",
  "8": "Серпень",
  "9": "Вересень",
  "10": "Жовтень",
  "11": "Листопад",
  "12": "Грудень",
};

interface Props {
  data: {
    sell: any[];
    buy: any[];
  };
}

export const Chart: React.FC<Props> = ({ data }) => {
  const result: ResultType = { sell: {}, buy: {} };

  const buy = data.buy
    .filter(
      (item) =>
        +dayjs().format("YYYY") === +dayjs(item.created_at).format("YYYY")
    )
    .map(
      (item) => (+dayjs(item.created_at).format("M") - 1) as unknown as string
    )
    .forEach((month) => {
      result.buy[month] = (result.buy[month] || 0) + 1;
    });

  const sell = data.sell
    .filter(
      (item) =>
        +dayjs().format("YYYY") === +dayjs(item.created_at).format("YYYY")
    )
    .map(
      (item) => (+dayjs(item.created_at).format("M") - 1) as unknown as string
    )
    .forEach((month) => {
      result.sell[month] = (result.sell[month] || 0) + 1;
    });

  const resultCharData: ChartResultType = {
    sell: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    buy: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  Object.keys(result.buy).forEach(
    (data) => (resultCharData.buy[+data] = result.buy[data])
  );

  Object.keys(result.sell).forEach(
    (data) => (resultCharData.sell[+data] = result.sell[data])
  );

  const mappeData = {
    labels: Object.values(labels),
    datasets: [
      {
        label: "Закуплено",
        data: resultCharData.buy,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Продано",
        data: resultCharData.sell,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={mappeData} />;
};

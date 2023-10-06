import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
];

export const data = {
  labels,
  datasets: [
    {
      type: "line" as const,
      label: "Standard",
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ min: 40, max: 50 })),
    },
    {
      type: "bar" as const,
      label: "UKG",
      backgroundColor: "rgb(75, 192, 192)",
      data: labels.map(() => faker.datatype.number({ min: 30, max: 70 })),
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar" as const,
      label: "Company A",
      backgroundColor: "rgb(53, 162, 235)",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 80 })),
    },
    {
      type: "bar" as const,
      label: "Company B",
      backgroundColor: "rgb(220, 82, 135)",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 70 })),
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
  },
  scales: {
    y: {
      min: 0, // Set the minimum value of Y-axis to 0
      max: 100, // Set the maximum value of Y-axis to 100
      beginAtZero: true, // Ensure the Y-axis starts from 0
    },
  },
};

export function Benchmarking() {
  return (
    <div className="container" style={{ height: "100vh", width: "100vw" }}>
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}

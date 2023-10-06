import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getMoodDataByDay, uniqueMoods } from "./utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: "Over All Happy Index",
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

export function MoodLineChart() {
  console.log(uniqueMoods);
  const { labels, values } = getMoodDataByDay();

  console.log({ labels, values });

  console.log(JSON.stringify(getMoodDataByDay()));

  const data = {
    labels,
    datasets: [
      {
        label: "Happy Index",
        data: labels.map((l, i) => values[i]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div style={{ height: "50vh", width: "100%" }}>
      <Line options={options} data={data} height={600} width={800} />
    </div>
  );
}

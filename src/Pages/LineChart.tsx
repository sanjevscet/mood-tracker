import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { getMoodDataByDay, uniqueMoods } from "./utils";
import { Col, Row } from "react-bootstrap";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom" as const,
    },
    title: {
      display: true,
      text: "UKG Happy Index",
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
  const [period, setPeriod] = useState("last-week");

  console.log(uniqueMoods);
  const { labels, values } = getMoodDataByDay(period);

  console.log({ labels, values });

  console.log(JSON.stringify(getMoodDataByDay()));

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "Happy Index",
        data: labels.map((l, i) => values[i]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div className="container" style={{ height: "80vh", width: "100vw" }}>
      <select
        className="form-select"
        style={{ width: 200, float: "right", outline: "none" }}
        defaultValue={period}
        onChange={(e) => setPeriod(e.target.value)}
      >
        <option>Select Period</option>
        <option value="last-week">Last Week</option>
        <option value="last-month">Last Month</option>
        <option value="last-3-month">Last 3 Months</option>
      </select>

      <Line options={options} data={data} height={900} width={1000} />
    </div>
  );
}

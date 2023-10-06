import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { API_URL } from "../Constants";
import Loader from "./Loader";
import PieChart from "./PieChart";

ChartJS.register(ArcElement, Tooltip, Legend);

const chartData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "Developers",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export default function Chart() {
  const [selectedPortion, setSelectedPortion] = useState(0);
  const [selectedPortionName, setSelectedPortionName] = useState("");
  const [portionSelected, setPortionSelected] = useState(false);

  const handleElementClick = (elements: any) => {
    if (elements.length > 0) {
      const clickedElement = elements[0];
      const index = clickedElement.index;
      const value = chartData.datasets[0].data[index];
      const name = chartData.labels[index];
      setSelectedPortion(value);
      setPortionSelected(true);
      setSelectedPortionName(name);
      setTimeout(() => setPortionSelected(false), 5000);
    }
  };

  const [apiData, setApiData] = useState([]);

  const getApiData = async () => {
    const { data } = await axios.get(API_URL + "/getcurrentskills");
    setApiData(data);
  };

  useEffect(() => {
    getApiData();
  }, []);

  const labels: string[] = apiData.map((d) => {
    const label = d[0] as string;
    return label;
  });
  const values = apiData.map((d) => d[1] as number);
  chartData.labels = labels;
  chartData.datasets[0].data = values;

  return (
    <>
      {values.length > 0 ? (
        <div
          role="figure"
          aria-label="Poll Results Chart"
          style={{
            display: "flex",
            // justifyContent: "center",
            // alignItems: "center",
            marginTop: 60,
            height: "650px",
            width: 650,
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              transform: "rotateX(45deg)", // Rotate the chart canvas
            }}
          ></div>
          <Pie
            data={chartData}
            options={{
              plugins: {
                legend: {
                  display: true,
                  labels: {
                    font: {
                      size: 14,
                    },
                  },
                },
              },
              onClick: (_, elements) => handleElementClick(elements),
            }}
            aria-label="Poll Results"
            role="img"
            aria-labelledby="chart-title"
            tabIndex={0}
          />
          <div id="chart-title" style={{ display: "none" }}>
            {portionSelected ? (
              <>
                <label>Selected Portion{selectedPortionName}</label>
                <label>value{selectedPortion}</label>
              </>
            ) : (
              <>
                Poll Results Chart
                {chartData.labels.map((l, i) => (
                  <>
                    <label>{l}</label>
                    <label>{chartData.datasets[0].data[i]}</label>
                  </>
                ))}
              </>
            )}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

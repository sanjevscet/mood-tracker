import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import Loader from "./Loader";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#2ECC71",
        "#9B59B6",
        "#FF5733",
      ],
      hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#2ECC71",
        "#9B59B6",
        "#FF5733",
      ],
    },
  ],
};

const options = {
  animation: {
    animateScale: true,
  },
  legend: {
    display: true,
    position: "bottom", // Set the legend position to 'bottom'
    labels: {
      fontSize: 17,
      boxWidth: 15,
      padding: 10,
    },
  },
};
interface IProps {
  labels: string[];
  values: number[];
}

const PieChart: React.FC<IProps> = (props: IProps) => {
  const { labels, values } = props;

  data.labels = labels;
  data.datasets[0].data = values;

  return (
    <>
      {values.length > 0 ? (
        <div style={{ width: "600px", height: "600px" }}>
          <Pie data={data} options={options} />
          <div className="text-center mt-3">
            On the basis of above analysis, Skill Gap is found in <b>Java</b>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default PieChart;

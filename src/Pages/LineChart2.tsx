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
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  getMoodDataByDay,
  getMoodDataByDayForUser,
  uniqueEmployee,
} from "./utils";

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
      position: "bottom" as const,
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

export function MoodLineChart2() {
  //   console.log(uniqueMoods);
  //   constuniqueEmployee });

  console.log(JSON.stringify(getMoodDataByDay()));
  const formattedUsername = (email: string): string => {
    const username = email.split("@")[0]; // Remove domain
    const formattedUsername = username
      .replace(/\./g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Replace dots and capitalize
    return formattedUsername;
  };

  const [selectedOption, setSelectedOption] = useState<string>(
    uniqueEmployee[0]
  );

  const { labels, values } = getMoodDataByDayForUser(selectedOption);

  console.log({ labels, values });

  const handleDropdownChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedOption(event.target.value);
  };

  const formattedUser: string = formattedUsername(selectedOption);

  const data = {
    labels,
    datasets: [
      {
        label: "Happy Index for " + formattedUser,
        data: labels.map((l, i) => values[i]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <div style={{ height: "90%", width: "50%" }}>
      <div className="form-group">
        <label htmlFor="dropdown">Select User:</label>
        <select
          className="form-control"
          id="dropdown"
          value={selectedOption}
          onChange={handleDropdownChange}
        >
          {uniqueEmployee.map((emp, index) => {
            return (
              <option key={"option" + index} value={emp}>
                {formattedUsername(emp)}
              </option>
            );
          })}
        </select>
      </div>
      {/* <p>Selected Option: {formattedUsername(selectedOption)}</p>
      <p>Selected Option: {selectedOption}</p> */}
      <Line options={options} data={data} height={800} width={800} />
    </div>
  );
}

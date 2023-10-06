import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { generateDummyData, getMoodDataByDay, uniqueEmployee } from "./utils";
import Loader from "./Loader";

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
  },
  scales: {
    y: {
      min: 0, // Set the minimum value of Y-axis to 0
      max: 100, // Set the maximum value of Y-axis to 100
      beginAtZero: true, // Ensure the Y-axis starts from 0
    },
  },
};

export function EmployeeChart() {
  console.log("generateDummyData", JSON.stringify(generateDummyData()));

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

  //   const { labels, values } = getMoodDataByDayForUser(selectedOption);

  const [period, setPeriod] = useState("last-week");

  //   console.log(uniqueMoods);
  const { labels, values } = getMoodDataByDay(period);

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
        fill: true,
        label: "Happy Index for " + formattedUser,
        data: labels.map((l, i) => values[i]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const [loader, setLoader] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className="container" style={{ paddingBottom: 60 }}>
          <div
            className="d-flex flex-row"
            style={{ gap: 20, marginBottom: 10 }}
          >
            <div className="form-group">
              <label htmlFor="dropdown">Select User:</label>
              <select
                className="form-control"
                id="dropdown"
                style={{ width: 200, outline: "none" }}
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
            <div className="form-group">
              <label htmlFor="period">Select Period:</label>
              <select
                className="form-select"
                id="period"
                style={{ width: 200, outline: "none" }}
                defaultValue={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                {/* <option>Select Period</option> */}
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-3-month">Last 3 Months</option>
              </select>
            </div>
          </div>
          <div className="" style={{ height: "70vh" }}>
            <Line options={options} data={data} height={900} width={1000} />
          </div>
        </div>
      )}
    </>
  );
}

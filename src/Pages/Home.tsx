import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../Constants";
import Loader from "./Loader";
import { MoodLineChart } from "./LineChart";
import { MoodLineChart2 } from "./LineChart2";

import { Row, Col } from "react-bootstrap";

export default function Home() {
  const [apiData, setApiData] = useState([]);

  const getApiData = async () => {
    const { data } = await axios.get(API_URL + "/getcurrentskills");
    setApiData(data);
  };

  const labels: string[] = apiData.map((d) => {
    const label = d[0] as string;
    return label;
  });
  const values: number[] = apiData.map((d) => d[1] as number);

  useEffect(() => {
    getApiData();
  }, []);

  return (
    <>
      {values.length > 0 ? (
        <Row>
          <Col sm={6}>
            <MoodLineChart />
          </Col>
          <Col sm={6}>
            <MoodLineChart2 />
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
    </>
  );
}

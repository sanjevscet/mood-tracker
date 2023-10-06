import React, { useEffect } from "react";
import { MoodLineChart } from "./LineChart";

import { Row, Col } from "react-bootstrap";
import Loader from "./Loader";

export default function Home() {
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      {!loader ? (
        <Row>
          <Col sm={12}>
            <MoodLineChart />
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
    </>
  );
}

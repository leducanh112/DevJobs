import { Col, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CVStatistic from "./CVStatistic";
import InfoCompany from "./InfoCompany";

function Dashboard() {
  return (
    <>
      <h1>Tổng quan</h1>
      <Row gutter={[20, 20]}>
        <Col span={8}>
          <JobStatistic></JobStatistic>
        </Col>

        <Col span={8}>
          <CVStatistic></CVStatistic>
        </Col>

        <Col span={8}>
          <InfoCompany></InfoCompany>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;

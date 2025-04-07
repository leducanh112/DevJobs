import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getDetailCompany } from "../../services/companyService";
import GoBack from "../../components/GoBack";
import { getListJob } from "../../services/jobService";
import { Row, Col } from "antd";
import JobItem from "../../components/JobItem";

function CompanyDetail() {
  const params = useParams();
  const [infoCompany, setInfoCompany] = useState([]);
  const [jobs, setJobs] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailCompany(params.id);
      if (response) {
        setInfoCompany(response);
      }
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListJob(params.id);
      if (response) {
        setJobs(response);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <GoBack></GoBack>

      {infoCompany && (
        <>
          <h1>{infoCompany.companyName}</h1>
          <div className="mb-20">
            Địa chỉ: <strong>{infoCompany.address}</strong>
          </div>

          <div className="mb-20">
            Số lượng nhân sự: <strong>{infoCompany.quantityPeople}</strong>
          </div>

          <div className="mb-20">
            Thời gian làm việc: <strong>{infoCompany.workingTime}</strong>
          </div>

          <div className="mb-20">
            Website: <strong>{infoCompany.website}</strong>
          </div>
          <div className="mb-10">Mô tả ngắn:</div>
          <div className="mb-20">{infoCompany.description}</div>
          <div className="mb-10">Mô tả chi tiết:</div>
          <div className="mb-20">{infoCompany.detail}</div>
          <div className="mb-10">Danh sách các job:</div>
          <div className="mb-20">
            <Row gutter={[20, 20]}>
              {jobs &&
                jobs.map((item) => (
                  <Col span={8} key={item.id}>
                    <JobItem item={item}></JobItem>
                  </Col>
                ))}
            </Row>
          </div>
        </>
      )}
    </>
  );
}

export default CompanyDetail;

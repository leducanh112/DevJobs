import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailCV } from "../../../services/cvService";
import { getDetailJob } from "../../../services/jobService";
import { changeStatusCV } from "../../../services/cvService";
import GoBack from "../../../components/GoBack";
import { Card, Tag } from "antd";

function CVDetail() {
  const params = useParams();
  const [cv, setCV] = useState();
  const [job, setJob] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailCV(params.id);
      if (response) {
        const responseJob = await getDetailJob(response.idJob);
        if (responseJob) {
          setCV(response);
          setJob(responseJob);
        }
      }
      changeStatusCV(params.id, { statusRead: true });
    };
    fetchApi();
  }, []);
  return (
    <>
      <GoBack></GoBack>
      {cv && job && (
        <>
          <Card title={`Ứng viên: ${cv.name}`} className="mb-20">
            <div className="mb-10">
              Ngày gửi: <strong>{cv.createAt}</strong>
            </div>
            <div className="mb-10">
              Số điện thoại <strong>{cv.phone}</strong>
            </div>
            <div className="mb-10">
              Email: <strong>{cv.email}</strong>
            </div>
            <div className="mb-10">
              Thành phố ứng tuyển: <strong>{cv.city}</strong>
            </div>
            <div className="mb-10">
              Giới thiệu bản thân:
              <div className="mt-5">{cv.description}</div>
            </div>

            <div className="mb-10">
              Link project:
              <div className="mt-5">{cv.linkProject}</div>
            </div>
          </Card>

          <Card title={`Thông tin job: ${job.name}`} className="mb-20">
            <div className="mb-10">
              Tags:{"  "}
              {job.tags &&
                job.tags.map((item) => <Tag color="blue">{item}</Tag>)}
            </div>
            <div className="mb-10">
              Mức lương <strong>{job.salary}$</strong>
            </div>
            <div className="mb-10">
              Mô tả:
              <div className="mt-5">{job.description}</div>
            </div>
          </Card>
        </>
      )}
    </>
  );
}

export default CVDetail;

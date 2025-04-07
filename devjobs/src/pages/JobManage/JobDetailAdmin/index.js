import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../../services/jobService";
import { useState } from "react";
import GoBack from "../../../components/GoBack";
import { Tag } from "antd";

function JobDetailAdmin() {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailJob(params.id);
      if (response) {
        setData(response);
      }
    };
    fetchApi();
  }, []);
  return (
    <>
      <GoBack></GoBack>

      {data && (
        <>
          <h1>Tên job: {data.name}</h1>
          <div className="mb-20">
            <span>Trạng thái: </span>
            {data.status ? (
              <Tag color="green">Đang bật</Tag>
            ) : (
              <Tag color="red">Đang Tắt</Tag>
            )}
          </div>

          <div className="mb-20">
            <span>Tags: </span>
            {data.tags &&
              data.tags.map((item) => <Tag color="blue">{item}</Tag>)}
          </div>

          <div className="mb-20">
            <span>
              Mức lương: <strong>{data.salary}$</strong>
            </span>
          </div>

          <div className="mb-20">
            <span>
              Ngày tạo: <strong>{data.createAt}</strong>
            </span>
          </div>

          <div className="mb-20">
            <span>
              Cập nhật: <strong>{data.updateAt}</strong>
            </span>
          </div>

          <div className="mb-20">
            <span>Thành phố: </span>
            {data.city &&
              data.city.map((item) => <Tag color="orange">{item}</Tag>)}
          </div>

          <div className="mb-20">
            <span>Mô tả: </span>
            {data.description}
          </div>
        </>
      )}
    </>
  );
}

export default JobDetailAdmin;

import { useParams } from "react-router-dom";
import {
  Input,
  Select,
  Form,
  notification,
  Button,
  Tag,
  Card,
  Row,
  Col,
  message,
} from "antd";
import { useState, useEffect } from "react";
import { getDetailCompany } from "../../services/companyService";
import { getDetailJob } from "../../services/jobService";
import GoBack from "../../components/GoBack";
import { getTimeCurrent } from "../../helpers/getTime";
import { createCV } from "../../services/cvService";

const { TextArea } = Input;
const { Option } = Select;
function JobDetail() {
  const params = useParams();
  const [job, setJob] = useState();
  const [form] = Form.useForm();
  const [noti, contextHolder] = notification.useNotification();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailJob(params.id);
      const infoCompany = await getDetailCompany(response.idCompany);
      const dataFinal = {
        ...response,
        infoCompany: infoCompany,
      };
      setJob(dataFinal);
    };
    fetchApi();
  }, []);
  const rules = [
    {
      required: true,
      message: "Bắt Buộc!",
    },
  ];
  const onFinish = async (values) => {
    values.idJob = job.id;
    values.idCompany = job.infoCompany.id;
    values.createAt = getTimeCurrent();
    const response = await createCV(values);
    if (response) {
      form.resetFields();
      noti.success({
        message: "Gửi yêu cầu thành công!",
        description:
          "Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất.",
      });
    } else {
      noti.error({
        message: "Gửi yêu cầu không thành công!",
        description: "Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu!",
      });
    }
  };
  return (
    <>
      {contextHolder}
      <GoBack />
      {job && (
        <>
          <h1>{job.name}</h1>
          <Button
            href="#formApply"
            type="primary"
            size="large"
            className="mb-20"
          >
            ỨNG TUYỂN NGAY
          </Button>
          <div className="mb-20">
            <span>Tags: </span>
            {(job.tags || []).map((item, index) => {
              return (
                <Tag color="blue" key={index}>
                  {item}
                </Tag>
              );
            })}
          </div>
          <div className="mb-20">
            <span>Thành phố: </span>
            {(job.city || []).map((item, index) => {
              return (
                <Tag color="orange" key={index}>
                  {item}
                </Tag>
              );
            })}
          </div>
          <div className="mb-20">
            Mức lương: <strong>{job.salary}</strong>
          </div>
          <div className="mb-20">
            Địa chỉ công ty: <strong>{job.infoCompany.address}</strong>
          </div>
          <div className="mb-20">
            <div className="mb-10">Mô tả công việc:</div>
            <div>{job.description}</div>
          </div>
          <div className="mb-20">
            <div className="mb-10">Giới thiệu công ty:</div>
            <div>{job.infoCompany.description}</div>
          </div>

          <Card title="Ứng tuyển ngay" id="formApply">
            <Form
              name="form-apply"
              form={form}
              layout="vertical"
              onFinish={onFinish}
            >
              <Row gutter={20}>
                <Col span={6}>
                  <Form.Item label="Họ tên" name="name" rules={rules}>
                    <Input></Input>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                    <Input></Input>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item label="Email" name="email" rules={rules}>
                    <Input></Input>
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item label="Thành phố" name="city" rules={rules}>
                    <Select>
                      {job.city.map((item, index) => {
                        return (
                          <Option
                            value={item}
                            label={item}
                            key={index}
                          ></Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Giới thiệu bản thân"
                    name="description"
                    rules={rules}
                  >
                    <TextArea rows={6}></TextArea>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item
                    label="Danh sách project đã làm"
                    name="linkProject"
                    rules={rules}
                  >
                    <TextArea rows={6}></TextArea>
                  </Form.Item>
                </Col>

                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      GỬI YÊU CẦU
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </>
      )}
    </>
  );
}

export default JobDetail;

import { Button, Card, Col, Form, Input, message, Row } from "antd";
import { getCookie } from "../../helpers/cookie";
import { useEffect, useState } from "react";
import { getDetailCompany, editCompany } from "../../services/companyService";
const { TextArea } = Input;

const rules = [
  {
    required: true,
    message: "Bắt Buộc!",
  },
];
function InfoCompany() {
  const idCompany = getCookie("id");
  const [info, setInfo] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [mess, contextHolder] = message.useMessage();

  const fetchApi = async () => {
    const response = await getDetailCompany(idCompany);
    if (response) {
      setInfo(response);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    const response = await editCompany(idCompany, values);
    if (response) {
      mess.success("Cập nhật thành công!");
      fetchApi();
      setIsEdit(false);
    }
  };

  const handleCancel = () => {
    setIsEdit(false);
    form.resetFields();
  };
  const handleEdit = () => {
    setIsEdit(true);
  };
  return (
    <>
      {contextHolder}
      {info && (
        <Card
          title="Thông tin công ty"
          extra={
            !isEdit ? (
              <Button onClick={handleEdit}>Chỉnh sửa</Button>
            ) : (
              <Button onClick={handleCancel}>Hủy</Button>
            )
          }
        >
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={info}
            form={form}
            disabled={!isEdit}
          >
            <Row gutter={20}>
              <Col span={24}>
                <Form.Item label="Tên công ty" name="companyName" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Email" name="email" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Số điện thoại" name="phone" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Địa chỉ" name="address" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Số lượng nhân sự"
                  name="quantityPeople"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Thời gian làm việc"
                  name="workingTime"
                  rules={rules}
                >
                  <Input />
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item label="Link website" name="website" rules={rules}>
                  <Input />
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Mô tả ngắn" name="description" rules={rules}>
                  <TextArea rows={4}></TextArea>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item label="Mô tả chi tiết" name="detail" rules={rules}>
                  <TextArea rows={16}></TextArea>
                </Form.Item>
              </Col>

              {isEdit && (
                <Col span={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>

                    <Button onClick={handleCancel} className="ml-10">
                      Hủy
                    </Button>
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Form>
        </Card>
      )}
    </>
  );
}

export default InfoCompany;

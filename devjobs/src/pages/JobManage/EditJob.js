import { useEffect, useState } from "react";
import {
  Form,
  message,
  Input,
  Tooltip,
  Button,
  Modal,
  Row,
  Col,
  Select,
  Switch,
} from "antd";
import { getListTag } from "../../services/tagService";
import { getTimeCurrent } from "../../helpers/getTime";
import { updateJob } from "../../services/jobService";
import { EditOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const rules = [
  {
    required: true,
    message: "Bắt Buộc!",
  },
];
function EditJob(props) {
  const { record, onReload } = props;
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const [mess, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTag();
      if (response) {
        setTags(response);
      }
    };
    fetchApi();
  }, []);

  const handleFinish = async (values) => {
    values.updateAt = getTimeCurrent();
    const response = await updateJob(record.id, values);
    if (response) {
      setIsModalOpen(false);
      onReload();
      mess.open({
        type: "success",
        content: "Cập nhật thành công!",
        duration: 5,
      });
    } else {
      mess.open({
        type: "error",
        content: "Cập nhật thất bại!",
        duration: 3,
      });
    }
  };
  return (
    <>
      {contextHolder}

      <Tooltip title="Chỉnh sửa">
        <Button
          onClick={showModal}
          className="ml-5"
          icon={<EditOutlined />}
          type="primary"
        ></Button>
      </Tooltip>
      <Modal
        title="Chỉnh sửa"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          onFinish={handleFinish}
          layout="vertical"
          form={form}
          initialValues={record}
        >
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên job" name={"name"} rules={rules}>
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item label="Tags" name={"tags"} rules={rules}>
                <Select mode="multiple" options={tags}></Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Mức lương" name={"salary"} rules={rules}>
                <Input addonAfter="$"></Input>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Thành phố" name={"city"} rules={rules}>
                <Select mode="multiple" options={city}></Select>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Mô tả" name={"description"} rules={rules}>
                <TextArea rows={16}></TextArea>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                valuePropName="checked"
                label="Trạng thái"
                name={"status"}
                rules={rules}
              >
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt"></Switch>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
}

export default EditJob;

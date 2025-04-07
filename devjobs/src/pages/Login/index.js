import { useNavigate } from "react-router-dom";
import * as company from "../../services/companyService";
import { useDispatch } from "react-redux";
import { Card, Col, message, Row, Form, Input, Button } from "antd";
import { setCookie } from "../../helpers/cookie";
import { checkLogin } from "../../actions/login";

const rules = [
  {
    required: true,
    message: "Bắt Buộc!",
  },
];
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const data = await company.login(values.email, values.password);
    if (data.length > 0) {
      const time = 1;
      setCookie("id", data[0].id, time);
      setCookie("companyName", data[0].companyName, time);
      setCookie("email", data[0].email, time);
      setCookie("token", data[0].token, time);
      dispatch(checkLogin(true));
      navigate("/");
    } else {
      messageApi.error("Tài khoản hoặc mật khẩu không chính xác!");
    }
  };
  return (
    <>
      {contextHolder}
      <Row justify={"center"}>
        <Col span={12}>
          <Card title="Đăng nhập">
            <Form onFinish={onFinish} layout="vertical">
              <Form.Item label="Email" name={"email"} rules={rules}>
                <Input />
              </Form.Item>
              <Form.Item label="Password" name={"password"} rules={rules}>
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Đăng nhập
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Login;

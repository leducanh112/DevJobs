import { Menu } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  BarsOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
function MenuSider() {
  const items = [
    {
      label: <Link to="/admin">Tổng quan</Link>,
      icon: <DashboardOutlined />,
      key: "/admin",
    },
    {
      label: <Link to="/info-company">Thông tin công ty</Link>,
      icon: <UserOutlined />,
      key: "/info-company",
    },
    {
      label: <Link to="/job-manage">Quản lý việc làm</Link>,
      icon: <BarsOutlined />,
      key: "/job-manage",
    },
    {
      label: <Link to="/cv-manage">Quản lý CV</Link>,
      icon: <ContactsOutlined />,
      key: "/cv-manage",
    },
  ];
  return (
    <>
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={["/admin"]}
        defaultOpenKeys={["/admin"]}
      />
    </>
  );
}

export default MenuSider;

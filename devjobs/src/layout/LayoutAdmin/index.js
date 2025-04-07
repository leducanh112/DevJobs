import { useSelector } from "react-redux";
import { useState } from "react";
import { Layout } from "antd";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import MenuSider from "./MenuSider";
import Footer from "../LayoutDefault/Footer";
import "./LayoutAdmin.scss";

const { Sider, Content } = Layout;
function LayoutAdmin() {
  const login = useSelector((state) => state.loginReducer);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <Layout className="layout-admin">
        <Header collapsed={collapsed} setCollapsed={setCollapsed}></Header>
        <Layout
          className={
            "layout-admin__main " + (collapsed && "layout-admin__main-fold")
          }
        >
          <Sider
            breakpoint="lg"
            theme="light"
            collapsed={collapsed}
            width={230}
            onBreakpoint={(e) => setCollapsed(e)}
          >
            <MenuSider></MenuSider>
          </Sider>
          <Content className="layout-admin__content">
            <Outlet />
          </Content>
        </Layout>
        <Footer />
      </Layout>
    </>
  );
}

export default LayoutAdmin;

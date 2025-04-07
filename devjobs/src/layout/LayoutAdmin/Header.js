import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router-dom";

function Header(props) {
  const { collapsed, setCollapsed } = props;

  return (
    <>
      <div className="header">
        <div
          className={"header__logo " + (collapsed && "header__logo-collapsed")}
        >
          <h2>DevJobs</h2>
        </div>

        <div className="header__nav">
          <div className="header__nav-left">
            <div
              className="header__collapse"
              onClick={() => setCollapsed(!collapsed)}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
          </div>
          <div className="header__nav-right">
            <Button className="mr-10">
              <Link to={"/"}>
                <HomeOutlined /> Trang chủ
              </Link>
            </Button>

            <Button>
              <Link to={"/logout"}>
                <LogoutOutlined /> Đăng xuất
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

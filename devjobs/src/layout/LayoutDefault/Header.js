import Login from "../../pages/Login";
import Register from "../../pages/Register";
import { Button } from "antd";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";

function Header() {
  const isLogin = useSelector((state) => state.loginReducer);
  return (
    <>
      <div className="layout-default__header">
        <div className="header-title">
          <Link to={"/"}>
            <h2>DevJobs</h2>
          </Link>
        </div>
        <div className="header-account">
          <div className="header-account__login">
            {isLogin ? (
              <>
                {" "}
                <Button className="mr-10">
                  <Link to={"/admin"}>Quản lý</Link>
                </Button>
                <Button>
                  <Link to={"/logout"}>
                    <LogoutOutlined /> Đăng xuất
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <Button className="mr-10" type="primary">
                  <Link to={"/login"}>Đăng nhập</Link>
                </Button>
                <Button>
                  <Link to={"/register"}>Đăng ký</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;

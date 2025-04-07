import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import "./LayoutDefault.scss";

function LayoutDefault() {
  return (
    <>
      <div className="layout-default">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}

export default LayoutDefault;

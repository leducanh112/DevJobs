import LayoutDefault from "../layout/LayoutDefault";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Logout from "../pages/Logout";
import Search from "../pages/Search";
import JobDetail from "../pages/JobDetail";
import Company from "../pages/Company";
import CompanyDetail from "../pages/CompanyDetail";
import { Navigate } from "react-router-dom";
import PrivateRoutes from "../components/PrivateRoutes";
import Dashboard from "../pages/Dashboard";
import InfoCompany from "../pages/InfoCompany";
import JobManage from "../pages/JobManage";
import LayoutAdmin from "../layout/LayoutAdmin";
import CreateJob from "../pages/JobManage/CreateJob";
import CVManage from "../pages/CVManage";
import CVDetail from "../pages/CVManage/CVDetail";
import JobDetailAdmin from "../pages/JobManage/JobDetailAdmin";

export const routes = [
  {
    path: "/",
    element: <LayoutDefault></LayoutDefault>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "logout",
        element: <Logout></Logout>,
      },
      {
        path: "search",
        element: <Search></Search>,
      },
      {
        path: "job/:id",
        element: <JobDetail></JobDetail>,
      },
      {
        path: "company",
        element: <Company></Company>,
      },
      {
        path: "company/:id",
        element: <CompanyDetail></CompanyDetail>,
      },
      {
        path: "*",
        element: <Navigate to="/" />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        element: <LayoutAdmin></LayoutAdmin>,
        children: [
          {
            path: "admin",
            element: <Dashboard />,
          },
          {
            path: "info-company",
            element: <InfoCompany />,
          },
          {
            path: "job-manage",
            element: <JobManage />,
          },
          {
            path: "create-job",
            element: <CreateJob />,
          },
          {
            path: "detail-job/:id",
            element: <JobDetailAdmin />,
          },
          {
            path: "cv-manage",
            element: <CVManage />,
          },
          {
            path: "detail-cv/:id",
            element: <CVDetail />,
          },
        ],
      },
    ],
  },
];

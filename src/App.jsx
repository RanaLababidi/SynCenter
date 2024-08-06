import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  useLoaderData,
} from "react-router-dom";
//pages
import Home from "./Pages/Home.jsx";
import Login, { Action as loginAction } from "./Pages/Auth/Login.jsx";
import Logout from "./Pages/Auth/Logout.jsx";
import ForgetPassword, {
  Action as forgotPasswordAction,
} from "./Pages/Auth/ForgetPassword.jsx";
import CheckCode, {
  Action as checkCodeAction,
} from "./Pages/Auth/CheckCode.jsx";
import ResetPassword, {
  Action as resetPasswordAction,
} from "./Pages/Auth/ResetPassword.jsx";
import SuccessResetPassword from "./Pages/Auth/SuccessResetPassword.jsx";
import Projects from "./Pages/Projects.jsx";
import EmployeeProfile from "./Pages/EmployeeProfile.jsx";
import Clients from "./Pages/Clients.jsx";
import Employees from "./Pages/Employees.jsx";
import Statistics from "./Pages/Statistics.jsx";
import TasksDetails from "./Pages/TasksDetails.jsx";
import MainNavigation from "./components/MainNavigation.jsx";
import ProjectNav from "./components/ProjectNav.jsx";
import ProjectDetailsInfo from "./Pages/ProjectDetails.jsx";
import {checkAuthLoader } from "./util/auth.js";

import Files from "./Pages/Files.jsx";
import Tasks from "./Pages/Tasks.jsx";
import {
  projectsIndex,
  projectDetailsLoader,
  clientsIndex,
  employeesIndex,
  employeeDetailsLoader,
  TasksLoade,
  
} from "./http.js";
/*
function to declare the routers:createBrowserRouter
path:with route active
component loaded when the route active
function to init the routes:RouterProvider
component to link the routes(same the <a>):<Link>
-for nav the exicste in all pages
component to marks  where the childe element shoud render to:<Outlet>
Hook for triger a  navigation action:useNavigat
Hook for dynamic path:"/:id":useParams
Hook for access the loader iteribout closes data fethced from the backend:useLoaderData
Hook as useLoaderData but with the compo
path:
if path start with"/" :absoulte path:added directly after domain name
losding text in the ui:useNavighation
{navigation.state==loading<p>loading....33</p>}

*/

const router = createBrowserRouter([
  { path: "", element: <ProjectNav /> },
  {
    path: "/auth",
    //errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Login />, action: loginAction },
      {
        path: "forgetPassword",
        children: [
          {
            index: true,
            element: <ForgetPassword />,
            action: forgotPasswordAction,
          },
          {
            path: "checkCode",
            element: <CheckCode />,
            action: checkCodeAction,
          },
          {
            path: "resetPassword",
            element: <ResetPassword />,
            action: resetPasswordAction,
          },
          { path: "successRestPasword", element: <SuccessResetPassword /> },
        ],
      },
    ],
  },
  {
    path: "/home",
    element: <MainNavigation />,
    //errorElement: <ErrorPage />,
    id: "root",
    loader: checkAuthLoader,
    children: [
      { path: "statistics", element: <Statistics /> },
      {
        path: "projects",
        id: "projects",
        loader: projectsIndex,
        children: [
          { path: "", element: <Projects /> },
          {
            path: ":projectId",
            element: <ProjectNav />,
            id: "projectsDetails",
            loader: projectDetailsLoader,
            children: [
              { path: "info", element: <ProjectDetailsInfo /> },
              { path: "tasks",id:"tasks",loader:TasksLoade, children:[
               {path:"", element: <Tasks />},
               {path:":tasktId" , element:<TasksDetails/>}
              ]},
              { path: "files", element: <Files /> },
            ],
          },
        ],
      },
      {
        path: "employees",
        id: "employees",
        loader: employeesIndex,
        children: [
          { path: "", element: <Employees /> },
          {
            path: ":employeeId",
            element: <EmployeeProfile />,
            id: "employeeProfile",
            loader: employeeDetailsLoader,
          },
        ],
      },
      {
        path: "clients",
        element: <Clients />,
        id: "clients",
        loader: clientsIndex,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;

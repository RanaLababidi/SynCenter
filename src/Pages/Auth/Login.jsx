import React from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
  json,
  redirect,
  Link,
} from "react-router-dom";
import "../../css/all.css"; // Adjust the path accordingly
import "@fortawesome/fontawesome-free/css/all.css";
import Error from "../../components/Error.jsx";
import AuthFrorm from "../../components/AuthForm.jsx";

function Login() {
  return <AuthFrorm />;
}

export default Login;

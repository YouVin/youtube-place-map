import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Dashboard from "./Dashboard"; // 로그인 성공 후 이동할 컴포넌트

const clientId = "YOUR_CLIENT_ID.apps.googleusercontent.com";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

function Login() {
  const navigate = useNavigate();

  const onSuccess = (response) => {
    console.log("Login Success:", response);

    navigate("/dashboard");
  };

  const onFailure = (response) => {
    console.log("Login Failed:", response);
  };

  return (
    <div>
      <h1>구글 로그인</h1>
      <GoogleLogin
        clientId={clientId}
        buttonText="구글로 로그인"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}

export default App;

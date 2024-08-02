import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Dashboard from "./Dashboard"; // 로그인 성공 후 이동할 컴포넌트
import axios from "axios";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function App() {
  const [user, setUser] = useState(null); // 사용자 정보를 상태로 관리

  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/" element={<Login setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

function Login({ setUser }) {
  const navigate = useNavigate();

  const onSuccess = (response) => {
    const token = response.credential;

    axios
      .post(
        "http://localhost:8080/api/auth/google/",
        { token },
        {
          withCredentials: true, // 쿠키를 포함해서 요청할 경우
        }
      )
      .then((res) => {
        setUser({
          email: res.data.email,
          picture: res.data.picture,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error fetching user info: ", error);
      });
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

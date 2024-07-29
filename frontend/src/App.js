// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:8080/loginSuccess", {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  const fetchToken = async () => {
    try {
      const response = await axios.get("http://localhost:8080/token", {
        withCredentials: true,
      });
      setToken(response.data);
    } catch (error) {
      console.error("Error fetching token", error);
    }
  };

  useEffect(() => {
    // 사용자가 로그인한 경우 사용자 정보와 액세스 토큰을 가져옵니다.
    if (user) {
      fetchUserDetails();
      fetchToken();
    }
  }, [user]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>구글 로그인 예제</h1>
              {!user ? (
                <button onClick={handleLogin}>구글로 로그인</button>
              ) : (
                <div>
                  <h2>환영합니다, {user.name}</h2>
                  <p>액세스 토큰: {token}</p>
                </div>
              )}
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

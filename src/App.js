import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import YouTubeInfo from "./components/YouTubeInfo";
import LoginPage from "./components/LoginPage";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userObject) => {
    setUser(userObject);
    console.log("로그인 성공:", userObject); // 로그인 성공 시 콘솔에 출력
  };

  const handleLoginFailure = (error) => {
    console.error("로그인 실패:", error);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <YouTubeInfo user={user} />
              ) : (
                <LoginPage
                  onLoginSuccess={handleLoginSuccess}
                  onLoginFailure={handleLoginFailure}
                />
              )
            }
          />
          <Route
            path="/login"
            element={
              <LoginPage
                onLoginSuccess={handleLoginSuccess}
                onLoginFailure={handleLoginFailure}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

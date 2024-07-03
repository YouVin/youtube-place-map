import React from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLoginSuccess, onLoginFailure }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (userObject) => {
    onLoginSuccess(userObject);
    navigate("/"); // 로그인 성공 후 리다이렉트할 경로
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <GoogleLoginButton
        onSuccess={handleLoginSuccess}
        onFailure={onLoginFailure}
      />
    </div>
  );
};

export default LoginPage;

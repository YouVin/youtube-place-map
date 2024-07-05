import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLoginSuccess, onLoginFailure }) => {
  const navigate = useNavigate();
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const scopes = [
    "https://www.googleapis.com/auth/youtube.readonly",
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/youtubepartner",
    // 필요한 다른 스코프를 추가할 수 있습니다.
  ];

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    const decodedToken = jwtDecode(token);

    const userObject = {
      id: decodedToken.sub,
      email: decodedToken.email,
      name: decodedToken.name,
      picture: decodedToken.picture,
      token: token,
    };

    onLoginSuccess(userObject);
    navigate("/");
  };

  const handleLoginFailure = (error) => {
    console.error("로그인 실패:", error);
    onLoginFailure("로그인에 실패했습니다.");
  };

  return (
    <div>
      <h2>Google로 로그인</h2>
      <GoogleOAuthProvider
        clientId={clientId}
        scope={scopes.join(" ")}
        prompt="consent"
      >
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default LoginPage;

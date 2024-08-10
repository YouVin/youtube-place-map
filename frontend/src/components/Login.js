import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

const Login = ({ onLoginSuccess }) => {
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      console.log("Access Token:", accessToken);
      onLoginSuccess(accessToken);
    },
    onError: (error) => {
      console.error("로그인 실패 error : ", error);
    },
    scope: [
      "https://www.googleapis.com/auth/youtube.readonly",
      "https://www.googleapis.com/auth/youtube",
      "https://www.googleapis.com/auth/youtube.force-ssl",
      "https://www.googleapis.com/auth/youtubepartner",
    ].join(" "),
  });

  return (
    <div>
      <h1>로그인</h1>
      <button onClick={login}>구글 로그인</button>
    </div>
  );
};

export default Login;

// src/LoginSuccessPage.js
import React from "react";

const LoginSuccessPage = ({ user, token }) => {
  return (
    <div>
      <h1>로그인 성공</h1>
      <h2>환영합니다, {user.name}</h2>
      <p>액세스 토큰: {token}</p>
    </div>
  );
};

export default LoginSuccessPage;

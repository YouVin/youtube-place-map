// src/App.js
import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

const App = () => {
  const [user, setUser] = useState(null);

  const responseGoogle = async (response) => {
    const token = response.tokenId; // 구글에서 받은 토큰
    try {
      const res = await axios.post("http://localhost:8080/api/auth/google", {
        token,
      });
      setUser(res.data); // 서버에서 받은 사용자 정보
    } catch (error) {
      console.error("Error fetching user data", error);
    }
  };

  return (
    <div>
      <h1>구글 로그인</h1>
      <GoogleLogin
        clientId="YOUR_GOOGLE_CLIENT_ID"
        buttonText="구글로 로그인"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      {user && (
        <div>
          <h2>환영합니다, {user.name}</h2>
          <p>이메일: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default App;

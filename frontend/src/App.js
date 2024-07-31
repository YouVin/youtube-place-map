import React from "react";
import { GoogleLogin } from "react-google-login";

const clientId = "YOUR_CLIENT_ID.apps.googleusercontent.com";

function App() {
  const onSuccess = (response) => {
    console.log("Login Success:", response);
    // 서버에 토큰 전송
    fetch("http://localhost:8080/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: response.tokenId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // 로그인 성공 후 처리
      })
      .catch((error) => {
        console.error("Error:", error);
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

import React, { useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const App = () => {
  const [userInfo, setUserInfo] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    const jwtToken = credentialResponse.credential; // JWT 토큰 받기
    const decoded = jwtDecode(jwtToken); // JWT 디코딩

    const userEmail = decoded.email; // 이메일
    const userName = decoded.name; // 이름
    const userProfilePic = decoded.picture; // 프로필 사진 URL

    // 사용자 정보를 상태에 저장
    setUserInfo({
      email: userEmail,
      name: userName,
      profilePic: userProfilePic,
    });
  };

  return (
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <div>
        <h1>구글 로그인 예제</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("로그인 실패")}
        />
        {userInfo && (
          <div>
            <h2>사용자 정보</h2>
            <p>이메일: {userInfo.email}</p>
            <p>이름: {userInfo.name}</p>
            <img src={userInfo.profilePic} alt="Profile" />
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;

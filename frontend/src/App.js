import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function App() {
  const handleLoginSuccess = (response) => {
    const decoded = jwtDecode(response.credential);
    console.log("Login Success: ", decoded);

    // Access token 가져오기
    const accessToken = response.credential;
    console.log("Access Token:", accessToken); // 액세스 토큰 확인용 로그

    // 유튜브 API 호출을 위한 액세스 토큰 설정
    fetchYouTubeData(accessToken);
  };

  const handleLoginFailure = (error) => {
    console.log("Login Failed: ", error);
  };

  const fetchYouTubeData = async (accessToken) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/youtube/v3/channels?part=snippet&mine=true",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch YouTube data");
      }

      const data = await response.json();
      console.log("YouTube Data: ", data);
    } catch (error) {
      console.error("Error fetching YouTube data: ", error);
    }
  };

  return (
    <div className="App">
      <h1>Google OAuth2 Login</h1>
      <GoogleLogin
        onSuccess={handleLoginSuccess}
        onFailure={handleLoginFailure}
        scope="https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner"
      />
    </div>
  );
}

export default App;

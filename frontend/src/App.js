import React, { useState } from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";

const App = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [likeCount, setLikeCount] = useState(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token; // 액세스 토큰 가져오기
      console.log("Access Token:", accessToken);
      fetchLikeCount(accessToken, videoUrl);
    },
    onError: (error) => {
      console.error("로그인 실패:", error);
    },
    scope: "https://www.googleapis.com/auth/youtube.readonly", // 필요한 스코프 추가
  });

  const fetchLikeCount = async (accessToken, url) => {
    const videoId = extractVideoId(url);
    if (!videoId) {
      console.error("유효하지 않은 유튜브 URL입니다.");
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setLikeCount(data.items[0].statistics.likeCount);
      } else {
        console.error("동영상 정보를 가져오는 데 실패했습니다.", data);
      }
    } catch (error) {
      console.error("좋아요 요청 실패:", error);
    }
  };

  const extractVideoId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null; // 비디오 ID 반환
  };

  return (
    <div>
      <h1>유튜브 좋아요 수 조회</h1>
      <input
        type="text"
        placeholder="유튜브 동영상 URL을 입력하세요"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={login}>구글 로그인</button>
      {likeCount !== null && (
        <div>
          <h2>좋아요 수: {likeCount}</h2>
        </div>
      )}
    </div>
  );
};

const MainApp = () => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  );
};

export default MainApp;

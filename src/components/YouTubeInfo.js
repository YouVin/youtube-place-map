import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchYouTubeVideo } from "../api/fetchYouTubeVideo";
import { Link } from "react-router-dom";
import { refreshAccessToken } from "../utils/tokenUtils";

const YouTubeInfo = ({ user }) => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);

  const {
    data: videoData,
    error: videoError,
    isLoading: videoLoading,
    refetch: refetchVideoData,
  } = useQuery({
    queryKey: ["youtubeVideo", videoId],
    queryFn: () => fetchYouTubeVideo(videoId, user.token),
    enabled: !!videoId && !!user,
  });

  const handleFetchVideoInfo = async () => {
    const urlParts = url.split("v=");
    if (urlParts.length !== 2) {
      alert("유효하지 않은 YouTube URL입니다.");
      return;
    }
    const videoId = urlParts[1];
    setVideoId(videoId);
  };

  const handleRefreshTokenAndFetch = async () => {
    try {
      const newToken = await refreshAccessToken();
      if (newToken) {
        await refetchVideoData();
      } else {
        throw new Error("토큰 갱신에 실패했습니다.");
      }
    } catch (error) {
      console.error("토큰 갱신 및 데이터 다시 불러오기 실패:", error);
      alert("데이터를 다시 불러오는 데 실패했습니다.");
    }
  };

  return (
    <div>
      {!user && <Link to="/login">Google 로그인</Link>}
      {user && (
        <div>
          <h3>{user.name} 님, 환영합니다!</h3>
          <img src={user.picture} alt={user.name} />
        </div>
      )}

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="YouTube URL 입력"
      />
      <button onClick={handleFetchVideoInfo}>비디오 정보 가져오기</button>

      {videoLoading && <p>비디오 정보를 불러오는 중...</p>}
      {videoError && (
        <div>
          <p style={{ color: "red" }}>에러: {videoError.message}</p>
          <button onClick={handleRefreshTokenAndFetch}>
            토큰 갱신 후 다시 시도
          </button>
        </div>
      )}
      {videoData && (
        <div>
          <h4>비디오 정보</h4>
          <p>
            <strong>제목:</strong> {videoData.video.snippet.title}
          </p>
          <p>
            <strong>채널:</strong> {videoData.video.snippet.channelTitle}
          </p>
        </div>
      )}
    </div>
  );
};

export default YouTubeInfo;

import React, { useState } from "react";
import { fetchSubtitles, extractVideoId } from "../services/youtubeService";

const MainPage = ({ accessToken }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [subtitles, setSubtitles] = useState(null);
  const [captionId, setCaptionId] = useState(null); // 자막 ID 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  const handleFetchVideoDetails = async () => {
    setError(null);
    setSubtitles(null);
    setCaptionId(null);

    const videoId = extractVideoId(videoUrl);
    if (!videoId) {
      setError("유효한 유튜브 URL을 입력하세요.");
      return;
    }

    try {
      // fetchSubtitles 호출
      await fetchSubtitles(videoId, accessToken, setSubtitles, setCaptionId);
      // 자막 상태는 fetchSubtitles 내부에서 이미 업데이트됨
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>유튜브 동영상 정보 조회</h1>
      <input
        type="text"
        placeholder="유튜브 동영상 URL을 입력하세요"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
      />
      <button onClick={handleFetchVideoDetails}>정보 조회</button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {subtitles && (
        <div>
          <h3>자막:</h3>
          <pre>{subtitles}</pre> {/* 자막을 화면에 출력 */}
        </div>
      )}
      {captionId && (
        <div>
          <h3>자막 ID: {captionId}</h3> {/* 자막 ID를 화면에 출력 */}
        </div>
      )}
    </div>
  );
};

export default MainPage;

// MainPage.js

import React, { useState } from "react";
import {
  fetchVideoDetails,
  fetchSubtitles,
  fetchLikeCount,
  extractVideoId,
} from "../services/youtubeService";

const MainPage = ({ accessToken }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);
  const [likeCount, setLikeCount] = useState(null);
  const [subtitles, setSubtitles] = useState(null);

  const handleFetchVideoDetails = async () => {
    const videoId = extractVideoId(videoUrl);
    if (videoId) {
      await fetchVideoDetails(accessToken, videoUrl, setVideoDetails);
      const subtitleData = await fetchSubtitles(accessToken, videoId);
      setSubtitles(subtitleData);
      await fetchLikeCount(accessToken, videoUrl, setLikeCount);
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
      {videoDetails && (
        <div>
          <h2>제목: {videoDetails.snippet.title}</h2>
          <h3>좋아요 수: {likeCount}</h3>
          <h3>조회 수: {videoDetails.statistics.viewCount}</h3>
          <h3>댓글 수: {videoDetails.statistics.commentCount}</h3>
          <p>설명: {videoDetails.snippet.description}</p>
          <p>
            게시 날짜:{" "}
            {new Date(videoDetails.snippet.publishedAt).toLocaleDateString()}
          </p>
          <p>채널명: {videoDetails.snippet.channelTitle}</p>
          <img src={videoDetails.snippet.thumbnails.default.url} alt="썸네일" />
        </div>
      )}
      {subtitles && (
        <div>
          <h3>자막:</h3>
          <pre>{subtitles}</pre> {/* 자막을 화면에 출력 */}
        </div>
      )}
    </div>
  );
};

export default MainPage;

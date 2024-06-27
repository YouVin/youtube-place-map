// src/api/fetchYouTubeVideo.js
import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export async function fetchYouTubeVideo(videoId) {
  const response = await axios.get(
    "https://www.googleapis.com/youtube/v3/videos",
    {
      params: {
        part: "snippet",
        id: videoId,
        key: API_KEY,
      },
    }
  );

  if (response.data.items.length === 0) {
    throw new Error("Video not found");
  }

  return response.data.items[0];
}

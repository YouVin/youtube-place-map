import axios from "axios";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

export async function fetchYouTubeVideo(videoId) {
  try {
    // 비디오 정보 가져오기
    const videoResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id: videoId,
          key: API_KEY,
        },
      }
    );

    if (videoResponse.data.items.length === 0) {
      throw new Error("Video not found");
    }

    // 자막 목록 가져오기
    const captionsResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/captions",
      {
        params: {
          part: "snippet",
          videoId: videoId,
          key: API_KEY,
        },
      }
    );

    return {
      video: videoResponse.data.items[0],
      captions: captionsResponse.data.items,
    };
  } catch (error) {
    console.error("Error fetching YouTube video:", error);
    throw new Error("Failed to fetch YouTube video and captions");
  }
}

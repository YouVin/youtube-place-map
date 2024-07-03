import axios from "axios";

export async function fetchYouTubeVideo(videoId, token) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // 비디오 정보 가져오기
    const videoResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        headers,
        params: {
          part: "snippet",
          id: videoId,
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
        headers,
        params: {
          part: "snippet",
          videoId: videoId,
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

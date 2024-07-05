import axios from "axios";

export async function fetchYouTubeVideo(videoId, token) {
  try {
    console.log("videoId:", videoId, "token: ", token);
    const videoResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/videos",
      {
        params: {
          part: "snippet",
          id: videoId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (videoResponse.data.items.length === 0) {
      throw new Error("Video not found");
    }

    return {
      video: videoResponse.data.items[0],
    };
  } catch (error) {
    console.error("YouTube 비디오 및 자막 가져오기 실패:", error);
    throw new Error("YouTube 비디오 및 자막을 가져오는 데 실패했습니다.");
  }
}

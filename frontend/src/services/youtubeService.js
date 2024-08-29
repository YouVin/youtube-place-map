// services/youtubeService.js
import axios from "axios";

export const extractVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const fetchSubtitles = async (
  videoId,
  accessToken,
  setSubtitles,
  setCaptionId
) => {
  if (videoId) {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/captions",
        {
          videoId,
          accessToken,
        },
        {
          responseType: "blob", // 바이너리 파일로 응답받기 위해 설정
        }
      );
      console.log(response.data);
      if (response.data) {
        setSubtitles(response.data.subtitles); // 자막을 상태로 설정합니다.
        setCaptionId(response.data.captionId); // 캡션 ID도 상태로 설정합니다.
      } else {
        console.error("자막을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  } else {
    console.error("Invalid YouTube URL");
  }
};

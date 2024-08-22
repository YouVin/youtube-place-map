// services/youtubeService.js
import axios from "axios";

export const extractVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// export const fetchLikeCount = async (accessToken, url, setLikeCount) => {
//   const videoId = extractVideoId(url);
//   if (!videoId) {
//     console.error("유효하지 않은 유튜브 URL입니다.");
//     return;
//   }

//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=statistics`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     const data = await response.json();
//     if (data.items && data.items.length > 0) {
//       setLikeCount(data.items[0].statistics.likeCount);
//     } else {
//       console.error("동영상 정보를 가져오는 데 실패했습니다.", data);
//     }
//   } catch (error) {
//     console.error("좋아요 요청 실패:", error);
//   }
// };

// export const fetchVideoDetails = async (accessToken, url, setVideoDetails) => {
//   const videoId = extractVideoId(url);
//   if (!videoId) {
//     console.error("유효하지 않은 유튜브 URL입니다.");
//     return;
//   }

//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );
//     const data = await response.json();
//     if (data.items && data.items.length > 0) {
//       setVideoDetails(data.items[0]);
//     } else {
//       console.error("동영상 정보를 가져오는 데 실패했습니다.", data);
//     }
//   } catch (error) {
//     console.error("비디오 정보 요청 실패:", error);
//   }
// };

export const fetchSubtitles = async (videoId, accessToken, setCaptionId) => {
  if (videoId) {
    try {
      const response = await axios.post("http://localhost:8080/api/captions", {
        videoId,
        accessToken,
      });
      if (response.data) {
        setCaptionId(response.data); // 캡션 ID를 상태로 설정합니다.
        const subtitles = await fetchSubtitlesForRange(response.data, videoId); // 자막을 가져옵니다.
        console.log("가져온 자막:", subtitles);
      } else {
        console.error("자막 ID를 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  } else {
    console.error("Invalid YouTube URL");
  }
};

export const fetchSubtitlesForRange = async (captionId, accessToken) => {
  console.log(captionId);
  console.log(accessToken);
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/captions/${captionId}`, // YouTube API URL
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Bearer 토큰 추가
        },
        params: {
          key: process.env.REACT_APP_YOUTUBE_API_KEY, // 발급받은 API 키를 여기에 입력하세요
          tfmt: "srt",
        },
      }
    );

    console.log("자막 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("자막을 가져오는 데 오류가 발생했습니다:", error);
  }
};

// services/youtubeService.js

export const extractVideoId = (url) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const fetchLikeCount = async (accessToken, url, setLikeCount) => {
  const videoId = extractVideoId(url);
  if (!videoId) {
    console.error("유효하지 않은 유튜브 URL입니다.");
    return;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=statistics`,
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

export const fetchVideoDetails = async (accessToken, url, setVideoDetails) => {
  const videoId = extractVideoId(url);
  if (!videoId) {
    console.error("유효하지 않은 유튜브 URL입니다.");
    return;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,statistics`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      setVideoDetails(data.items[0]);
    } else {
      console.error("동영상 정보를 가져오는 데 실패했습니다.", data);
    }
  } catch (error) {
    console.error("비디오 정보 요청 실패:", error);
  }
};

// services/youtubeService.js

export const fetchSubtitles = async (accessToken, videoId) => {
  try {
    // 자막 목록 가져오기
    const captionsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/captions?videoId=${videoId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const captionsData = await captionsResponse.json();
    const captionId = captionsData.items[0]?.id;
    console.log(captionId);

    if (captionId) {
      // 자막 다운로드
      const subtitleResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${process.env.REACT_APP_YOUTUBE_API_KEY}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const subtitleData = await subtitleResponse.text();
      return subtitleData; // 자막 데이터를 반환
    } else {
      console.error("자막이 없습니다.");
      return null;
    }
  } catch (error) {
    console.error("자막 요청 실패:", error);
    return null;
  }
};

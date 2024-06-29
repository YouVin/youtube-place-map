import axios from "axios";

export async function fetchYouTubeCaptions(videoId) {
  // 비공식적으로 자막 URL을 얻기 위한 API 호출
  const captionsListUrl = `https://video.google.com/timedtext?type=list&v=${videoId}`;
  const captionsListResponse = await axios.get(captionsListUrl);

  // 자막 목록 XML에서 한글 자막을 선택
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(captionsListResponse.data, "text/xml");
  const tracks = xmlDoc.getElementsByTagName("track");

  let track = null;
  for (let i = 0; i < tracks.length; i++) {
    if (tracks[i].getAttribute("lang_code") === "ko") {
      track = tracks[i];
      break;
    }
  }

  if (!track) {
    throw new Error("Korean captions not found");
  }

  const langCode = track.getAttribute("lang_code");

  // 자막 파일 URL을 구성
  const captionsUrl = `https://video.google.com/timedtext?v=${videoId}&lang=${langCode}&fmt=srv3`;
  const captionsResponse = await axios.get(captionsUrl);

  return captionsResponse.data;
}

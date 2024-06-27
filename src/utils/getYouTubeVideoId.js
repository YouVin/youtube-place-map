export function getYouTubeVideoId(url) {
  const urlObj = new URL(url);
  return urlObj.searchParams.get("v");
}

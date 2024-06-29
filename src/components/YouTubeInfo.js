import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeVideoId } from "../utils/getYouTubeVideoId";
import { fetchYouTubeVideo } from "../api/fetchYouTubeVideo";

const YouTubeInfo = () => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);

  const {
    data: videoData,
    error: videoError,
    isLoading: videoLoading,
  } = useQuery({
    queryKey: ["youtubeVideo", videoId],
    queryFn: () => fetchYouTubeVideo(videoId),
    enabled: !!videoId,
  });

  const handleFetchVideoInfo = () => {
    const id = getYouTubeVideoId(url);
    if (id) {
      setVideoId(id);
    } else {
      alert("Invalid YouTube URL");
    }
  };

  const extractLocationFromDescription = (description) => {
    const locationMarker = "Location:";
    const placeMarker = "Place:";

    let location = "";
    const indexOfLocation = description.indexOf(locationMarker);
    if (indexOfLocation !== -1) {
      location = description
        .substring(indexOfLocation + locationMarker.length)
        .trim();
    } else {
      const indexOfPlace = description.indexOf(placeMarker);
      if (indexOfPlace !== -1) {
        location = description
          .substring(indexOfPlace + placeMarker.length)
          .trim();
      }
    }

    return location;
  };

  // videoData가 변화할 때마다 캡션 데이터를 콘솔에 출력
  React.useEffect(() => {
    if (videoData && videoData.captions) {
      console.log("Captions:", videoData.captions);
    }
  }, [videoData]);

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
      />
      <button onClick={handleFetchVideoInfo}>Fetch Video Info</button>

      {videoLoading && <p>Loading video info...</p>}
      {videoError && <p>Error: {videoError.message}</p>}
      {videoData && videoData.video && (
        <div>
          <h3>{videoData.video.snippet.title}</h3>
          <p>{videoData.video.snippet.description}</p>
          <p>
            <strong>Channel:</strong> {videoData.video.snippet.channelTitle}
          </p>
          <p>
            <strong>Published at:</strong>{" "}
            {new Date(videoData.video.snippet.publishedAt).toLocaleDateString()}
          </p>
          {videoData.video.snippet.description && (
            <p>
              <strong>Location:</strong>{" "}
              {extractLocationFromDescription(
                videoData.video.snippet.description
              )}
            </p>
          )}
          {videoData.video.snippet.tags && (
            <p>
              <strong>Tags:</strong> {videoData.video.snippet.tags.join(", ")}
            </p>
          )}
          <img
            src={videoData.video.snippet.thumbnails.medium.url}
            alt={videoData.video.snippet.title}
          />
        </div>
      )}
    </div>
  );
};

export default YouTubeInfo;

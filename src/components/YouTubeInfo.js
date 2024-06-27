// YouTubeInfo.js

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeVideoId } from "../utils/getYouTubeVideoId";
import { fetchYouTubeVideo } from "../api/fetchYouTubeVideo";

const YouTubeInfo = () => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);

  const { data, error, isLoading } = useQuery({
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
    // 예시: 설명에서 "Location:" 또는 "Place:"를 찾아서 그 뒤에 오는 텍스트를 위치 정보로 사용
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

  return (
    <div>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube URL"
      />
      <button onClick={handleFetchVideoInfo}>Fetch Video Info</button>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h3>{data.snippet.title}</h3>
          <p>{data.snippet.description}</p>
          <p>{data.snippet.location}</p>
          <p>{data.snippet.placeMarker}</p>
          <p>{data.snippet.placeholder}</p>
          <p>
            <strong>Channel:</strong> {data.snippet.channelTitle}
          </p>
          <p>
            <strong>Published at:</strong>{" "}
            {new Date(data.snippet.publishedAt).toLocaleDateString()}
          </p>
          {/* 위치 정보 표시 */}
          {data.snippet.description && (
            <p>
              <strong>Location:</strong>{" "}
              {extractLocationFromDescription(data.snippet.description)}
            </p>
          )}
          {data.snippet.tags && (
            <p>
              <strong>Tags:</strong> {data.snippet.tags.join(", ")}
            </p>
          )}
          <img
            src={data.snippet.thumbnails.medium.url}
            alt={data.snippet.title}
          />
        </div>
      )}
    </div>
  );
};

export default YouTubeInfo;

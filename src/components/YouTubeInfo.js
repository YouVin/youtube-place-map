// components/YouTubeInfo.js

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getYouTubeVideoId } from "../utils/getYouTubeVideoId";
import { fetchYouTubeVideo } from "../api/fetchYouTubeVideo";
import { Link } from "react-router-dom";

const YouTubeInfo = ({ user }) => {
  const [url, setUrl] = useState("");
  const [videoId, setVideoId] = useState(null);

  const {
    data: videoData,
    error: videoError,
    isLoading: videoLoading,
  } = useQuery({
    queryKey: ["youtubeVideo", videoId],
    queryFn: () => fetchYouTubeVideo(videoId, user.token),
    enabled: !!videoId && !!user,
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

  return (
    <div>
      {!user && <Link to="/login">Login with Google</Link>}
      {user && (
        <div>
          <h3>Welcome, {user.name}</h3>
          <img src={user.picture} alt={user.name} />
        </div>
      )}

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

// VideoPlayer.js

import React from "react";
import "../../css/record/recording.css";

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="video-container">
      <iframe
        title="YouTube Video"
        src={videoUrl}
        frameBorder="0"
        allowFullScreen
        className="video-frame"
      ></iframe>
    </div>
  );
};

export default VideoPlayer;

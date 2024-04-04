// WebcamCapture.js

import React, { useRef, useEffect } from "react";
import "../../css/record/recording.css";

const WebcamCapture = () => {
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  }, []);

  return (
    <div className="cam-container">
      <video id="webcam-video" autoPlay ref={videoRef}></video>
    </div>
  );
};

export default WebcamCapture;

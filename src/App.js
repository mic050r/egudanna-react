// App.js

import React, { useState, useEffect } from "react";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import WebcamCapture from "./components/WebcamCapture";
import CircleButton from "./components/CircleButton";

function App() {
  const [countdown, setCountdown] = useState(0);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (countdown === 0 && recording) {
      // 녹화 시작 로직
      console.log("Recording started");
    }
  }, [countdown, recording]);

  const handleButtonClick = () => {
    setCountdown(3); // 카운트다운 시작
    setRecording(true); // 녹화 시작 플래그 설정
  };

  return (
    <div className="app-container">
      <div className="video-container">
        <VideoPlayer videoUrl="//www.youtube.com/embed/4rqI5F5Gra8" />
      </div>
      <div className="cam-container">
        <WebcamCapture />
      </div>
      <CircleButton onClick={handleButtonClick} />
      {countdown > 0 && <div className="countdown">{countdown}</div>}
    </div>
  );
}

export default App;

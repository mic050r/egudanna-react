// App.js

import React, { useState } from "react";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import WebcamCapture from "./components/WebcamCapture";
import CircleButton from "./components/CircleButton";
import Timer from "./components/Timer";

function App() {
  const [recording, setRecording] = useState(false);

  const handleButtonClick = () => {
    setRecording(true); // 녹화 시작 플래그 설정
  };

  const handleTimerFinish = () => {
    // 녹화 시작 로직
    console.log("Recording started");
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
      {recording && <Timer initialTime={3} onFinish={handleTimerFinish} />}
    </div>
  );
}

export default App;

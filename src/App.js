// App.js

import React from "react";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import WebcamCapture from "./components/WebcamCapture";
import CircleButton from "./components/CircleButton";
import Timer from "./components/Timer";

function App() {
  return (
    <div className="app-container">
      <div className="video-container">
        <VideoPlayer videoUrl="//www.youtube.com/embed/4rqI5F5Gra8" />
      </div>
      <div className="cam-container">
        <WebcamCapture />
      </div>
      <CircleButton />
    </div>
  );
}

export default App;

import React, { useState } from "react";
import "./App.css";
import VideoPlayer from "./components/VideoPlayer";
import WebcamCapture from "./components/WebcamCapture";
import CircleButton from "./components/CircleButton";
import Timer from "./components/Timer";
import PublishForm from "./components/PublishForm"; // PublishForm 컴포넌트 import

function App() {
  const [recording, setRecording] = useState(false);
  const [showPublishForm, setShowPublishForm] = useState(false); // PublishForm 컴포넌트를 보일지 여부를 결정하는 상태

  const handleButtonClick = () => {
    setRecording(true); // 녹화 시작 플래그 설정
  };

  const handleTimerFinish = () => {
    setShowPublishForm(true); // PublishForm 컴포넌트를 보이도록 설정
  };

  const handlePublishCancel = () => {
    setShowPublishForm(false); // PublishForm 컴포넌트를 숨기도록 설정
  };

  const handlePublish = (data) => {
    // 공개 발행 처리 로직
    console.log("Publishing data:", data);
    setShowPublishForm(false); // PublishForm 컴포넌트를 숨기도록 설정
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
      {recording && <Timer initialTime={1} onFinish={handleTimerFinish} />}
      {showPublishForm && (
        <PublishForm onCancel={handlePublishCancel} onPublish={handlePublish} />
      )}
    </div>
  );
}

export default App;

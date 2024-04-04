// pages/record.js
import React, { useState } from "react";
import "../App.css";
import VideoPlayer from "../components/record/VideoPlayer";
import WebcamCapture from "../components/record/WebcamCapture";
import CircleButton from "../components/record/CircleButton";
import Timer from "../components/record/Timer";
import PublishForm from "../components/submit/PublishForm";

function RecordPage() {
  const [recording, setRecording] = useState(false);
  const [showPublishForm, setShowPublishForm] = useState(false);

  const handleButtonClick = () => {
    setRecording(true);
  };

  const handleTimerFinish = () => {
    setShowPublishForm(true);
  };

  const handlePublishCancel = () => {
    setShowPublishForm(false);
  };

  const handlePublish = (data) => {
    console.log("Publishing data:", data);
    setShowPublishForm(false);
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

export default RecordPage;

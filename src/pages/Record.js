import React, { useState, useRef } from "react";
import "../App.css";
import YouTube from "react-youtube";
import WebcamCapture from "../components/record/WebcamCapture";
import CircleButton from "../components/record/CircleButton";
import Timer from "../components/record/Timer";
import PublishForm from "../components/submit/PublishForm";

function RecordPage() {
  const [recording, setRecording] = useState(false);
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [player, setPlayer] = useState(null);
  const [audioStream, setAudioStream] = useState(null);

  const playerRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const mediaStreamRef = useRef(null);

  const handleButtonClick = () => {
    setRecording(true);
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.internalPlayer.playVideo();
      }
      startRecording();
    }, 3000);
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

  const onReady = (event) => {
    setPlayer(event.target);
    if (
      event.target.internalPlayer &&
      event.target.internalPlayer.getAudioTracks
    ) {
      const audioTrack = event.target.internalPlayer.getAudioTracks()[0];
      if (audioTrack) {
        const audioStream = new MediaStream();
        audioStream.addTrack(audioTrack);
        setAudioStream(audioStream);
      }
    }
  };

  const onEnd = () => {
    stopRecording();
  };

  const startRecording = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaStreamRef.current = mediaStream;

      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: "video/webm",
      });

      mediaRecorder.ondataavailable = handleDataAvailable;

      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.start();
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }
    }
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
      downloadVideo();
    }
  };

  const downloadVideo = () => {
    const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "recorded-video.webm";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <div className="video-container">
        <YouTube
          videoId="lkMMCQpUGjY"
          className="video-frame"
          containerClassName="video-container"
          opts={{
            width: "100%",
            height: "1000px",
            playerVars: {
              autoplay: 0,
              controls: 0,
              mute: 0,
            },
          }}
          onReady={onReady}
          onEnd={onEnd}
          ref={playerRef}
        />
      </div>

      <div className="cam-container">
        <WebcamCapture />
      </div>

      <CircleButton onClick={handleButtonClick} />

      {recording && <Timer initialTime={3} onFinish={handleTimerFinish} />}

      {showPublishForm && (
        <PublishForm onCancel={handlePublishCancel} onPublish={handlePublish} />
      )}
    </div>
  );
}

export default RecordPage;

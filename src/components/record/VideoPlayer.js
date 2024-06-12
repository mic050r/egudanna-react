import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import "../../css/record/video.css";
import CircleButton from "./CircleButton";
import Timer from "./Timer";
import Modal from "./Modal";
import PublishForm from "../submit/PublishForm"; // 발행 폼 컴포넌트 import

const VideoPlayer = () => {
  const location = useLocation();

  const { challenge_name, reference_video_filename, difficulty } =
    location.state || {
      challenge_name: "default challenge",
      reference_video_filename: "default_video",
      difficulty: 1,
    };

  const [videoUrl, setVideoUrl] = useState(
    `/videos/${reference_video_filename}.mp4`
  );
  useEffect(() => {
    console.log("Location state in /record component:", location.state);
  }, [location.state]);

  const [recordedVideoUrl, setRecordedVideoUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const webcamRef = useRef(null);
  const videoRef = useRef(null);
  const [recorder, setRecorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const startRecording = async () => {
    const webcamStream = webcamRef.current.stream;
    if (!webcamStream) {
      console.error("Webcam stream not initialized.");
      return;
    }

    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination();

    const videoElement = videoRef.current;
    const videoStream = videoElement.captureStream();
    const videoAudioTrack = videoStream.getAudioTracks()[0];

    const webcamAudioTrack = webcamStream.getAudioTracks()[0];
    webcamAudioTrack.enabled = false;

    const videoSource = audioContext.createMediaStreamSource(
      new MediaStream([videoAudioTrack])
    );
    videoSource.connect(destination);

    const combinedStream = new MediaStream([
      ...webcamStream.getVideoTracks(),
      ...destination.stream.getAudioTracks(),
    ]);

    const rtcRecorder = new RecordRTC(combinedStream, { type: "video" });
    rtcRecorder.startRecording();
    setRecorder(rtcRecorder);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        setRecordedVideoUrl(url);
        setShowModal(true);

        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "recorded_video.webm";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        setRecorder(null);
        setIsRecording(false);
      });
    }
  };

  const handleButtonClick = () => {
    setIsTimerActive(true);
  };

  const handleTimerFinish = () => {
    const videoElement = videoRef.current;
    videoElement.play();
    startRecording();
    setIsTimerActive(false);
  };

  const handleVideoEnded = () => {
    stopRecording();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handlePublish = (data) => {
    console.log("Published data:", data);
    setShowModal(false);
  };

  useEffect(() => {
    if (showModal) {
      const videoElement = document.querySelector(".modal video");
      if (videoElement) {
        videoElement.play();
      }
    }
  }, [showModal]);

  return (
    <div className="app-container">
      <div className="video-container">
        <video
          id="mp4-video"
          controls
          ref={videoRef}
          className="video-frame"
          onEnded={handleVideoEnded}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="cam-container">
        <Webcam
          id="webcam-video"
          audio={true}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="webcam-frame"
        />
      </div>
      <CircleButton onClick={handleButtonClick} />
      {isTimerActive && <Timer initialTime={3} onFinish={handleTimerFinish} />}

      <Modal show={showModal} onClose={handleCloseModal}>
        <video controls className="result-video-frame">
          <source src={recordedVideoUrl} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <PublishForm
          onCancel={handleCloseModal}
          onPublish={handlePublish}
          challenge_name={challenge_name}
          difficulty={difficulty}
        />
      </Modal>
    </div>
  );
};

export default VideoPlayer;

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";
import "../../css/record/video.css";

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState("/videos/example.mp4");
  const webcamRef = useRef(null);
  const videoRef = useRef(null);
  const [recorder, setRecorder] = useState(null);

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

    const rtcRecorder = RecordRTC(combinedStream, { type: "video" });
    rtcRecorder.startRecording();
    setRecorder(rtcRecorder);
  };

  const stopRecording = async () => {
    if (recorder) {
      recorder.stopRecording(() => {
        const blob = recorder.getBlob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);

        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "recorded_video.webm";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        setRecorder(null);
      });
    }
  };

  const handleVideoPlay = () => {
    startRecording();
  };

  const handleVideoEnded = () => {
    stopRecording();
  };

  return (
    <div className="app-container">
      <div className="video-container">
        <video
          id="mp4-video"
          controls
          onPlay={handleVideoPlay}
          onEnded={handleVideoEnded}
          ref={videoRef}
          className="video-frame"
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
          className="video-frame"
        />
      </div>
    </div>
  );
};

export default VideoPlayer;

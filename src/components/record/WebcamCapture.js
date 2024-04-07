// WebcamCapture.js
import React, { useRef, useEffect, useState } from "react";
import "../../css/record/recording.css";

const WebcamCapture = ({ onRecordingFinish }) => {
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  useEffect(() => {
    if (!videoRef.current) return;

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true }) // 오디오 포함하여 녹화
      .then((stream) => {
        videoRef.current.srcObject = stream;
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };
      })
      .catch((error) => {
        console.error("Error accessing webcam:", error);
      });
  }, []);

  const startRecording = () => {
    if (mediaRecorderRef.current && !recording) {
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      onRecordingFinish(recordedChunks); // 녹화가 완료되면 콜백 호출
    }
  };

  return (
    <div className="cam-container">
      <video id="webcam-video" autoPlay ref={videoRef}></video>
    </div>
  );
};
export default WebcamCapture;

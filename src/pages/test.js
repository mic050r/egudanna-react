import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import RecordRTC from "recordrtc";

const RecordWebcamWithAudio = () => {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const startRecording = async () => {
    if (!webcamRef.current) return;

    const webcamStream = webcamRef.current.video.srcObject;
    const audioStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    const mediaRecorder = new RecordRTC.MediaStreamRecorder(
      [webcamStream, audioStream],
      {
        type: "video",
      }
    );
    mediaRecorder.start(); // 변경된 부분

    setRecording(true);
    setMediaRecorder(mediaRecorder);
    setAudioStream(audioStream);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stopRecording(() => {
        const blob = mediaRecorder.getBlob();
        setRecordedBlob(blob);
        setRecording(false);
        // Stop webcam and audio stream tracks
        webcamRef.current.video.srcObject
          .getTracks()
          .forEach((track) => track.stop());
        audioStream.getTracks().forEach((track) => track.stop());
      });
    }
  };

  const playRecording = () => {
    if (recordedBlob) {
      const url = URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "recorded_video.webm";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a); // Remove <a> element after download
    }
  };

  return (
    <div>
      <Webcam audio={false} ref={webcamRef} mirrored={true} />
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      <button onClick={playRecording} disabled={!recordedBlob}>
        Save Recording
      </button>
    </div>
  );
};

export default RecordWebcamWithAudio;

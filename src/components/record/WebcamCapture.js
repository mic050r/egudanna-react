import React, { useRef, useEffect, useState } from "react";
import "../../css/record/recording.css";

// WebcamCapture : 웹캠에서 비디오와 오디오를 캡처하여 녹화
// onRecordingFinish : 녹화가 끝난 후 호출되는 콜백 함수
const WebcamCapture = ({ onRecordingFinish }) => {
  // userRef 훅을 사용하여 비디오 요소와 MediaRecorder 인스턴스를 참조
  const videoRef = useRef();
  const mediaRecorderRef = useRef(null);

  // 녹화 상태와 녹화된 데이터를 관리하기 위해 useState 훅을 사용
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  // userEffect 훅을 사용하여 컴포넌트가 마운트될때 웹캠 스트림을 설정
  useEffect(() => {
    let stream = null;

    // 웹캠 스트림을 설정하는 비동기 함수
    const setupStream = async () => {
      try {
        // getUserMedia API를 사용하여 비디오와 오디오 스트림을 요 ㅓㅇ
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
          sampleRate: 44100,
        });

        // 비디오 요소에 스트림을 설정
        videoRef.current.srcObject = stream;

        // MediaRecorder 인스턴스를 생성하여 스트림을 녹화할 수 있게
        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;

        // 데이터가 사용할 수 있을 때마다 발생하는 이벤트 핸들러를 설정
        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            // 녹화된 데이터를 state에 저장
            setRecordedChunks((prevChunks) => [...prevChunks, event.data]);
          }
        };
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    };

    setupStream();

    // 컴포넌트가 언마운트될 때 스트림을 정리
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 녹화를 시작하는 함수
  const startRecording = () => {
    if (mediaRecorderRef.current && !recording) {
      mediaRecorderRef.current.start();
      setRecording(true);
    }
  };

  // 녹화를 중지하는 함순
  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  // 녹화 상태와 녹화된 데이터가 변결될 때마다 실행
  // 녹화가 끝났을 때 onRecordingFinish 콜백을 호출
  useEffect(() => {
    if (!recording && recordedChunks.length > 0) {
      onRecordingFinish(recordedChunks);
    }
  }, [recording, recordedChunks, onRecordingFinish]);

  return (
    <div className="cam-container">
      <video id="webcam-video" autoPlay ref={videoRef}></video>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
    </div>
  );
};

export default WebcamCapture;

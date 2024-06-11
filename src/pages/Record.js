import React, { useState, useRef } from "react";
import "../App.css";
import YouTube from "react-youtube";
import WebcamCapture from "../components/record/WebcamCapture";
import CircleButton from "../components/record/CircleButton";
import Timer from "../components/record/Timer";
import PublishForm from "../components/submit/PublishForm";

// RecordPage : YouTube 동영상과 웹캠 녹화를 관리하며, 녹화
function RecordPage() {
  // 상태 변수 및 참조 변수를 선언
  const [recording, setRecording] = useState(false); // 녹화 상태를 관리
  const [showPublishForm, setShowPublishForm] = useState(false); // 제출 양식 표시 여부 관리
  const playerRef = useRef(null); // YouTube 플레이어의 참조를 저장
  const mediaRecorderRef = useRef(null); // MediaRecorder 인스턴스의 참조 저장
  const recordedChunksRef = useRef([]); // 녹화된 데이터를 저장할 때 배열의 참조를 저장

  // 버튼 클릭시 실행되는 함수 -> 녹화시작
  const handleButtonClick = () => {
    setRecording(true); // 녹화 상태를 true로 설정
    setTimeout(() => {
      if (playerRef.current) {
        playerRef.current.playVideo(); // YouTube 동영상을 재생
      }
      startRecording(); // 녹화 시작
    }, 3000); // 3초 후에 녹화시작
  };

  // 타이머가 끝났을 때 호출되는 함수 -> 제출 양식 표시
  const handleTimerFinish = () => {
    setShowPublishForm(true); // 제출 양식 표시
  };

  // 제출 양식 취소 시 호출되는 함수 -> 제출양식을 숨김
  const handlePublishCancel = () => {
    setShowPublishForm(false); // 제출 폼 숨김
  };

  // 제출 양식 제출 시 호출되는 함수 -> 데이터를 로그에 출력
  const handlePublish = (data) => {
    console.log("Publishing data:", data); // 제출된 데이터를 로그에 출력
    setShowPublishForm(false); // 제출 양식 숨김
  };

  // YouTube 플레이어가 준비되었을 때 호출되는 함수로, 플레이어의 참조를 저장
  const onReady = (event) => {
    playerRef.current = event.target; // 플레이어의 참조를 저장
  };

  // YouTube 동영상이 끝났을 때 호출되는 함수로 -> 녹화 중지
  const onEnd = () => {
    stopRecording();
  };

  // 녹화를 시작하는 함수
  const startRecording = async () => {
    try {
      // 웹캠과 마이크 스트림을 요청
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
        sampleRate: 44100, // CD 품질
      });

      // MediaRecorder 인스턴스를 생성
      const mediaRecorder = new MediaRecorder(mediaStream, {
        mimeType: "video/webm;codecs=vp9,opus", // 다른 코덱 사용
      });

      // 데이터가 준비되었을 때 호출되는 이벤트 핸들러를 설정
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorderRef.current = mediaRecorder; // MediaRecorder 인스턴스를 참조에 저장
      mediaRecorder.start(); // 녹화 시작
    } catch (error) {
      console.error("Error accessing webcam:", error); // 오류를 콘솔에 출력
    }
  };

  // 녹화를 중지하는 함수
  const stopRecording = () => {
    setRecording(false); // 녹화 상태를 false로 설정
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder) {
      mediaRecorder.stop(); // MediaRecorder 인스턴스를 중지
    }
  };

  // 데이터가 준비되었을 때 호출되는 함수
  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data); // 녹화된 데이터를 배열에 추가
      downloadVideo(); // 녹화된 비디오를 다운로드
    }
  };

  // 녹화된 비디오를 다운로드 하는 함수
  const downloadVideo = () => {
    const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    a.href = url;
    a.download = "recorded-video.webm";
    a.click();
    window.URL.revokeObjectURL(url); // URL 객체를 해제
  };

  return (
    <div className="app-container">
      <div className="video-container">
        <YouTube
          videoId="lkMMCQpUGjY" // 재생할 유튜브 동영상 ID
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
          onReady={onReady} // 플레이어 준비 시 호출되는 함수
          onEnd={onEnd} // 동영상 종료시 호출되는 함수
        />
      </div>
      <div className="cam-container">
        <WebcamCapture
          onRecordingFinish={(chunks) => {
            const blob = new Blob(chunks, { type: "video/webm" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "recorded-video.webm";
            a.click();
            window.URL.revokeObjectURL(url);
          }}
        />
      </div>
      <CircleButton onClick={handleButtonClick} /> {/* 녹화 시작 버튼. */}
      {recording && <Timer initialTime={3} onFinish={handleTimerFinish} />}{" "}
      {/* 타이머 컴포넌트 */}
      {/* {showPublishForm && (
        <PublishForm onCancel={handlePublishCancel} onPublish={handlePublish} />
      )} */}
      {/* 제출 양식*/}
    </div>
  );
}

export default RecordPage;

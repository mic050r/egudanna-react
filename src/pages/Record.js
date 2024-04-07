import React, { useState, useRef } from "react";
import "../App.css";
import YouTube from "react-youtube"; // YouTube API를 사용하기 위한 import
import WebcamCapture from "../components/record/WebcamCapture";
import CircleButton from "../components/record/CircleButton";
import Timer from "../components/record/Timer";
import PublishForm from "../components/submit/PublishForm";

function RecordPage() {
  const [recording, setRecording] = useState(false);
  const [showPublishForm, setShowPublishForm] = useState(false);
  const [player, setPlayer] = useState(null); // YouTube 플레이어의 참조를 저장하기 위한 상태

  const playerRef = useRef(null); // YouTube 플레이어의 참조를 관리하기 위한 useRef

  const handleButtonClick = () => {
    setRecording(true);
    // CircleButton 클릭 후 3초 뒤에 유튜브 비디오 재생
    setTimeout(() => {
      setRecording(false);
      if (playerRef.current) {
        playerRef.current.internalPlayer.playVideo(); // YouTube 플레이어 재생
      }
    }, 3000); // 3초를 밀리초 단위로 나타냄
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
    setPlayer(event.target); // YouTube 플레이어의 참조 설정
  };

  return (
    <div className="app-container">
      {/* 동영상 컨테이너 */}
      <div className="video-container">
        {/* YouTube 동영상을 불러오기 위한 YouTube 컴포넌트 */}
        <YouTube
          videoId="4rqI5F5Gra8"
          className="video-frame"
          containerClassName="video-container"
          opts={{
            width: "100%",
            height: "1000px",
            playerVars: {
              autoplay: 0,
              controls: 0,
            },
          }}
          onReady={onReady}
          ref={playerRef} // YouTube 플레이어 참조 설정
        />
      </div>

      {/* 웹캠 캡쳐 컴포넌트 */}
      <div className="cam-container">
        <WebcamCapture />
      </div>

      {/* CircleButton 컴포넌트 */}
      <CircleButton onClick={handleButtonClick} />

      {/* 녹화 중일 때 타이머 컴포넌트 */}
      {recording && <Timer initialTime={3} onFinish={handleTimerFinish} />}

      {/* 게시 폼 컴포넌트 */}
      {showPublishForm && (
        <PublishForm onCancel={handlePublishCancel} onPublish={handlePublish} />
      )}
    </div>
  );
}

export default RecordPage;

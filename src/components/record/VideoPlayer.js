import React, { useRef, useState } from "react"; // React와 필요한 hooks(useRef, useState)를 import 함
import Webcam from "react-webcam"; // react-webcam 컴포넌트를 import 함
import RecordRTC from "recordrtc"; // RecordRTC 라이브러리를 import 함

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState("/videos/example.mp4"); // MP4 비디오의 URL을 상태로 관리함
  const webcamRef = useRef(null); // 웹캠 참조를 위한 ref 생성
  const videoRef = useRef(null); // 비디오 참조를 위한 ref 생성
  const [recorder, setRecorder] = useState(null); // RecordRTC 인스턴스를 상태로 관리함
  const [isRecording, setIsRecording] = useState(false); // 녹화 상태를 관리함

  const startRecording = async () => {
    const webcamStream = webcamRef.current.stream; // 웹캠 스트림 가져옴
    if (!webcamStream) {
      // 웹캠 스트림이 없으면 에러 출력하고 종료함
      console.error("Webcam stream not initialized.");
      return;
    }

    // 오디오 컨텍스트 생성
    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination(); // 오디오 출력용 MediaStreamDestination 생성

    // 비디오 요소에서 오디오 트랙을 가져옴
    const videoElement = videoRef.current;
    const videoStream = videoElement.captureStream(); // 비디오 요소로부터 스트림을 캡처함
    const videoAudioTrack = videoStream.getAudioTracks()[0]; // 비디오 스트림의 오디오 트랙을 가져옴

    // 웹캠 오디오 트랙을 가져옴
    const webcamAudioTrack = webcamStream.getAudioTracks()[0];
    webcamAudioTrack.enabled = false; // 외부 마이크 오디오 비활성화

    // 비디오 오디오 트랙을 오디오 컨텍스트에 연결
    const videoSource = audioContext.createMediaStreamSource(
      new MediaStream([videoAudioTrack])
    );
    videoSource.connect(destination); // 오디오 트랙을 MediaStreamDestination에 연결

    // 웹캠 비디오 트랙과 오디오 트랙을 결합하여 새로운 스트림 생성
    const combinedStream = new MediaStream([
      ...webcamStream.getVideoTracks(),
      ...destination.stream.getAudioTracks(),
    ]);

    const rtcRecorder = RecordRTC(combinedStream, { type: "video" }); // RecordRTC 인스턴스를 생성하고 비디오 타입으로 설정함
    rtcRecorder.startRecording(); // 녹화 시작
    setRecorder(rtcRecorder); // RecordRTC 인스턴스를 상태로 설정함
  };

  const stopRecording = async () => {
    if (recorder) {
      // 녹화 중인 RecordRTC 인스턴스가 있으면
      recorder.stopRecording(() => {
        // 녹화를 중지하고 콜백 함수 실행
        const blob = recorder.getBlob(); // 녹화된 데이터 Blob을 가져옴
        const url = URL.createObjectURL(blob); // Blob을 URL로 변환함
        setVideoUrl(url); // 비디오 URL 상태를 업데이트함

        // 다운로드 링크 생성
        const downloadLink = document.createElement("a");
        downloadLink.href = url;
        downloadLink.download = "recorded_video.webm"; // 파일 이름 설정
        document.body.appendChild(downloadLink);
        downloadLink.click(); // 다운로드 링크 클릭하여 파일 다운로드
        document.body.removeChild(downloadLink);

        // recorder 상태 초기화
        setRecorder(null);
      });
    }
  };

  const handleVideoEnded = () => {
    if (isRecording) {
      // 녹화 중이라면
      stopRecording(); // 녹화를 중지함
      setIsRecording(false); // 녹화 상태를 업데이트함
    }
  };

  const handleButtonClick = () => {
    if (isRecording) {
      // 현재 녹화 중이면
      stopRecording(); // 녹화를 중지함
    } else {
      startRecording(); // 녹화를 시작함
    }
    setIsRecording(!isRecording); // 녹화 상태를 토글함
  };

  return (
    <div className="video-player-container">
      <div className="video-container">
        <video
          id="mp4-video"
          controls
          onEnded={handleVideoEnded} // 비디오가 끝났을 때 handleVideoEnded 함수 실행
          onCanPlay={() => {
            // 비디오가 재생 가능할 때
            if (isRecording) {
              // 녹화 중이면
              startRecording(); // 녹화를 다시 시작함
            }
          }}
          ref={videoRef} // 비디오 참조 설정
        >
          <source src={videoUrl} type="video/mp4" /> {/* 비디오 소스 설정 */}
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="webcam-container">
        <Webcam
          audio={true} // 영상 소리 녹음 활성화
          ref={webcamRef} // 웹캠 참조 설정
          screenshotFormat="image/jpeg" // 스크린샷 포맷 설정
          width={320}
          height={240}
        />
      </div>
      <button onClick={handleButtonClick}>
        {" "}
        {/* 버튼 클릭 시 handleButtonClick 함수 실행 */}
        {isRecording ? "Stop Recording" : "Start Recording"}{" "}
        {/* 버튼 텍스트 변경 */}
      </button>
    </div>
  );
};

export default VideoPlayer;

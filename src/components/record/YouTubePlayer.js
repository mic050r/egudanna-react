// YouTubePlayer.js
import React, { useRef, useState } from "react";
import YouTube from "react-youtube";

function YouTubePlayer() {
  const playerRef = useRef(null);
  const [player, setPlayer] = useState(null);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  return (
    <div className="video-container">
      <YouTube
        videoId="4rqI5F5Gra8"
        className="video-frame"
        containerClassName="video-container"
        opts={{
          width: "640", // 비디오의 너비 설정
          height: "390", // 비디오의 높이 설정
          playerVars: {
            autoplay: 0,
            controls: 0,
          },
        }}
        onReady={onReady}
        ref={playerRef}
      />
      {/* playerRef를 반환하여 RecordPage에서 사용할 수 있도록 함 */}
      {playerRef.current && (
        <input type="hidden" id="playerRef" value={playerRef.current} />
      )}
    </div>
  );
}

export default YouTubePlayer;

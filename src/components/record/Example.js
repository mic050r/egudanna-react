import React, { useState } from "react";
import YouTube from "react-youtube";

function Example() {
  const [player, setPlayer] = useState(null);

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const handlePause = () => {
    if (player) {
      player.pauseVideo();
    }
  };

  const handlePlay = () => {
    if (player) {
      player.playVideo();
    }
  };

  return (
    <div>
      <YouTube
        videoId="2g811Eo7K8U"
        opts={{ width: "640", height: "390" }}
        onReady={onReady}
      />
      {/* 동영상 재생 버튼 */}
      <button onClick={handlePlay}>재생</button>
      {/* 동영상 일시 중지 버튼 */}
      <button onClick={handlePause}>일시 중지</button>
    </div>
  );
}

export default Example;

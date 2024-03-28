// Timer.js

import React, { useState, useEffect } from "react";
import "../css/style.css";

function Timer({ initialTime, onFinish }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (time === 0) {
      onFinish(); // 카운트다운이 끝났을 때 콜백 함수 호출
    }
  }, [time, onFinish]);

  return time > 0 ? <div className="timer">{time}</div> : null;
}

export default Timer;

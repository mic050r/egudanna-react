import React, { useState, useEffect } from "react";
import "../../css/record/recording.css";

function Timer({ initialTime, onFinish }) {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time > 0) {
      const timer = setTimeout(() => {
        setTime(time - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (time === 0) {
      if (onFinish) onFinish();
    }
  }, [time, onFinish]);

  return time > 0 ? <div className="timer">{time}</div> : null;
}

export default Timer;

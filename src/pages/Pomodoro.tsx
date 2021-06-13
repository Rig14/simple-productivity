/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Pomodoro = (): JSX.Element => {
  const [time, setTime] = useState(50);
  const [formatedTime, setFormatedTime] = useState({minutes: "", seconds: ""})
  const [timerHasStarted, setTimerHasStarted] = useState(false)

  const formatTime = () => {
    setTime(time-1);

    const seconds = time % 60;
    const minutes = (time - seconds) / 60;

    let minuteStr = minutes.toString();
    let secondStr = seconds.toString();
    
    if (minutes < 10) {
      minuteStr = `0${minuteStr}`;
    }
    if (seconds < 10) {
      secondStr = `0${secondStr}`;
    }

    setFormatedTime({minutes: minuteStr, seconds: secondStr})
  }

  useEffect(() => {
    // on mount will format the time
    formatTime();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (timerHasStarted) {
      const interval = setInterval(() => {
        formatTime()
      }, 1000);
      return () => clearInterval(interval);
    }
    return () => undefined
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, timerHasStarted]);
  
  return (
    <>
      <Navbar />
      <div className="page-content">
        <div className="page-content-wrapper">
          <div className="timer-box">
            <div className="timer">
              {formatedTime.minutes}:{formatedTime.seconds}
            </div>
            <button onClick={() => setTimerHasStarted(!timerHasStarted)} type="button">start or stop timer</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pomodoro;

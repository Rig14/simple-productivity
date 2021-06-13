import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import db, { auth } from '../firebase';

interface FormatedTime {
  minutes: string;
  seconds: string;
}

const LOCAL_STORAGE_KEY = 'simple-productivity-pomodoro';

const Pomodoro = (): JSX.Element => {
  // pomodoro timers time in seconds
  const [time, setTime] = useState(1500);
  // the formated strings that will be displayed
  const [formatedTime, setFormatedTime] = useState<FormatedTime>({
    minutes: '',
    seconds: '',
  });
  const [timerHasStarted, setTimerHasStarted] = useState(false);
  // timer counter:
  // after every pomodoro take a small break
  // after 4 pomodoros take a big break and restart the loop
  const [pomodoroCounter, setPomodoroCounter] = useState(0);
  const userLeftPageRef = useRef(false);

  const getFormatedTime = (): FormatedTime => {
    // returns back formated time
    const seconds = time % 60;
    const minutes = (time - seconds) / 60;

    let minuteStr = minutes.toString();
    let secondStr = seconds.toString();

    // to put the zero in front of the string
    // otherwize time will be 2:8 not 02:08
    if (minutes < 10) {
      minuteStr = `0${minuteStr}`;
    }
    if (seconds < 10) {
      secondStr = `0${secondStr}`;
    }
    return { minutes: minuteStr, seconds: secondStr };
  };

  const writeStorage = () => {
    if (auth.currentUser !== null) {
      // writes into database
      db.collection('users')
        .doc(auth.currentUser.uid)
        .update({ timer: { time, counter: pomodoroCounter } });
    } else {
      // writes into local
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({ time, counter: pomodoroCounter })
      );
    }
  };

  useEffect(() => {
    // getting data from database if user is logged in
    if (auth.currentUser !== null) {
      const docRef = db.collection('users').doc(auth.currentUser.uid);
      docRef.get().then((doc) => {
        const userData = doc.data()?.timer;

        setTime(userData.time);
        setPomodoroCounter(userData.counter);
      });
    } else {
      // getting data from local
      const userLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (userLocalStorage !== null) {
        const data = JSON.parse(userLocalStorage);
        setTime(data.time);
        setPomodoroCounter(data.counter);
      }
    }

    setFormatedTime(getFormatedTime());
    return () => {
      // pre unmount
      userLeftPageRef.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // formating the time
    // has to be up here to avoid issues with delay
    setFormatedTime(getFormatedTime());
    // the timer update loop
    if (timerHasStarted) {
      const interval = setInterval(() => {
        setTime(time - 1);
        // testing if the timer has ran out
        if (time === 0) {
          // increasing the pomodoro counter
          setPomodoroCounter(pomodoroCounter + 1);
          const counter = pomodoroCounter + 1;

          if ([1, 3, 5].includes(counter)) {
            // short break
            setTime(300);
          } else if ([0, 2, 4, 6].includes(counter)) {
            // task
            setTime(1500);
          } else {
            // big break
            setTime(900);
            // after a big break the loop starts over
            setPomodoroCounter(-1);
          }
          // also turns the timer off for user to start next task/break
          setTimerHasStarted(false);
        }
        // the interval in ms
      }, 1);
      return () => {
        clearInterval(interval);
        writeStorage();
      };
    }
    return () => undefined;
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
            <button
              onClick={() => setTimerHasStarted(!timerHasStarted)}
              type="button"
            >
              {timerHasStarted ? 'stop timer' : 'start timer'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pomodoro;

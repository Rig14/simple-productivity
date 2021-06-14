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
  const userLeftPageRef = useRef<boolean>(false);

  const [message, setMessage] = useState('');

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

  const getMessage = (counter: number) => {
    // setting the message for user
    switch (counter) {
      case 0:
      case 2:
      case 4:
      case 6:
        setMessage('Task');
        break;
      case 1:
      case 3:
      case 5:
        setMessage('Take a short break');
        break;
      case -1:
        setMessage('Take a big break');
        break;
      default:
    }
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
        const { counter } = userData;
        getMessage(counter);
      });
    } else {
      // getting data from local
      const userLocalStorage = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (userLocalStorage !== null) {
        const data = JSON.parse(userLocalStorage);
        setTime(data.time);
        setPomodoroCounter(data.counter);
        const { counter } = data;
        getMessage(counter);
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
          let counter = pomodoroCounter + 1;

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
            counter = -1;
          }
          // also turns the timer off for user to start next task/break
          setTimerHasStarted(false);
          getMessage(counter);
        }
        // the interval in ms
      }, 0.01);
      return () => {
        clearInterval(interval);
      };
    }
    return () => {
      if (userLeftPageRef.current) {
        writeStorage();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, timerHasStarted, pomodoroCounter]);

  return (
    <>
      <Navbar />
      <div className="page-content">
        <div className="page-content-wrapper">
          <div className="timer-box">
            <div className="timer">
              <p>
                {formatedTime.minutes}:{formatedTime.seconds}
              </p>
            </div>
            <button
              onClick={() => setTimerHasStarted(!timerHasStarted)}
              type="button"
              className="timer-button"
            >
              {timerHasStarted ? 'STOP' : 'START'}
            </button>
            <div className="message">
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pomodoro;

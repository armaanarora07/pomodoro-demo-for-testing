import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State variables for the timer logic
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isSession, setIsSession] = useState(true); // true for Session, false for Break

  // State variables for the settings
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  // This effect runs the timer every second when `isActive` is true
  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer finished, switch between session and break
            const newIsSession = !isSession;
            setIsSession(newIsSession);
            setMinutes(newIsSession ? sessionLength : breakLength);
            setSeconds(0);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval); // Cleanup on unmount or when effect re-runs
  }, [isActive, seconds, minutes, isSession, sessionLength, breakLength]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsSession(true);
    setSessionLength(25);
    setBreakLength(5);
    setMinutes(25);
    setSeconds(0);
  };

  const changeLength = (type, delta) => {
    if (isActive) return; // Don't change lengths while timer is running

    if (type === 'session') {
      const newLength = sessionLength + delta;
      if (newLength > 0 && newLength <= 60) {
        setSessionLength(newLength);
        if (isSession) {
          setMinutes(newLength);
          setSeconds(0);
        }
      }
    } else { // type === 'break'
      const newLength = breakLength + delta;
      if (newLength > 0 && newLength <= 60) {
        setBreakLength(newLength);
        if (!isSession) {
          setMinutes(newLength);
          setSeconds(0);
        }
      }
    }
  };

  const formatTime = (time) => (time < 10 ? `0${time}` : time);

  return (
    <div className="app-container">
      <h1>Pomodoro Clock</h1>
      <div className="timer-display">
        <h2>{isSession ? 'Session' : 'Break'}</h2>
        <span>{formatTime(minutes)}:{formatTime(seconds)}</span>
      </div>
      <div className="controls">
        <button onClick={toggleTimer}>{isActive ? 'Pause' : 'Start'}</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="settings">
        <div className="setting">
          <h3>Session Length</h3>
          <button onClick={() => changeLength('session', -1)}>-</button>
          <span>{sessionLength}</span>
          <button onClick={() => changeLength('session', 1)}>+</button>
        </div>
        <div className="setting">
          <h3>Break Length</h3>
          <button onClick={() => changeLength('break', -1)}>-</button>
          <span>{breakLength}</span>
          <button onClick={() => changeLength('break', 1)}>+</button>
        </div>
      </div>
    </div>
  );
}

export default App;
import React, { useState, useEffect, useCallback } from 'react';

const Pomodoro = () => {
  const [timeLeft, setTimeLeft] = useState(1 * 60); // Initial time: 1 minute (for testing)
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('Work'); // Modes: 'Work' or 'Break'

  const workDuration = 1 * 60; // 1 minute in seconds (for testing)
  const breakDuration = 2 * 60; // 2 minutes in seconds (for testing)

  const switchMode = useCallback(() => {
    const newMode = mode === 'Work' ? 'Break' : 'Work';
    setMode(newMode);
    setTimeLeft(newMode === 'Work' ? workDuration : breakDuration);
  }, [mode, workDuration, breakDuration]);

  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 0) {
          switchMode(); // Switch mode when the timer reaches zero
          return prevTimeLeft; // Keep this to prevent resetting in the same tick
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, switchMode]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'Work' ? workDuration : breakDuration);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pomodoro Timer</h1>
      <h2 style={styles.mode}>{mode} Time</h2>
      <div style={styles.timer}>{formatTime(timeLeft)}</div>
      <div style={styles.controls}>
        <button onClick={handleStartPause} style={styles.button}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button onClick={handleReset} style={styles.button}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    color: '#2c3e50',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '20px',
  },
  mode: {
    fontSize: '1.5rem',
    color: '#1abc9c',
    marginBottom: '10px',
  },
  timer: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#ecf0f1',
    backgroundColor: '#3498db',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonHover: {
    backgroundColor: '#2980b9',
  },
};

export default Pomodoro;

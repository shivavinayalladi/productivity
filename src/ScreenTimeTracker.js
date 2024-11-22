import React, { useState, useEffect } from 'react';

const ScreenTimeTracker = () => {
  const [screenTime, setScreenTime] = useState(() => {
    const savedTime = localStorage.getItem('screenTime');
    return savedTime ? parseInt(savedTime, 10) : 0;
  });
  const [isTracking, setIsTracking] = useState(() => {
    const savedTracking = localStorage.getItem('isTracking');
    return savedTracking ? JSON.parse(savedTracking) : true;
  });

  useEffect(() => {
    const handleFocus = () => {
      if (isTracking) {
        const lastTime = localStorage.getItem('lastActiveTime');
        if (lastTime) {
          const elapsed = Math.floor((Date.now() - parseInt(lastTime, 10)) / 1000);
          setScreenTime((prevTime) => {
            const updatedTime = prevTime + elapsed;
            localStorage.setItem('screenTime', updatedTime);
            return updatedTime;
          });
        }
      }
      localStorage.setItem('lastActiveTime', Date.now());
    };

    if (isTracking) {
      handleFocus(); // Update the time when the component mounts
    }

    window.addEventListener('focus', handleFocus); // Update when the user focuses on the tab

    return () => {
      window.removeEventListener('focus', handleFocus);
      if (isTracking) {
        localStorage.setItem('lastActiveTime', Date.now());
      }
    };
  }, [isTracking]);

  useEffect(() => {
    let timer;

    if (isTracking) {
      timer = setInterval(() => {
        setScreenTime((prevTime) => {
          const updatedTime = prevTime + 1;
          localStorage.setItem('screenTime', updatedTime);
          return updatedTime;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isTracking]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStartStop = () => {
    const newTrackingState = !isTracking;
    setIsTracking(newTrackingState);
    localStorage.setItem('isTracking', newTrackingState);

    if (newTrackingState) {
      localStorage.setItem('lastActiveTime', Date.now());
    }
  };

  const handleReset = () => {
    setIsTracking(false);
    setScreenTime(0);
    localStorage.removeItem('screenTime');
    localStorage.removeItem('lastActiveTime');
    localStorage.setItem('isTracking', false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Screen Time Tracker</h1>
      <div style={styles.timer}>{formatTime(screenTime)}</div>
      <div style={styles.controls}>
        <button onClick={handleStartStop} style={styles.button}>
          {isTracking ? 'Pause' : 'Start'}
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
};

export default ScreenTimeTracker;

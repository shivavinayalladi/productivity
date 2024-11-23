import React, { useState, useEffect, useCallback } from "react";

const Pomodoro = () => {
  const workDuration = 1 * 60; // 1 minute (for testing)
  const breakDuration = 2 * 60; // 2 minutes (for testing)

  const [timeLeft, setTimeLeft] = useState(workDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("Work"); // Modes: 'Work' or 'Break'

  const switchMode = useCallback(
    (newMode) => {
      setMode(newMode);
      setTimeLeft(newMode === "Work" ? workDuration : breakDuration);
    },
    [workDuration, breakDuration]
  );

  // Save the current state and timestamp when the tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        localStorage.setItem(
          "pomodoroData",
          JSON.stringify({
            timeLeft,
            mode,
            isRunning,
            lastUpdate: Date.now(),
          })
        );
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [timeLeft, mode, isRunning]);

  // Load the state and calculate elapsed time when the tab becomes visible
  useEffect(() => {
    if (document.visibilityState === "visible") {
      const storedData = localStorage.getItem("pomodoroData");
      if (storedData) {
        const { timeLeft, mode, isRunning, lastUpdate } = JSON.parse(storedData);

        const elapsedTime = Math.floor((Date.now() - lastUpdate) / 1000);
        let adjustedTimeLeft = timeLeft - elapsedTime;

        // If the elapsed time exceeds the remaining time, switch modes
        while (adjustedTimeLeft <= 0) {
          const nextMode = mode === "Work" ? "Break" : "Work";
          adjustedTimeLeft += nextMode === "Work" ? workDuration : breakDuration;
          setMode(nextMode);
        }

        setTimeLeft(adjustedTimeLeft);

        // Ensure the timer continues running if it was running before
        if (!isRunning) {
          setIsRunning(true);
        }
      }
    }
  }, [workDuration, breakDuration]);

  // Timer logic
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          switchMode(mode === "Work" ? "Break" : "Work");
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRunning, mode, switchMode]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === "Work" ? workDuration : breakDuration);
    localStorage.setItem(
      "pomodoroData",
      JSON.stringify({
        timeLeft: mode === "Work" ? workDuration : breakDuration,
        mode,
        isRunning: false,
        lastUpdate: Date.now(),
      })
    );
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Pomodoro Timer</h1>
      <h2 style={styles.mode}>{mode} Time</h2>
      <div style={styles.timer}>{formatTime(timeLeft)}</div>
      <div style={styles.controls}>
        <button onClick={handleStartPause} style={styles.button}>
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset} style={styles.button}>
          Reset
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    color: "#2c3e50",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  mode: {
    fontSize: "1.5rem",
    color: "#1abc9c",
    marginBottom: "10px",
  },
  timer: {
    fontSize: "3rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#ecf0f1",
    backgroundColor: "#3498db",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Pomodoro;

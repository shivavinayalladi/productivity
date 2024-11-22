import React, { useState, useEffect } from 'react';

const motivationalMessages = [
  "Take a deep breath and focus on yourself.",
  "You're doing great! Keep it up!",
  "Remember: Disconnect to reconnect.",
  "Every moment away from distractions counts.",
  "Stay strong! Your goals matter.",
];

const DigitalDetox = () => {
  const [detoxTime, setDetoxTime] = useState(0); // Time in minutes
  const [timeLeft, setTimeLeft] = useState(0); // Remaining time in seconds
  const [isDetoxActive, setIsDetoxActive] = useState(false);
  const [currentMessage, setCurrentMessage] = useState("");

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    let timer;

    if (isDetoxActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      // Update motivational message every 15 seconds
      if (timeLeft % 15 === 0) {
        setCurrentMessage(
          motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
        );
      }
    } else if (timeLeft === 0 && isDetoxActive) {
      alert("Detox complete! You can now return to your tasks.");
      setIsDetoxActive(false);
    }

    return () => clearInterval(timer);
  }, [isDetoxActive, timeLeft]);

  const startDetox = () => {
    if (detoxTime <= 0) {
      alert("Please set a valid detox time.");
      return;
    }
    setTimeLeft(detoxTime * 60);
    setIsDetoxActive(true);
    setCurrentMessage(
      motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]
    );
  };

  const handleReset = () => {
    setIsDetoxActive(false);
    setDetoxTime(0);
    setTimeLeft(0);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Digital Detox</h1>
      {!isDetoxActive ? (
        <>
          <p style={styles.description}>
            Step away from distractions and focus on yourself. Set a detox timer and take a break.
          </p>
          <div style={styles.inputContainer}>
            <label htmlFor="detoxTime" style={styles.label}>
              Set Detox Time (minutes):
            </label>
            <input
              id="detoxTime"
              type="number"
              value={detoxTime}
              onChange={(e) => setDetoxTime(Number(e.target.value))}
              style={styles.input}
              min="1"
            />
          </div>
          <button onClick={startDetox} style={styles.button}>
            Start Detox
          </button>
        </>
      ) : (
        <div style={styles.lockOverlay}>
          <h2 style={styles.motivationalMessage}>{currentMessage}</h2>
          <h2 style={styles.timer}>{formatTime(timeLeft)}</h2>
          <button onClick={handleReset} style={styles.resetButton}>
            Reset Detox
          </button>
        </div>
      )}
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
  description: {
    fontSize: "1rem",
    color: "#7f8c8d",
    marginBottom: "20px",
  },
  inputContainer: {
    marginBottom: "20px",
  },
  label: {
    fontSize: "1rem",
    marginRight: "10px",
  },
  input: {
    padding: "5px",
    fontSize: "1rem",
    width: "60px",
    textAlign: "center",
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
  lockOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#ecf0f1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  motivationalMessage: {
    fontSize: "1.5rem",
    textAlign: "center",
    marginBottom: "20px",
  },
  timer: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  resetButton: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#ecf0f1",
    backgroundColor: "#e74c3c",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DigitalDetox;
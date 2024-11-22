import React, { useState, useEffect } from 'react';

const mindfulnessQuotes = [
  "Feel your breath. It's your anchor to the present moment.",
  "Breathe in calm, breathe out stress.",
  "Be here now, fully and completely.",
  "Let your mind settle like calm water.",
  "Inhale peace, exhale tension.",
];

const Mindfulness = () => {
  const [currentQuote, setCurrentQuote] = useState('');
  const [breathingPhase, setBreathingPhase] = useState('Inhale'); // 'Inhale', 'Hold', 'Exhale'
  const [timeLeft, setTimeLeft] = useState(4); // Time for the current phase
  const [isBreathing, setIsBreathing] = useState(false);

  useEffect(() => {
    setCurrentQuote(mindfulnessQuotes[Math.floor(Math.random() * mindfulnessQuotes.length)]);
  }, [breathingPhase]);

  useEffect(() => {
    let timer;

    if (isBreathing) {
      timer = setInterval(() => {
        setTimeLeft((prevTimeLeft) => {
          if (prevTimeLeft === 1) {
            switch (breathingPhase) {
              case 'Inhale':
                setBreathingPhase('Hold');
                return 4; // Hold for 4 seconds
              case 'Hold':
                setBreathingPhase('Exhale');
                return 6; // Exhale for 6 seconds
              case 'Exhale':
                setBreathingPhase('Inhale');
                return 4; // Inhale for 4 seconds
              default:
                return 4;
            }
          }
          return prevTimeLeft - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer); // Cleanup interval on pause or component unmount
  }, [isBreathing, breathingPhase]);

  const handleStartPause = () => {
    setIsBreathing((prev) => !prev);
  };

  const handleReset = () => {
    setIsBreathing(false);
    setBreathingPhase('Inhale');
    setTimeLeft(4);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mindfulness Break</h1>
      <p style={styles.quote}>{currentQuote}</p>
      <div style={styles.breathingContainer}>
        <h2 style={styles.breathingPhase}>{breathingPhase}</h2>
        <div style={styles.timer}>{timeLeft}s</div>
      </div>
      <div style={styles.controls}>
        <button onClick={handleStartPause} style={styles.button}>
          {isBreathing ? 'Pause' : 'Start'}
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
  quote: {
    fontSize: '1.2rem',
    fontStyle: 'italic',
    marginBottom: '20px',
    color: '#7f8c8d',
  },
  breathingContainer: {
    marginBottom: '20px',
  },
  breathingPhase: {
    fontSize: '1.5rem',
    color: '#3498db',
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
};

export default Mindfulness;

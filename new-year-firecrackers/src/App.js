import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Fireworks from 'fireworks-js';
import './App.css';

function App() {
  const [familyName, setFamilyName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSnowing, setIsSnowing] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showFireworks, setShowFireworks] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!familyName.trim()) {
      setError('Please write your name');
      return;
    }

    setError('');
    setIsSnowing(false);
    setShowConfetti(true);
    triggerConfetti();
    setIsSubmitted(true);

    setTimeout(() => setShowConfetti(false), 5000);
  };

  const triggerConfetti = () => {
    const duration = 5000; // 5 seconds
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6347', '#32cd32', '#ffff00'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6347', '#32cd32', '#ffff00'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        setShowFireworks(true);
        setTimeout(() => setShowFireworks(false), 4000);
      }
    })();
  };

  useEffect(() => {
    if (showFireworks) {
      const container = document.querySelector('.fireworkDiv');
      const fireworks = new Fireworks(container, {
        opacity: 0.5,
        acceleration: 1.05,
        friction: 0.97,
        gravity: 1.5,
        particles: 50,
        traceLength: 3,
        traceSpeed: 10,
        explosion: 5,
        intensity: 30,
        flickering: 50,
        lineStyle: 'round',
        hue: { min: 0, max: 360 },
        delay: { min: 30, max: 60 },
        rocketsPoint: { min: 0, max: 100 },
        lineWidth: { explosion: { min: 1, max: 3 }, trace: { min: 1, max: 2 } },
        brightness: { min: 50, max: 80 },
        decay: { min: 0.015, max: 0.03 },
        mouse: { click: false, move: false, max: 1 },
      });

      fireworks.start();

      return () => {
        fireworks.stop(); // Cleanup on component unmount
      };
    }
  }, [showFireworks]);

  useEffect(() => {
    if (isSnowing) {
      const numberOfSnowflakes = 50;
      const snowContainer = document.querySelector('.App');

      for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄️';
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.animationDuration = `${Math.random() * 3 + 5}s`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        snowContainer.appendChild(snowflake);
      }
    }

    return () => {
      const snowflakes = document.querySelectorAll('.snowflake');
      snowflakes.forEach((snowflake) => snowflake.remove());
    };
  }, [isSnowing]);

  return (
    <div className="App">
      <div className="tree"></div>
      <div className="tree-stand"></div>
      <h1>Happy New Year!</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="familyName">
            Enter Family Name:
            <input
              id="familyName"
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="e.g., Jhakri"
              aria-describedby="error-message"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>

      {error && <p id="error-message" className="error-message" aria-live="polite">{error}</p>}

      {isSubmitted && !showConfetti && !showFireworks && (
        <h2 className="message-style">Happy New Year, {familyName} Family!</h2>
      )}

      {isSubmitted && (
        <div>
          <h2 className="message-style">
            Family makes every celebration special. Wishing us all a New Year
            full of love, joy, and happy moments together. From Nazianah.
          </h2>
        </div>
      )}

      {showFireworks && (
        <div
          className="fireworkDiv"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        />
      )}
    </div>
  );
}

export default App;

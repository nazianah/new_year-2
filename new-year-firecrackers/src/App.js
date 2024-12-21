import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './App.css'; // Ensure this CSS file is imported
import Fireworks from 'fireworks-library'; // Ensure Fireworks library is correctly imported

function App() {
  const [familyName, setFamilyName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSnowing, setIsSnowing] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [showFireworks, setShowFireworks] = useState(false);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the family name input is empty
    if (!familyName.trim()) {
      setError('Please write your name');
      return;
    }

    setError(''); // Clear error message if input is valid
    setIsSnowing(false); // Stop the snow
    setShowConfetti(true); // Start the confetti
    setShowFireworks(true); // Show the fireworks overlay
    triggerConfetti();
    setIsSubmitted(true); // Set submitted state to true
    setTimeout(() => setShowConfetti(false), 5000); // Confetti duration
    setTimeout(() => setShowFireworks(false), 10000); // Hide fireworks after 10 seconds
  };

  const triggerConfetti = () => {
    // Trigger confetti
    const duration = 5 * 1000; // Duration of confetti
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff6347', '#32cd32', '#ffff00'], // Confetti colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff6347', '#32cd32', '#ffff00'], // Confetti colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  // Fireworks setup and trigger
  useEffect(() => {
    if (showFireworks) {
      const container = document.querySelector(".fireworkDiv");
      const fireworks = new Fireworks(container, {
        autoresize: true,
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
        hue: {
          min: 0,
          max: 360
        },
        delay: {
          min: 30,
          max: 60
        },
        rocketsPoint: {
          min: 0,
          max: 100
        },
        lineWidth: {
          explosion: {
            min: 1,
            max: 3
          },
          trace: {
            min: 1,
            max: 2
          }
        },
        brightness: {
          min: 50,
          max: 80
        },
        decay: {
          min: 0.015,
          max: 0.03
        },
        mouse: {
          click: false,
          move: false,
          max: 1
        }
      });
      fireworks.start(); // Start fireworks animation
    }
  }, [showFireworks]);

  return (
    <div className="App">
      <div className="tree"></div>
      <div className="tree-stand"></div>
      <h1>Happy New Year!</h1>

      {/* Form for user input */}
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label>
            Enter Family Name:
            <input
              type="text"
              value={familyName}
              onChange={(e) => setFamilyName(e.target.value)}
              placeholder="e.g., Jhakri"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Error message */}
      {error && <p className="error-message">{error}</p>}

      {/* Success message when form is submitted */}
      {isSubmitted && (
        <div className="message-style">
          <p>Happy New Year, {familyName} Family!</p>
          <p>Family makes every celebration special. Wishing us all a New Year full of love, joy, and happy moments together. From Nazianah.</p>
        </div>
      )}

      {/* Firework overlay */}
      {showFireworks && (
        <div className="firework-overlay">
          <div className="fireworkDiv"></div>
        </div>
      )}

      {/* Snow effect */}
      {isSnowing && (
        <div className="snowflakes-container">
          {/* Snowflakes will be added dynamically */}
        </div>
      )}
    </div>
  );
}

export default App;

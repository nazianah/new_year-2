import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import './App.css'; // Ensure this CSS file is imported

function App() {
  const [familyName, setFamilyName] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSnowing, setIsSnowing] = useState(true); // New state for snow effect
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to check if form is submitted
  const [error, setError] = useState(''); // State to manage error message

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
    triggerConfetti();
    setIsSubmitted(true); // Set submitted state to true
    setTimeout(() => setShowConfetti(false), 5000); // Confetti duration
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

  // Create snowflakes dynamically when snow is active
  useEffect(() => {
    if (isSnowing) {
      const numberOfSnowflakes = 50; // Adjust number of snowflakes
      const snowContainer = document.querySelector('.App');

      for (let i = 0; i < numberOfSnowflakes; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        snowflake.textContent = '❄️'; // Snowflake symbol
        snowflake.style.left = `${Math.random() * 100}vw`; // Random position
        snowflake.style.animationDuration = `${Math.random() * 3 + 5}s`; // Random fall speed
        snowflake.style.animationDelay = `${Math.random() * 5}s`; // Random start delay
        snowContainer.appendChild(snowflake);
      }
    }

    // Cleanup snowflakes after stopping snow
    return () => {
      const snowflakes = document.querySelectorAll('.snowflake');
      snowflakes.forEach(snowflake => snowflake.remove());
    };
  }, [isSnowing]); // Re-run effect when snowing state changes

  return (
    <div className="App">
      <div className="tree"></div>
      <div className="tree-stand"></div>
      <h1>Happy New Year!</h1>
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

      {error && <p className="error-message">{error}</p>}

      {familyName && !showConfetti && !isSubmitted && (
        <h2>Happy New Year, {familyName} Family!</h2>
      )}

      {isSubmitted && (
        <div>
          <h2>Family makes every celebration special. Wishing us all a New Year full of love, joy, and happy moments together. From Nazianah.</h2>
        </div>
      )}
    </div>
  );
}

export default App;

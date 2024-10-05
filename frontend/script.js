document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('game-image');
    const targetBox = document.getElementById('target-box');
  
    image.addEventListener('click', (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
  
      targetBox.style.top = `${y - 25}px`;
      targetBox.style.left = `${x - 25}px`;
      targetBox.style.width = '50px';
      targetBox.style.height = '50px';
      targetBox.style.display = 'block';
  
      const character = prompt('Which character is this? (e.g., Waldo)');
      if (character) {
        validateSelection(character, x, y);
      }
    });
  
    function validateSelection(character, x, y) {
      fetch('/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ character, x, y }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Correct!');
          const marker = document.createElement('div');
          marker.className = 'marker';
          marker.style.top = `${y}px`;
          marker.style.left = `${x}px`;
          document.querySelector('.container').appendChild(marker);
        } else {
          alert('Incorrect! Try again.');
        }
        targetBox.style.display = 'none'; 
      });
    }
  });
  
  const startTime = Date.now();
  const endTime = Date.now();
  const timeTaken = (endTime - startTime) / 1000; // Convert to seconds
  const playerName = prompt('You found everyone! Enter your name for the leaderboard:');
  
  fetch('/api/save-score', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player: playerName, time: timeTaken })
  });
  
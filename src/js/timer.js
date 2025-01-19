function startCountdown(durationInSeconds) {
    const countdownElement = document.getElementById("countdown");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");
  
    let remainingTime = durationInSeconds;
  
    function updateCountdown() {
      const hours = Math.floor(remainingTime / 3600);
      const minutes = Math.floor((remainingTime % 3600) / 60);
      const seconds = remainingTime % 60;
  
      // Update the HTML elements
      hoursElement.textContent = String(hours).padStart(2, "0");
      minutesElement.textContent = String(minutes).padStart(2, "0");
      secondsElement.textContent = String(seconds).padStart(2, "0");
  
      // Stop the timer when it reaches zero
      if (remainingTime <= 0) {
        clearInterval(timerInterval);
        alert("وقت تمام شد!");
      }
  
      remainingTime--;
    }
  
    // Start the countdown
    updateCountdown(); // Call it immediately to initialize
    const timerInterval = setInterval(updateCountdown, 1000);
  }
  
  // Start the countdown (e.g., 2 hours)
  const countdownDuration = 2 * 3600; // 2 hours in seconds
  startCountdown(countdownDuration);
  
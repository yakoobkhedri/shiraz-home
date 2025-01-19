const slides = document.querySelectorAll('.testimonials > div > div');
const slider = document.querySelector('.testimonials');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0; // Track current active slide
const slideHeight = 200; // Height of a single slide
const slidesPerView = 3; // Number of slides visible
const totalSlides = slides.length;

// Clone slides for seamless looping
slides.forEach((slide) => {
  const cloneFirst = slide.cloneNode(true);
  const cloneLast = slide.cloneNode(true);
  slider.appendChild(cloneFirst); // Add clones at the end
  slider.insertBefore(cloneLast, slider.firstChild); // Add clones at the beginning
});

// Adjust slider position to show the correct starting point
currentIndex = totalSlides; // Start with the first actual slide
slider.style.transform = `translateY(-${currentIndex * slideHeight}px)`;

// Update slider position
function updateSlider() {
  slider.style.transition = 'transform 0.3s ease-in-out';
  slider.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
}

// Handle infinite loop transitions
function checkLoop() {
  if (currentIndex >= totalSlides + slidesPerView) {
    // Jump to the real start
    currentIndex = totalSlides;
    slider.style.transition = 'none';
    slider.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
  } else if (currentIndex < totalSlides) {
    // Jump to the real end
    currentIndex = totalSlides + slidesPerView - 1;
    slider.style.transition = 'none';
    slider.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
  }
}

// Add event listeners for buttons
prevBtn.addEventListener('click', () => {
  currentIndex--;
  updateSlider();
  setTimeout(checkLoop, 300); // Adjust for seamless loop
});

nextBtn.addEventListener('click', () => {
  currentIndex++;
  updateSlider();
  setTimeout(checkLoop, 300); // Adjust for seamless loop
});
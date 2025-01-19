// menu

let hamIcon = document.getElementById('hamIcon');
let mobileMenu = document.querySelector('.mobileMenu');
let dropdownBtn = document.getElementById('dropdownBtn');

hamIcon.addEventListener('click', function () {
  mobileMenu.classList.toggle('active');
})
dropdownBtn.addEventListener('click', function () {
  this.querySelector('svg').classList.toggle('active');
  this.nextElementSibling.classList.toggle('active');
})
document.getElementById('closemenu').addEventListener('click', function () {
  mobileMenu.classList.remove('active');
})

// swiper

var banner = new Swiper(".banner", {
  loop: true,
  spaceBetween: 40,
  slidesPerView: 1,
  effect: "fade",
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
var category = new Swiper(".category", {
  slidesPerView: 2.2,
  spaceBetween: 12,
  autoplay: true,
  breakpoints: {
    576: {
      slidesPerView: 2.6,
      spaceBetween: 24,
    },
    768: {
      slidesPerView: 3,
    },
    992: {
      slidesPerView: 4,
    },
    1200: {
      slidesPerView: 5,
    }
  },
});
var homes = new Swiper(".homes", {
  slidesPerView: 1.3,
  spaceBetween: 16,
  autoplay: true,
  breakpoints: {
    576: {
      slidesPerView: 1.7,
      spaceBetween: 24,
    },
    992: {
      slidesPerView: 3,
    },
    1300: {
      slidesPerView: 4,
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var homes2 = new Swiper(".homes2", {
  slidesPerView: 1,
  spaceBetween: 24,
  autoplay: true,
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 3,
    },
    1300: {
      slidesPerView: 3.3,
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var homes3 = new Swiper(".homes3", {
  slidesPerView: 1.3,
  spaceBetween: 24,
  autoplay: true,
  breakpoints: {
    576: {
      slidesPerView: 2,
    },
    992: {
      slidesPerView: 2,
    },
    1300: {
      slidesPerView: 3,
    },
    1400: {
      slidesPerView: 3.3,
    }
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var testimonials = new Swiper(".testimonials", {
  slidesPerView: 3,
  spaceBetween: 24,
  direction: "vertical",
  autoplay: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  on: {
    slideChange: function () {
      // Remove 'active' class from all slides
      Array.from(document.querySelectorAll('.testimonials .swiper-slide > div')).forEach(slide => {
        slide.classList.remove('active');
      });

      // Add 'active' class to the second slide (index 1 in the visible view)
      const slides = this.slides;
      const secondSlideIndex = this.activeIndex + 1;

      // Check bounds in case of looping
      if (secondSlideIndex < slides.length) {
        slides[secondSlideIndex].classList.add('active');
      } else {
        // Handle edge case for the end of the loop
        slides[secondSlideIndex % slides.length].classList.add('active');
      }
    }
  }
});

// select size

let size = Array.from(document.getElementsByClassName('size'));

size.forEach((item)=>{
  item.addEventListener('click',function () {
    size.forEach((items)=>{items.classList.remove('active')});
    item.classList.add('active');
  })
})

// tabs


let orderTabs = Array.from(document.querySelectorAll('.tabs p'));
let tabContent = Array.from(document.querySelectorAll('.tabContent > div'));
let tabs = Array.from(document.querySelectorAll('.tabs2 > div'));
let tabContent2 = Array.from(document.querySelectorAll('.tabContent2 > div > div'));

orderTabs.forEach((item) => {
  item.addEventListener('click', function () {
    orderTabs.forEach((items) => { items.classList.remove('active') });
    item.classList.add('active');
    let tabId = item.dataset.id;
    tabContent.forEach((content) => {
      let contentId = content.dataset.id;
      if (tabId === contentId) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    })
  })
})

tabs.forEach((item) => {
  item.addEventListener('click', function () {
    tabs.forEach((items) => { items.classList.remove('active') });
    item.classList.add('active');
    let tabId = item.dataset.id;
    tabContent2.forEach((content) => {
      let contentId = content.dataset.id;
      if (tabId === contentId) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    })
  })
})

// input number

let increment = Array.from(document.getElementsByClassName('increment'));
let decrement = Array.from(document.getElementsByClassName('decrement'));

increment.forEach((item) => {
  item.addEventListener('click', function () {
    item.previousElementSibling.value++;
  })
});
decrement.forEach((item) => {
  item.addEventListener('click', function () {
    if (item.nextElementSibling.value > 1) {
      item.nextElementSibling.value--;
    }
  })
});

// acordion

let acordionBtn = Array.from(document.getElementsByClassName('acordionBtn'));
let acordionBtn2 = Array.from(document.getElementsByClassName('acordionBtn2'));

acordionBtn.forEach((item) => {
  item.addEventListener('click', function () {
    item.nextElementSibling.classList.toggle('active');
    item.querySelector('img').classList.toggle('active');
  })
})
acordionBtn2.forEach((item) => {
  item.addEventListener('click', function () {
    item.classList.toggle('active');
    item.nextElementSibling.classList.toggle('active');
    item.querySelector('img.arrow').classList.toggle('active');
  })
})

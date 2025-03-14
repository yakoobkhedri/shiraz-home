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
  slidesPerView: 1.2,
  spaceBetween: 8,
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
    nextEl: ".swiper2",
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
    nextEl: ".swiper2",
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
    nextEl: ".swiper2",
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
    nextEl: ".swiper2",
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
var blog = new Swiper(".blog", {
  slidesPerView: 1.3,
  spaceBetween: 16,
  autoplay: true,
  breakpoints: {
    768: {
      spaceBetween: 48,
      slidesPerView: 2,
    },
    1300: {
      slidesPerView: 3,
    }
  },
  navigation: {
    nextEl: ".swiper2",
    prevEl: ".swiper-button-prev",
  },
});
var filters = new Swiper(".filters", {
  slidesPerView: 2,
  spaceBetween: 12,
  breakpoints: {
    576: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    992: {
      slidesPerView: 6,
    },
    1280: {
      slidesPerView: 8,
    }
  },
  navigation: {
    nextEl: ".swiper2",
    prevEl: ".swiper-button-prev",
  },
});

var rooms = new Swiper(".rooms", {
  loop: true,
  spaceBetween: 20,
  slidesPerView: 1,
  effect: "fade",
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
var gallery = new Swiper(".gallery", {
  slidesPerView: 1,
  spaceBetween: 16,
  navigation: {
    nextEl: ".swiper-button-next2",
    prevEl: ".swiper-button-prev2",
  },
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


let tabs = Array.from(document.querySelectorAll('.tabBox a'));

tabs.forEach((item) => {
  item.addEventListener('click', function () {
    tabs.forEach((items) => { items.classList.remove('active') });
    item.classList.add('active');
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
let acordionBtn3 = Array.from(document.getElementsByClassName('acordionBtn3'));

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
acordionBtn3.forEach((item) => {
  item.addEventListener('click', function () {
    item.classList.toggle('active');
    item.nextElementSibling.classList.toggle('active');
    item.querySelector('svg').classList.toggle('active');
  })
})

// checkbox

let checkbox = Array.from(document.getElementsByClassName('checkbox'));
let checkboxRow = Array.from(document.getElementsByClassName('checkboxRow'));
let dateCheckbox = Array.from(document.getElementsByClassName('dateCheckbox'));

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
  checkbox.checked = false; // غیرفعال کردن حالت checked
});

checkboxRow.forEach((item) => {
    item.querySelector('input').addEventListener('click', function () {
        item.querySelector('.checkbox').classList.toggle('active');
    })
})
dateCheckbox.forEach((item) => {
  item.addEventListener('click', function () {
    item.classList.toggle('active');
  })
})
   // تنظیم مقدار ۰ برای تمام فیلدهای عددی
   document.addEventListener('DOMContentLoaded', function() {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    const otpInput = Array.from(document.getElementsByClassName('otpInput'));
    numberInputs.forEach(input => {
        input.value = '0';
    });
    otpInput.forEach(input2 => {
      input2.value = '';
  });
});
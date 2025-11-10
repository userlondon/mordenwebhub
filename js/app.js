'use srtict';

// const { createElement } = require('react');

// //////////////////////////////////////////////////////////////
// Slide / Create Buttons

// window.alert(
//   `For the best experience, please avoid using Safari browser as it may cause some layout issues. Thank you!`
// );

const slides = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');
let currentIndex = 0;
let interval;

// Create button into html

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('currents');
  dotContainer.appendChild(dot);
  dot.addEventListener('click', () => {
    showSlide(i);
    resetInterval();
  });
});

const dots = document.querySelectorAll('.dot');

const showSlide = function (index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('currenthero', i === index);
    dots[i].classList.toggle('currents', i === index);
  });

  currentIndex = index;
};

const nextSlide = function () {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
};

const resetInterval = function () {
  clearInterval(interval);
  interval = setInterval(nextSlide, 15000);
};

interval = setInterval(nextSlide, 15000);

// //////////////////////////////////////////////////////////////
// Mobile Navigation

const openMenu = document.getElementById('openMenu');
const closeMenu = document.getElementById('closeMenu');
const navLisist = document.getElementById('navList');

openMenu.addEventListener('click', () => {
  navLisist.style.display = 'flex';
  openMenu.style.display = 'none';
  closeMenu.style.display = 'block';
});

closeMenu.addEventListener('click', () => {
  navLisist.style.display = 'none';
  openMenu.style.display = 'block';
  closeMenu.style.display = 'none';
});

// window.addEventListener('click', e => {
//   if (
//     !navLisist.contains(e.target) &&
//     !openMenu.contains(e.target) &&
//     !closeMenu.contains(e.target)
//   ) {
//     navLisist.style.display = 'none';
//     navLisist.style.transition = 'all 0.4s ease-in-out';
//     openMenu.style.display = 'block';
//     closeMenu.style.display = 'none';
//   }
// });

// window.addEventListener('keydown', () => {
//   navLisist.style.display = 'none';
//   openMenu.style.display = 'block';
//   closeMenu.style.display = 'none';
// });

// //////////////////////////////////////////////////////////////
// animations in each section

const pages = document.querySelectorAll('.page');
console.log(pages);

const obs = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  {
    threshold: 0.4,
  }
);

pages.forEach(page => {
  obs.observe(page);
});

// //////////////////////////////////////////////////////////////
// image view
const thumb = document.querySelectorAll('.thumb');
const overLay = document.getElementById('overLay');
const fullImage = document.getElementById('fullImage');
const closeBtn = document.getElementById('close');

thumb.forEach(img => {
  img.addEventListener('click', () => {
    fullImage.src = img.src;
    overLay.style.display = 'flex';
  });
});

// close when clicking x or esc
closeBtn.addEventListener('click', function () {
  overLay.style.display = 'none';
});

// close when clicked outside image
overLay.addEventListener('click', e => {
  if (e.target === overLay) {
    overLay.style.display = 'none';
  }
});

// or
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    overLay.style.display = 'none';
  }
});

// IMAGES
const imgLoad = document.querySelectorAll('.lazy');

imgLoad.forEach(img => {
  img.addEventListener('load', () => {
    img.classList.add('loaded');
  });
});

// ///////////
// SEE MORE
const viewLink = document.getElementById('viewLink');
viewLink.addEventListener('click', e => {
  e.target.classList.add('see-more-active');
});

// ////////////////////////////////////////////////////////////////////////
// PRE-LOAD
window.addEventListener('load', () => {
  const preLoader = document.getElementById('preload');
  const content = document.getElementById('content');

  setTimeout(() => {
    preLoader.style.display = 'none';
    content.style.display = 'block';
  }, 5000);
});

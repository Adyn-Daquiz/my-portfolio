// ===== Modal elements =====
const modal = document.getElementById("carouselModal");
const content = modal.querySelector(".carousel-content");
const closeBtn = modal.querySelector(".close");
const prevBtn = modal.querySelector(".prev");
const nextBtn = modal.querySelector(".next");

// ===== Slides for each project =====
const projectSlides = {
  wis: [
    "images/PsiWIS1.PNG",
    "images/PsiWIS2.PNG",
    "images/PsiWIS3.PNG",
    "images/PsiWIS4.PNG",
    "images/PsiWIS5.PNG"
  ],
  wis2: [
    "images/GaffcoWIS1.PNG",
    "images/GaffcoWIS2.PNG",
    "images/GaffcoWIS3.PNG",
    "images/GaffcoWIS4.PNG",
  ],
    eos: [
    "images/GalcoEOS1.PNG",
    "images/GalcoEOS3.PNG",
    "images/GalcoEOS4.PNG",
    "images/GalcoEOS5.PNG",
  ],
    inventory: [
    "images/PsiInventory1.PNG",
    "images/PsiInventory3.png",
    "images/PsiInventory4.PNG",
  ],
   serialporttest: [
    "images/SerialPortTester.PNG",
  ],
   sellersdiary: [
    "images/SellersDiary.PNG",
  ],
   mipro: [
    "images/Mipro1.png",
    "images/Mipro2.jpg",
    "images/Mipro3.png",
    "images/Mipro4.png",
  ]
};

// ===== State =====
let currentSlides = [];
let currentSlide = 0;

// ===== Functions =====
function loadSlides(project, startIndex = 0) {
  content.innerHTML = "";
  currentSlides = projectSlides[project] || [];
  currentSlide = startIndex;

  currentSlides.forEach((src, i) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = "carousel-slide";
    if (i === startIndex) img.classList.add("active");
    content.appendChild(img);
  });
}

function showSlide(index) {
  const slides = modal.querySelectorAll(".carousel-slide");
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;
  slides.forEach((s, i) => {
    s.classList.toggle("active", i === currentSlide);
  });
}

// ===== Event listeners =====
document.querySelectorAll(".open-carousel").forEach(btn => {
  btn.addEventListener("click", e => {
    e.preventDefault();
    const project = btn.dataset.project;
    const idx = parseInt(btn.dataset.index, 10) || 0;

    loadSlides(project, idx);
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();


// Project carousel
const projectCarousel = document.querySelector(".project-carousel");
const projectPrev = document.querySelector(".carousel-prev");
const projectNext = document.querySelector(".carousel-next");

let projectScroll = 0;
const projectCard = projectCarousel.querySelector(".card");
const projectCardWidth = projectCard.offsetWidth + 16; // 16px gap

projectNext.addEventListener("click", () => {
  projectScroll += projectCardWidth;
  if (projectScroll > projectCarousel.scrollWidth - projectCarousel.clientWidth) {
    projectScroll = 0;
  }
  projectCarousel.scrollTo({ left: projectScroll, behavior: "smooth" });
});

projectPrev.addEventListener("click", () => {
  projectScroll -= projectCardWidth;
  if (projectScroll < 0) {
    projectScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
  }
  projectCarousel.scrollTo({ left: projectScroll, behavior: "smooth" });
});


const thumbnailContainer = modal.querySelector(".carousel-thumbnails");

function loadSlides(project, startIndex = 0) {
  content.innerHTML = "";
  thumbnailContainer.innerHTML = ""; // clear thumbnails
  currentSlides = projectSlides[project] || [];
  currentSlide = startIndex;

  currentSlides.forEach((src, i) => {
    // Main slide
    const img = document.createElement("img");
    img.src = src;
    img.className = "carousel-slide";
    if (i === startIndex) img.classList.add("active");
    content.appendChild(img);

    // Thumbnail
    const thumb = document.createElement("img");
    thumb.src = src;
    thumb.className = i === startIndex ? "active" : "";
    thumb.addEventListener("click", () => showSlide(i));
    thumbnailContainer.appendChild(thumb);
  });
}

function showSlide(index) {
  const slides = modal.querySelectorAll(".carousel-slide");
  const thumbs = modal.querySelectorAll(".carousel-thumbnails img");
  if (!slides.length) return;

  currentSlide = (index + slides.length) % slides.length;

  slides.forEach((s, i) => s.classList.toggle("active", i === currentSlide));
  thumbs.forEach((t, i) => t.classList.toggle("active", i === currentSlide));
}

document.querySelectorAll(".auto-slide").forEach(img => {
  const project = img.dataset.project;
  const slides = projectSlides[project];

  if (slides && slides.length > 1) {
    let currentIndex = 0;

    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      img.src = slides[currentIndex];
    }, 2000); // every 3 seconds
  }
});

document.querySelectorAll(".achievements-grid").forEach(grid => {
  let direction = 1; // 1 = scroll right, -1 = scroll left
  const speed = 1;   // pixels per frame
  const interval = 10; // ms per frame

  setInterval(() => {
    // Scroll
    grid.scrollLeft += direction * speed;

    // Reverse at boundaries
    if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth) {
      direction = -1; // scroll left
    } else if (grid.scrollLeft <= 0) {
      direction = 1; // scroll right
    }
  }, interval);
});

 const text = `I build reliable applications using C#/.NET with
modern frameworks like WPF, MAUI, and
ASP.NET Core, backed by SQL Server
and Azure SQL.`;
  const typingSpeed = 5; // milliseconds per character
  let index = 0;

  function typeTitle() {
    if (index < text.length) {
      document.getElementById("typed-paragraph").textContent += text.charAt(index);
      index++;
      setTimeout(typeTitle, typingSpeed);
    }
  }

  // Start typing when page loads
  window.addEventListener("DOMContentLoaded", typeTitle);



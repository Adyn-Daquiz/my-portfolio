// ===== Modal elements =====
const modal = document.getElementById("carouselModal");
const content = modal.querySelector(".carousel-content");
const closeBtn = modal.querySelector(".close");
const prevBtn = modal.querySelector(".prev");
const nextBtn = modal.querySelector(".next");
const thumbnailContainer = modal.querySelector(".carousel-thumbnails");

// ===== Slides for each project =====
const projectSlides = {
  wis: ["images/PsiWIS1a.png","images/PsiWIS2a.png","images/PsiWIS3a.png","images/PsiWIS4a.png","images/PsiWIS5a.png"],
  wis2: ["images/gaffcowis1a.png","images/gaffcowis2a.png","images/gaffcowis3a.png","images/gaffcowis4a.png"],
  eos: ["images/galcoeos1a.png","images/galcoeos3a.png","images/galcoeos4a.png","images/galcoeos5a.png"],
  inventory: ["images/PsiInventory1a.png","images/PsiInventory3a.png","images/PsiInventory4a.png"],
  serialporttest: ["images/SerialPortTesteraa.png"],
  sellersdiary: ["images/SellersDiary.png"],
  mipro: ["images/Mipro1.png","images/Mipro2.jpg","images/Mipro3.png","images/Mipro4.png"]
};

// ===== State =====
let currentSlides = [];
let currentSlide = 0;

// ===== Functions =====
function loadSlides(project, startIndex = 0) {
  content.innerHTML = "";
  thumbnailContainer.innerHTML = "";
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

// ===== Event listeners =====
document.querySelectorAll(".open-carousel").forEach(img => {
  img.addEventListener("click", e => {
    e.preventDefault();
    const project = img.dataset.project;
    const idx = parseInt(img.dataset.index, 10) || 0;
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

// ===== Horizontal scroll for projects =====
const projectCarousel = document.querySelector(".project-carousel");
const projectPrev = document.querySelector(".carousel-prev");
const projectNext = document.querySelector(".carousel-next");

if (projectCarousel) {
  const projectCard = projectCarousel.querySelector(".card");
  const projectCardWidth = projectCard.offsetWidth + 16; // 16px gap
  let projectScroll = 0;

  projectNext.addEventListener("click", () => {
    projectScroll += projectCardWidth;
    if (projectScroll > projectCarousel.scrollWidth - projectCarousel.clientWidth) projectScroll = 0;
    projectCarousel.scrollTo({ left: projectScroll, behavior: "smooth" });
  });

  projectPrev.addEventListener("click", () => {
    projectScroll -= projectCardWidth;
    if (projectScroll < 0) projectScroll = projectCarousel.scrollWidth - projectCarousel.clientWidth;
    projectCarousel.scrollTo({ left: projectScroll, behavior: "smooth" });
  });
}

// ===== Achievements auto-scroll =====
document.querySelectorAll(".achievements-grid").forEach(grid => {
  let direction = 1;
  const speed = 1;
  const interval = 10;

  setInterval(() => {
    grid.scrollLeft += direction * speed;
    if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth) direction = -1;
    else if (grid.scrollLeft <= 0) direction = 1;
  }, interval);
});

// ===== Typed paragraph =====
const text = `I build reliable applications using C#/.NET with
modern frameworks like WPF, MAUI, and
ASP.NET Core, backed by SQL Server
and Azure SQL.`;
const typingSpeed = 5;
let index = 0;

function typeTitle() {
  if (index < text.length) {
    document.getElementById("typed-paragraph").textContent += text.charAt(index);
    index++;
    setTimeout(typeTitle, typingSpeed);
  }
}

window.addEventListener("DOMContentLoaded", typeTitle);

// Si tu veux ajouter un menu mobile ou des animations + tard
console.log("Mon portfolio chargé !");
const slides = document.querySelectorAll('.split-slider .slide');
let current = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
}

showSlide(current);

setInterval(() => {
  current = (current + 1) % slides.length;
  showSlide(current);
}, 3000); // défilement toutes les 3 secondes

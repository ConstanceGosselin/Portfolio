document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     IMAGE LIGHTBOX
  ========================= */

  const lightbox = document.getElementById("image-lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");

  const clickableImages = document.querySelectorAll(".clickable-image");


  /* Vérification */

  if (!lightbox || !lightboxImage) {
    console.error("Lightbox elements not found.");
    return;
  }


  /* Ouvrir le lightbox */

  clickableImages.forEach(function (image) {

    image.addEventListener("click", function () {

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;

      lightbox.classList.add("active");

      lightbox.setAttribute("aria-hidden", "false");

      document.body.style.overflow = "hidden";

    });

  });


  /* Fermer le lightbox */

  function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute("aria-hidden", "true");

    lightboxImage.src = "";

    document.body.style.overflow = "";

  }


  /* Bouton X */

  if (closeButton) {

    closeButton.addEventListener("click", function (event) {

      event.stopPropagation();

      closeLightbox();

    });

  }


  /* Cliquer sur le fond pour fermer */

  lightbox.addEventListener("click", function (event) {

    if (event.target === lightbox) {

      closeLightbox();

    }

  });


  /* Touche Escape */

  document.addEventListener("keydown", function (event) {

    if (
      event.key === "Escape" &&
      lightbox.classList.contains("active")
    ) {

      closeLightbox();

    }

  });

});

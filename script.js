```javascript
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


    /* =========================
       OUVRIR LE LIGHTBOX
    ========================= */

    clickableImages.forEach(function (image) {

        image.addEventListener("click", function () {

            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;

            lightbox.classList.add("active");
            lightbox.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";

        });

    });


    /* =========================
       FERMER LE LIGHTBOX
    ========================= */

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


    /* =========================
       IMAGE SLIDER
    ========================= */

    const slides = document.querySelectorAll(".slider-image");
    const dots = document.querySelectorAll(".slider-dot");

    const previousButton =
        document.querySelector(".slider-button.prev");

    const nextButton =
        document.querySelector(".slider-button.next");

    const counter =
        document.querySelector(".slider-counter");

    let currentSlide = 0;


    /* Vérification */

    if (
        slides.length === 0 ||
        dots.length === 0 ||
        !previousButton ||
        !nextButton
    ) {
        console.warn("Slider elements not found.");
        return;
    }


    /* =========================
       AFFICHER UNE IMAGE
    ========================= */

    function showSlide(index) {

        /* Sécurité */

        if (index < 0) {
            index = slides.length - 1;
        }

        if (index >= slides.length) {
            index = 0;
        }


        /* Retirer active */

        slides.forEach(function (slide) {

            slide.classList.remove("active");

        });


        dots.forEach(function (dot) {

            dot.classList.remove("active");

        });


        /* Activer la nouvelle image */

        slides[index].classList.add("active");

        dots[index].classList.add("active");


        /* Mettre à jour l'index */

        currentSlide = index;


        /* Mettre à jour le compteur */

        if (counter) {

            counter.textContent =
                "Image " +
                (currentSlide + 1) +
                " / " +
                slides.length;

        }

    }


    /* =========================
       BOUTON SUIVANT
    ========================= */

    nextButton.addEventListener("click", function () {

        const nextSlide =
            (currentSlide + 1) % slides.length;

        showSlide(nextSlide);

    });


    /* =========================
       BOUTON PRÉCÉDENT
    ========================= */

    previousButton.addEventListener("click", function () {

        const previousSlide =
            (currentSlide - 1 + slides.length) %
            slides.length;

        showSlide(previousSlide);

    });


    /* =========================
       BOUTONS DOTS
    ========================= */

    dots.forEach(function (dot, index) {

        dot.addEventListener("click", function () {

            showSlide(index);

        });

    });


    /* =========================
       NAVIGATION AU CLAVIER
    ========================= */

    document.addEventListener("keydown", function (event) {

        /* Ne pas utiliser les flèches si le lightbox est ouvert */

        if (lightbox.classList.contains("active")) {
            return;
        }


        if (event.key === "ArrowRight") {

            const nextSlide =
                (currentSlide + 1) % slides.length;

            showSlide(nextSlide);

        }


        if (event.key === "ArrowLeft") {

            const previousSlide =
                (currentSlide - 1 + slides.length) %
                slides.length;

            showSlide(previousSlide);

        }

    });


    /* =========================
       INITIALISATION
    ========================= */

    showSlide(0);

});
```

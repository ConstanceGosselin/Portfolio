
document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       IMAGE LIGHTBOX
    ===================================================== */

    const lightbox =
        document.getElementById("image-lightbox");

    const lightboxImage =
        document.getElementById("lightbox-image");

    const closeButton =
        document.querySelector(".lightbox-close");

    const clickableImages =
        document.querySelectorAll(".clickable-image");


    /* -----------------------------------------------------
       OUVRIR LE LIGHTBOX
    ----------------------------------------------------- */

    if (lightbox && lightboxImage) {

        clickableImages.forEach(function (image) {

            image.addEventListener("click", function () {

                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;

                lightbox.classList.add("active");

                lightbox.setAttribute(
                    "aria-hidden",
                    "false"
                );

                document.body.style.overflow = "hidden";

            });

        });


        /* -------------------------------------------------
           FERMER LE LIGHTBOX
        ------------------------------------------------- */

        function closeLightbox() {

            lightbox.classList.remove("active");

            lightbox.setAttribute(
                "aria-hidden",
                "true"
            );

            lightboxImage.src = "";

            document.body.style.overflow = "";

        }


        /* Bouton X */

        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    closeLightbox();

                }
            );

        }


        /* Cliquer sur le fond */

        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {

                    closeLightbox();

                }

            }
        );


        /* Touche Escape */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains("active")
                ) {

                    closeLightbox();

                }

            }
        );

    }



    /* =====================================================
       IMAGE SLIDER
    ===================================================== */

    const slides =
        document.querySelectorAll(".slider-image");

    const dots =
        document.querySelectorAll(".slider-dot");

    const previousButton =
        document.querySelector(".slider-button.prev");

    const nextButton =
        document.querySelector(".slider-button.next");

    const counter =
        document.querySelector(".slider-counter");


    let currentSlide = 0;


    /* -----------------------------------------------------
       VÉRIFIER SI UN SLIDER EXISTE
    ----------------------------------------------------- */

    if (
        slides.length > 0 &&
        dots.length > 0 &&
        previousButton &&
        nextButton
    ) {


        /* -------------------------------------------------
           AFFICHER UNE IMAGE
        ------------------------------------------------- */

        function showSlide(index) {

            /* Retour à la dernière image */

            if (index < 0) {

                index = slides.length - 1;

            }


            /* Retour à la première image */

            if (index >= slides.length) {

                index = 0;

            }


            /* Retirer active des images */

            slides.forEach(function (slide) {

                slide.classList.remove("active");

            });


            /* Retirer active des dots */

            dots.forEach(function (dot) {

                dot.classList.remove("active");

            });


            /* Activer l'image */

            slides[index].classList.add("active");


            /* Activer le dot correspondant */

            if (dots[index]) {

                dots[index].classList.add("active");

            }


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


        /* -------------------------------------------------
           IMAGE SUIVANTE
        ------------------------------------------------- */

        nextButton.addEventListener(
            "click",
            function () {

                showSlide(currentSlide + 1);

            }
        );


        /* -------------------------------------------------
           IMAGE PRÉCÉDENTE
        ------------------------------------------------- */

        previousButton.addEventListener(
            "click",
            function () {

                showSlide(currentSlide - 1);

            }
        );


        /* -------------------------------------------------
           DOTS
        ------------------------------------------------- */

        dots.forEach(function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    showSlide(index);

                }
            );

        });


        /* -------------------------------------------------
           NAVIGATION AU CLAVIER
        ------------------------------------------------- */

        document.addEventListener(
            "keydown",
            function (event) {

                /*
                 * Si le lightbox est ouvert,
                 * les flèches ne contrôlent pas le slider.
                 */

                if (
                    lightbox &&
                    lightbox.classList.contains("active")
                ) {

                    return;

                }


                if (event.key === "ArrowRight") {

                    showSlide(currentSlide + 1);

                }


                if (event.key === "ArrowLeft") {

                    showSlide(currentSlide - 1);

                }

            }
        );


        /* -------------------------------------------------
           INITIALISATION
        ------------------------------------------------- */

        showSlide(0);

    }

});
```

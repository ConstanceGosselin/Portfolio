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

    if (lightbox && lightboxImage) {

        clickableImages.forEach(function (image) {

            image.addEventListener("click", function () {

                lightboxImage.src = image.src;
                lightboxImage.alt = image.alt;

                lightbox.classList.add("active");
                lightbox.setAttribute("aria-hidden", "false");

                document.body.style.overflow = "hidden";
            });

        });


        function closeLightbox() {

            lightbox.classList.remove("active");
            lightbox.setAttribute("aria-hidden", "true");

            lightboxImage.src = "";

            document.body.style.overflow = "";
        }


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    closeLightbox();

                }
            );

        }


        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {

                    closeLightbox();

                }

            }
        );


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
       IMAGE SLIDERS
       Each slider works independently
    ===================================================== */

    const sliders =
        document.querySelectorAll(".image-slider");


    sliders.forEach(function (slider) {

        /* -------------------------------------------------
           Elements belonging ONLY to this slider
        ------------------------------------------------- */

        const slides =
            slider.querySelectorAll(".slider-image");

        const previousButton =
            slider.querySelector(".slider-button.prev");

        const nextButton =
            slider.querySelector(".slider-button.next");


        /*
         * The dots/counter are expected immediately after
         * the .image-slider element.
         */

        const dotsContainer =
            slider.nextElementSibling;


        const dots =
            dotsContainer
                ? dotsContainer.querySelectorAll(".slider-dot")
                : [];


        const counter =
            dotsContainer
                ? dotsContainer.querySelector(".slider-counter")
                : null;


        let currentSlide = 0;


        /* -------------------------------------------------
           Safety check
        ------------------------------------------------- */

        if (
            slides.length === 0 ||
            !previousButton ||
            !nextButton
        ) {

            return;

        }


        /* -------------------------------------------------
           SHOW SLIDE
        ------------------------------------------------- */

        function showSlide(index) {

            /*
             * Loop to last image
             */

            if (index < 0) {

                index = slides.length - 1;

            }


            /*
             * Loop back to first image
             */

            if (index >= slides.length) {

                index = 0;

            }


            /*
             * Hide all slides
             */

            slides.forEach(function (slide) {

                slide.classList.remove("active");

            });


            /*
             * Reset dots
             */

            dots.forEach(function (dot) {

                dot.classList.remove("active");

            });


            /*
             * Show selected slide
             */

            slides[index].classList.add("active");


            /*
             * Activate corresponding dot
             */

            if (dots[index]) {

                dots[index].classList.add("active");

            }


            /*
             * Update current position
             */

            currentSlide = index;


            /*
             * Update counter if it exists
             */

            if (counter) {

                counter.textContent =
                    "Image " +
                    (currentSlide + 1) +
                    " / " +
                    slides.length;

            }

        }



        /* -------------------------------------------------
           NEXT BUTTON
        ------------------------------------------------- */

        nextButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showSlide(currentSlide + 1);

            }
        );



        /* -------------------------------------------------
           PREVIOUS BUTTON
        ------------------------------------------------- */

        previousButton.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                showSlide(currentSlide - 1);

            }
        );



        /* -------------------------------------------------
           DOTS
        ------------------------------------------------- */

        dots.forEach(function (dot, index) {

            dot.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showSlide(index);

                }
            );

        });



        /* -------------------------------------------------
           INITIALIZE SLIDER
        ------------------------------------------------- */

        showSlide(0);

    });



    /* =====================================================
       KEYBOARD NAVIGATION
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            /*
             * Do nothing if lightbox is open
             */

            if (
                lightbox &&
                lightbox.classList.contains("active")
            ) {

                return;

            }


            /*
             * Find the slider currently under the mouse
             */

            let activeSlider =
                document.querySelector(
                    ".image-slider:hover"
                );


            /*
             * If no slider is hovered,
             * use the first slider
             */

            if (!activeSlider) {

                activeSlider = sliders[0];

            }


            /*
             * No sliders on the page
             */

            if (!activeSlider) {

                return;

            }


            const slides =
                activeSlider.querySelectorAll(
                    ".slider-image"
                );


            if (slides.length === 0) {

                return;

            }


            /*
             * Find current active image
             */

            let currentIndex = 0;


            slides.forEach(function (slide, index) {

                if (
                    slide.classList.contains("active")
                ) {

                    currentIndex = index;

                }

            });


            /*
             * RIGHT ARROW
             */

            if (event.key === "ArrowRight") {

                currentIndex++;

                if (
                    currentIndex >= slides.length
                ) {

                    currentIndex = 0;

                }

            }


            /*
             * LEFT ARROW
             */

            else if (event.key === "ArrowLeft") {

                currentIndex--;

                if (currentIndex < 0) {

                    currentIndex =
                        slides.length - 1;

                }

            }


            /*
             * If another key was pressed,
             * don't modify the slider
             */

            else {

                return;

            }


            /*
             * Hide all images
             */

            slides.forEach(function (slide) {

                slide.classList.remove("active");

            });


            /*
             * Show selected image
             */

            slides[currentIndex].classList.add(
                "active"
            );


            /*
             * Update dots
             */

            const dotsContainer =
                activeSlider.nextElementSibling;


            if (dotsContainer) {

                const dots =
                    dotsContainer.querySelectorAll(
                        ".slider-dot"
                    );


                dots.forEach(function (dot) {

                    dot.classList.remove("active");

                });


                if (dots[currentIndex]) {

                    dots[currentIndex].classList.add(
                        "active"
                    );

                }


                /*
                 * Update counter
                 */

                const counter =
                    dotsContainer.querySelector(
                        ".slider-counter"
                    );


                if (counter) {

                    counter.textContent =
                        "Image " +
                        (currentIndex + 1) +
                        " / " +
                        slides.length;

                }

            }

        }
    );

});

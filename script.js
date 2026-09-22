
<script>

document.addEventListener("DOMContentLoaded", function () {

    /*
    ============================================================
    ALL SLIDERS
    ============================================================
    */

    const sliders = document.querySelectorAll(".image-slider");


    /*
    ============================================================
    INITIALISE EACH SLIDER
    ============================================================
    */

    sliders.forEach(function (slider) {

        /*
        --------------------------------------------------------
        IMAGES
        --------------------------------------------------------
        */

        const images =
            slider.querySelectorAll(".slider-image");


        /*
        --------------------------------------------------------
        BUTTONS
        --------------------------------------------------------
        */

        const previousButton =
            slider.querySelector(".slider-button.prev");

        const nextButton =
            slider.querySelector(".slider-button.next");


        /*
        --------------------------------------------------------
        FIND DOTS AND COUNTER
        --------------------------------------------------------

        They are OUTSIDE .image-slider in your HTML.
        They are immediately after the slider.
        --------------------------------------------------------
        */

        const parent =
            slider.parentElement;


        const dots =
            parent.querySelectorAll(".slider-dot");


        const counter =
            parent.querySelector(".slider-counter");


        /*
        --------------------------------------------------------
        SAFETY CHECK
        --------------------------------------------------------
        */

        if (images.length === 0) {
            return;
        }


        /*
        --------------------------------------------------------
        CURRENT IMAGE
        --------------------------------------------------------
        */

        let currentIndex = 0;


        /*
        ========================================================
        SHOW IMAGE
        ========================================================
        */

        function showImage(index) {

            /*
            ----------------------------------------------------
            LOOP FORWARD
            ----------------------------------------------------
            */

            if (index >= images.length) {
                index = 0;
            }


            /*
            ----------------------------------------------------
            LOOP BACKWARD
            ----------------------------------------------------
            */

            if (index < 0) {
                index = images.length - 1;
            }


            currentIndex = index;


            /*
            ----------------------------------------------------
            UPDATE IMAGES
            ----------------------------------------------------
            */

            images.forEach(function (image, i) {

                image.classList.toggle(
                    "active",
                    i === currentIndex
                );

            });


            /*
            ----------------------------------------------------
            UPDATE DOTS
            ----------------------------------------------------
            */

            dots.forEach(function (dot, i) {

                dot.classList.toggle(
                    "active",
                    i === currentIndex
                );


                /*
                Accessibility
                */

                if (i === currentIndex) {

                    dot.setAttribute(
                        "aria-current",
                        "true"
                    );

                } else {

                    dot.removeAttribute(
                        "aria-current"
                    );

                }

            });


            /*
            ----------------------------------------------------
            UPDATE COUNTER
            ----------------------------------------------------
            */

            if (counter) {

                counter.textContent =
                    "Image " +
                    (currentIndex + 1) +
                    " / " +
                    images.length;

            }

        }


        /*
        ========================================================
        NEXT BUTTON
        ========================================================
        */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showImage(
                        currentIndex + 1
                    );

                }
            );

        }


        /*
        ========================================================
        PREVIOUS BUTTON
        ========================================================
        */

        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showImage(
                        currentIndex - 1
                    );

                }
            );

        }


        /*
        ========================================================
        DOT BUTTONS
        ========================================================
        */

        dots.forEach(function (dot, index) {

            dot.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showImage(index);

                }
            );

        });


        /*
        ========================================================
        INITIALISE
        ========================================================
        */

        showImage(0);

    });


    /*
    ============================================================
    KEYBOARD NAVIGATION
    ============================================================
    */

    let activeSlider =
        sliders.length > 0
            ? sliders[0]
            : null;


    /*
    ------------------------------------------------------------
    Select slider with mouse
    ------------------------------------------------------------
    */

    sliders.forEach(function (slider) {

        slider.addEventListener(
            "mouseenter",
            function () {

                activeSlider = slider;

            }
        );

    });


    /*
    ============================================================
    ARROW KEYS
    ============================================================
    */

    document.addEventListener(
        "keydown",
        function (event) {

            /*
            ----------------------------------------------------
            Ignore typing
            ----------------------------------------------------
            */

            if (
                event.target.tagName === "INPUT" ||
                event.target.tagName === "TEXTAREA" ||
                event.target.tagName === "SELECT"
            ) {

                return;

            }


            /*
            ----------------------------------------------------
            No slider
            ----------------------------------------------------
            */

            if (!activeSlider) {
                return;
            }


            /*
            ----------------------------------------------------
            RIGHT
            ----------------------------------------------------
            */

            if (event.key === "ArrowRight") {

                const nextButton =
                    activeSlider.querySelector(
                        ".slider-button.next"
                    );

                if (nextButton) {

                    nextButton.click();

                }

            }


            /*
            ----------------------------------------------------
            LEFT
            ----------------------------------------------------
            */

            if (event.key === "ArrowLeft") {

                const previousButton =
                    activeSlider.querySelector(
                        ".slider-button.prev"
                    );

                if (previousButton) {

                    previousButton.click();

                }

            }

        }
    );

});

</script>


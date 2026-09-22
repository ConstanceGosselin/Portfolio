
document.addEventListener("DOMContentLoaded", function () {

    const sliders = document.querySelectorAll(".image-slider");

    sliders.forEach(function (slider) {

        const images = slider.querySelectorAll(".slider-image");

        const previousButton =
            slider.querySelector(".slider-button.prev");

        const nextButton =
            slider.querySelector(".slider-button.next");

        const sliderContainer =
            slider.parentElement;

        const dots =
            sliderContainer.querySelectorAll(".slider-dot");

        const counter =
            sliderContainer.querySelector(".slider-counter");

        if (images.length === 0) {
            return;
        }

        let currentIndex = 0;


        function showImage(index) {

            if (index >= images.length) {
                index = 0;
            }

            if (index < 0) {
                index = images.length - 1;
            }

            currentIndex = index;


            images.forEach(function (image, i) {

                image.classList.toggle(
                    "active",
                    i === currentIndex
                );

            });


            dots.forEach(function (dot, i) {

                dot.classList.toggle(
                    "active",
                    i === currentIndex
                );

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


            if (counter) {

                counter.textContent =
                    "Image " +
                    (currentIndex + 1) +
                    " / " +
                    images.length;

            }

        }


        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    showImage(currentIndex + 1);

                }
            );

        }


        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function () {

                    showImage(currentIndex - 1);

                }
            );

        }


        dots.forEach(function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    showImage(index);

                }
            );

        });


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


    sliders.forEach(function (slider) {

        slider.addEventListener(
            "mouseenter",
            function () {

                activeSlider = slider;

            }
        );

    });


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.target.tagName === "INPUT" ||
                event.target.tagName === "TEXTAREA" ||
                event.target.tagName === "SELECT"
            ) {
                return;
            }


            if (!activeSlider) {
                return;
            }


            if (event.key === "ArrowRight") {

                const nextButton =
                    activeSlider.querySelector(
                        ".slider-button.next"
                    );

                if (nextButton) {
                    nextButton.click();
                }

            }


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

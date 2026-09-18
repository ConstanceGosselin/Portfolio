```html
<script>

document.addEventListener("DOMContentLoaded", function () {


    /*
    =====================================================
    IMAGE SLIDERS
    =====================================================
    */

    const sliders = document.querySelectorAll(".image-slider");


    sliders.forEach(function (slider) {


        /*
        -------------------------------------------------
        Elements belonging to THIS slider
        -------------------------------------------------
        */

        const images =
            slider.querySelectorAll(".slider-image");

        const previousButton =
            slider.querySelector(".prev");

        const nextButton =
            slider.querySelector(".next");


        /*
        -------------------------------------------------
        Find the container containing the controls
        -------------------------------------------------
        */

        const container =
            slider.parentElement;


        const dots =
            container.querySelectorAll(".slider-dot");


        const counter =
            container.querySelector(".slider-counter");


        /*
        -------------------------------------------------
        Current image
        -------------------------------------------------
        */

        let currentIndex = 0;



        /*
        =================================================
        SHOW IMAGE
        =================================================
        */

        function showImage(index) {


            if (images.length === 0) {
                return;
            }


            /*
            Keep index inside the valid range
            */

            if (index >= images.length) {
                index = 0;
            }

            if (index < 0) {
                index = images.length - 1;
            }


            currentIndex = index;


            /*
            -------------------------------------------------
            Show selected image
            -------------------------------------------------
            */

            images.forEach(function (image, i) {

                image.classList.toggle(
                    "active",
                    i === currentIndex
                );

            });


            /*
            -------------------------------------------------
            Update dots
            -------------------------------------------------
            */

            dots.forEach(function (dot, i) {

                dot.classList.toggle(
                    "active",
                    i === currentIndex
                );

            });


            /*
            -------------------------------------------------
            Update counter
            -------------------------------------------------
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
        =================================================
        NEXT
        =================================================
        */

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showImage(currentIndex + 1);

                }
            );

        }



        /*
        =================================================
        PREVIOUS
        =================================================
        */

        if (previousButton) {

            previousButton.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    showImage(currentIndex - 1);

                }
            );

        }



        /*
        =================================================
        DOT NAVIGATION
        =================================================
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
        =================================================
        INITIAL STATE
        =================================================
        */

        showImage(0);

    });



    /*
    =====================================================
    KEYBOARD NAVIGATION
    =====================================================
    */

    document.addEventListener(
        "keydown",
        function (event) {


            /*
            Ignore typing fields
            */

            if (
                event.target.tagName === "INPUT" ||
                event.target.tagName === "TEXTAREA" ||
                event.target.tagName === "SELECT"
            ) {

                return;

            }


            /*
            -------------------------------------------------
            Right arrow
            -------------------------------------------------
            */

            if (event.key === "ArrowRight") {

                const visibleSlider =
                    Array.from(
                        document.querySelectorAll(".image-slider")
                    ).find(function (slider) {

                        return (
                            slider.offsetParent !== null
                        );

                    });


                if (visibleSlider) {

                    const button =
                        visibleSlider.querySelector(".next");

                    if (button) {
                        button.click();
                    }

                }

            }


            /*
            -------------------------------------------------
            Left arrow
            -------------------------------------------------
            */

            if (event.key === "ArrowLeft") {

                const visibleSlider =
                    Array.from(
                        document.querySelectorAll(".image-slider")
                    ).find(function (slider) {

                        return (
                            slider.offsetParent !== null
                        );

                    });


                if (visibleSlider) {

                    const button =
                        visibleSlider.querySelector(".prev");

                    if (button) {
                        button.click();
                    }

                }

            }

        }
    );

});

</script>
```

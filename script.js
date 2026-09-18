```html
<script>

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /*
        =====================================================
        IMAGE SLIDERS
        =====================================================
        */

        const sliders =
            document.querySelectorAll(".image-slider");


        /*
        =====================================================
        INITIALISE EACH SLIDER INDEPENDENTLY
        =====================================================
        */

        sliders.forEach(
            function (slider) {


                /*
                -------------------------------------------------
                Images belonging to THIS slider
                -------------------------------------------------
                */

                const images =
                    slider.querySelectorAll(".slider-image");


                /*
                -------------------------------------------------
                Previous / next buttons
                -------------------------------------------------
                */

                const previousButton =
                    slider.querySelector(".prev");


                const nextButton =
                    slider.querySelector(".next");


                /*
                -------------------------------------------------
                Find the result containing THIS slider
                -------------------------------------------------
                */

                const result =
                    slider.closest(".result");


                /*
                -------------------------------------------------
                Dots belonging to THIS slider
                -------------------------------------------------
                */

                const dots =
                    result.querySelectorAll(".slider-dot");


                /*
                -------------------------------------------------
                Counter belonging to THIS slider
                -------------------------------------------------
                */

                const counter =
                    result.querySelector(".slider-counter");


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


                    /*
                    -------------------------------------------------
                    Safety check
                    -------------------------------------------------
                    */

                    if (images.length === 0) {

                        return;

                    }


                    /*
                    -------------------------------------------------
                    Loop to first image
                    -------------------------------------------------
                    */

                    if (
                        index >= images.length
                    ) {

                        index = 0;

                    }


                    /*
                    -------------------------------------------------
                    Loop to last image
                    -------------------------------------------------
                    */

                    if (
                        index < 0
                    ) {

                        index =
                            images.length - 1;

                    }


                    currentIndex = index;



                    /*
                    =================================================
                    UPDATE IMAGES
                    =================================================
                    */

                    images.forEach(
                        function (image, i) {

                            image.classList.toggle(
                                "active",
                                i === currentIndex
                            );

                        }
                    );



                    /*
                    =================================================
                    UPDATE DOTS
                    =================================================
                    */

                    dots.forEach(
                        function (dot, i) {

                            dot.classList.toggle(
                                "active",
                                i === currentIndex
                            );

                        }
                    );



                    /*
                    =================================================
                    UPDATE COUNTER
                    =================================================
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
                NEXT IMAGE
                =================================================
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
                =================================================
                PREVIOUS IMAGE
                =================================================
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
                =================================================
                DOT NAVIGATION
                =================================================
                */

                dots.forEach(
                    function (dot, index) {

                        dot.addEventListener(
                            "click",
                            function (event) {

                                event.preventDefault();

                                showImage(index);

                            }
                        );

                    }
                );



                /*
                =================================================
                INITIAL STATE
                =================================================
                */

                showImage(0);

            }
        );



        /*
        =====================================================
        KEYBOARD NAVIGATION
        =====================================================
        */

        let activeSlider = null;



        /*
        -----------------------------------------------------
        When the mouse enters a slider,
        make it the active slider
        -----------------------------------------------------
        */

        sliders.forEach(
            function (slider) {

                slider.addEventListener(
                    "mouseenter",
                    function () {

                        activeSlider =
                            slider;

                    }
                );

            }
        );



        /*
        -----------------------------------------------------
        Keyboard arrows
        -----------------------------------------------------
        */

        document.addEventListener(
            "keydown",
            function (event) {


                /*
                -------------------------------------------------
                Ignore keyboard navigation when typing
                -------------------------------------------------
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
                If no slider has been selected yet,
                use the first slider
                -------------------------------------------------
                */

                if (!activeSlider) {

                    activeSlider =
                        sliders[0];

                }



                /*
                =================================================
                RIGHT ARROW
                =================================================
                */

                if (
                    event.key === "ArrowRight"
                ) {

                    const button =
                        activeSlider.querySelector(".next");


                    if (button) {

                        button.click();

                    }

                }



                /*
                =================================================
                LEFT ARROW
                =================================================
                */

                if (
                    event.key === "ArrowLeft"
                ) {

                    const button =
                        activeSlider.querySelector(".prev");


                    if (button) {

                        button.click();

                    }

                }

            }
        );


    }
);

</script>
```

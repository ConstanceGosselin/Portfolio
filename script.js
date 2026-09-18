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


        sliders.forEach(
            function (slider) {


                /*
                -------------------------------------------------
                Find elements belonging to THIS slider
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
                Find the controls belonging to THIS result
                -------------------------------------------------
                */

                const result =
                    slider.closest(".result");


                const dots =
                    result.querySelectorAll(".slider-dot");


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
                    Keep index within valid range
                    */

                    if (index >= images.length) {

                        index = 0;

                    }


                    if (index < 0) {

                        index =
                            images.length - 1;

                    }


                    currentIndex = index;



                    /*
                    -------------------------------------------------
                    Show selected image
                    -------------------------------------------------
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
                    -------------------------------------------------
                    Update dots
                    -------------------------------------------------
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
                NEXT IMAGE
                =================================================
                */

                if (nextButton) {

                    nextButton.addEventListener(
                        "click",
                        function () {

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
                        function () {

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
                            function () {

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
        Detect which slider the mouse is over
        -----------------------------------------------------
        */

        sliders.forEach(
            function (slider) {

                slider.addEventListener(
                    "mouseenter",
                    function () {

                        activeSlider = slider;

                    }
                );

            }
        );



        /*
        -----------------------------------------------------
        Arrow keys
        -----------------------------------------------------
        */

        document.addEventListener(
            "keydown",
            function (event) {


                /*
                Ignore keyboard navigation when typing
                */

                if (
                    event.target.tagName === "INPUT" ||
                    event.target.tagName === "TEXTAREA" ||
                    event.target.tagName === "SELECT"
                ) {

                    return;

                }


                /*
                If no slider has been hovered,
                use the first slider
                */

                if (!activeSlider) {

                    activeSlider =
                        sliders[0];

                }


                if (
                    event.key === "ArrowRight"
                ) {

                    const button =
                        activeSlider.querySelector(".next");


                    if (button) {

                        button.click();

                    }

                }


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

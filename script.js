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


                const images =
                    slider.querySelectorAll(".slider-image");


                /*
                -------------------------------------------------
                Find the controls belonging to THIS slider
                -------------------------------------------------
                */

                const resultContent =
                    slider.closest(".result-content");


                const dots =
                    resultContent.querySelectorAll(".slider-dot");


                const previousButton =
                    slider.querySelector(".prev");


                const nextButton =
                    slider.querySelector(".next");


                const counter =
                    resultContent.querySelector(".slider-counter");


                let currentIndex = 0;



                /*
                =================================================
                SHOW IMAGE
                =================================================
                */

                function showImage(index) {


                    currentIndex = index;


                    /*
                    Show the selected image
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
                    Update dots
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
                    Update counter
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

                            currentIndex++;

                            if (
                                currentIndex >= images.length
                            ) {

                                currentIndex = 0;

                            }

                            showImage(currentIndex);

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

                            currentIndex--;

                            if (
                                currentIndex < 0
                            ) {

                                currentIndex =
                                    images.length - 1;

                            }

                            showImage(currentIndex);

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

        document.addEventListener(
            "keydown",
            function (event) {


                /*
                Only change slider with keyboard if
                the user is not typing in an input
                */

                if (
                    event.target.tagName === "INPUT" ||
                    event.target.tagName === "TEXTAREA"
                ) {

                    return;

                }


                const sliders =
                    document.querySelectorAll(".image-slider");


                /*
                For keyboard navigation, use the slider
                currently closest to the mouse position
                is not reliable, so simply control the
                first visible slider.
                */

                if (event.key === "ArrowRight") {

                    sliders.forEach(
                        function (slider, index) {

                            if (
                                index === 0
                            ) {

                                const button =
                                    slider.querySelector(".next");

                                if (button) {
                                    button.click();
                                }

                            }

                        }
                    );

                }


                if (event.key === "ArrowLeft") {

                    sliders.forEach(
                        function (slider, index) {

                            if (
                                index === 0
                            ) {

                                const button =
                                    slider.querySelector(".prev");

                                if (button) {
                                    button.click();
                                }

                            }

                        }
                    );

                }

            }
        );


    }
);

</script>

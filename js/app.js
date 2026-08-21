// ========================================
// ANTONIO RUSSO WEBSITE
// Interactive Effects
// ========================================

document.addEventListener("DOMContentLoaded", () => {


    // ========================================
    // SCROLL REVEAL
    // ========================================

    const elements = document.querySelectorAll(
        ".section-header, .bio, .timeline-item, .skill-card, .project-card, .contact-content"
    );


    if (elements.length > 0) {

        const observer = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


        elements.forEach((element) => {

            element.classList.add("reveal");

            observer.observe(element);

        });

    }



    // ========================================
    // HEADER SCROLL EFFECT
    // ========================================

    const header = document.querySelector(".header");


    if (header) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 50) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        });

    }

});
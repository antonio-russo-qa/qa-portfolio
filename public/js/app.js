/* =========================================================
   ANTONIO RUSSO
   PORTFOLIO INTERACTIONS
========================================================= */


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initScrollReveal();

    initHeader();

    initMobileMenu();

    initCursorGlow();

    initCounters();

    initSmoothAnchors();

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(".reveal");


    if (!elements.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function initHeader() {

    const header =
        document.querySelector(".header");


    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

}


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const button =
        document.querySelector(".menu-toggle");

    const menu =
        document.querySelector(".mobile-menu");


    if (!button || !menu) {
        return;
    }


    button.addEventListener("click", () => {

        const isOpen =
            menu.classList.toggle("open");


        button.classList.toggle(
            "open",
            isOpen
        );


        button.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    menu.querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    menu.classList.remove(
                        "open"
                    );

                    button.classList.remove(
                        "open"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

        });


    window.addEventListener(
        "resize",
        () => {

            if (window.innerWidth > 850) {

                menu.classList.remove(
                    "open"
                );

                button.classList.remove(
                    "open"
                );

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );

}


/* =========================================================
   CURSOR GLOW
========================================================= */

function initCursorGlow() {

    const glow =
        document.querySelector(".cursor-glow");


    if (!glow) {
        return;
    }


    if (
        window.matchMedia(
            "(pointer: coarse)"
        ).matches
    ) {

        return;

    }


    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;


    document.addEventListener(
        "mousemove",
        event => {

            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

            glow.style.opacity =
                "1";

        }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            glow.style.opacity =
                "0";

        }
    );


    function animate() {

        currentX +=
            (mouseX - currentX) * .08;

        currentY +=
            (mouseY - currentY) * .08;


        glow.style.left =
            `${currentX}px`;

        glow.style.top =
            `${currentY}px`;


        requestAnimationFrame(
            animate
        );

    }


    animate();

}


/* =========================================================
   NUMBER COUNTERS
========================================================= */

function initCounters() {

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    if (!counters.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const counter =
                        entry.target;


                    const target =
                        Number(
                            counter.dataset.count
                        );


                    animateCounter(
                        counter,
                        target
                    );


                    observer.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: .6
            }
        );


    counters.forEach(counter => {

        observer.observe(counter);

    });

}


/* =========================================================
   COUNTER ANIMATION
========================================================= */

function animateCounter(
    element,
    target
) {

    const duration =
        1400;

    const start =
        performance.now();


    function update(currentTime) {

        const elapsed =
            currentTime - start;


        const progress =
            Math.min(
                elapsed / duration,
                1
            );


        const eased =
            1 - Math.pow(
                1 - progress,
                3
            );


        const value =
            Math.floor(
                target * eased
            );


        element.textContent =
            value;


        if (progress < 1) {

            requestAnimationFrame(
                update
            );

        } else {

            element.textContent =
                target;

        }

    }


    requestAnimationFrame(
        update
    );

}


/* =========================================================
   SMOOTH INTERNAL LINKS
========================================================= */

function initSmoothAnchors() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    headerHeight;


                window.scrollTo({

                    top:
                        targetPosition,

                    behavior:
                        "smooth"

                });

            }
        );

    });

}


/* =========================================================
   CARD TILT EFFECT
========================================================= */

const tiltCards =
    document.querySelectorAll(
        ".service-card, .cert-card"
    );


if (
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    tiltCards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -2;


                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    2;


                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   IMAGE PARALLAX
========================================================= */

const heroImage =
    document.querySelector(
        ".hero-visual"
    );


if (
    heroImage &&
    window.matchMedia(
        "(pointer: fine)"
    ).matches
) {

    heroImage.addEventListener(
        "mousemove",
        event => {

            const rect =
                heroImage.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;


            const y =
                event.clientY -
                rect.top;


            const moveX =
                (x - rect.width / 2) *
                .012;


            const moveY =
                (y - rect.height / 2) *
                .012;


            heroImage.style.transform =
                `translate3d(${moveX}px, ${moveY}px, 0)`;

        }
    );


    heroImage.addEventListener(
        "mouseleave",
        () => {

            heroImage.style.transform =
                "";

        }
    );

}
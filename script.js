/* =========================================================
   VEERESH AVANTI — QA ENGINEER PORTFOLIO
   INTERACTION / ANIMATION ENGINE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       LUCIDE ICONS
    ===================================================== */

    const initializeIcons = () => {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    };

    initializeIcons();


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const mobileMenuButton =
        document.querySelector(".mobile-menu-button");

    const mobileNav =
        document.querySelector(".mobile-nav");

    const mobileClose =
        document.querySelector(".mobile-close");

    const mobileLinks =
        document.querySelectorAll(".mobile-nav a");


    const openMobileMenu = () => {

        if (!mobileNav) return;

        mobileNav.classList.add("open");

        document.body.classList.add("menu-open");

        mobileMenuButton?.setAttribute(
            "aria-expanded",
            "true"
        );
    };


    const closeMobileMenu = () => {

        if (!mobileNav) return;

        mobileNav.classList.remove("open");

        document.body.classList.remove("menu-open");

        mobileMenuButton?.setAttribute(
            "aria-expanded",
            "false"
        );
    };


    mobileMenuButton?.addEventListener(
        "click",
        openMobileMenu
    );


    mobileClose?.addEventListener(
        "click",
        closeMobileMenu
    );


    mobileLinks.forEach((link) => {

        link.addEventListener(
            "click",
            closeMobileMenu
        );

    });


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMobileMenu();
            }

        }
    );


    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(targetId);

                if (!target) return;

                event.preventDefault();

                const header =
                    document.querySelector(
                        ".site-header"
                    );

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight -
                    10;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =====================================================
       TYPING EFFECT
    ===================================================== */

    const typingElement =
        document.querySelector("#typing-text");


    if (typingElement) {

        const roles = [
            "QA Engineer",
            "Software Tester",
            "API Tester",
            "Automation Tester",
            "Performance Tester",
            "Security Tester"
        ];

        let roleIndex = 0;
        let characterIndex = 0;

        let deleting = false;

        const typingSpeed = 75;
        const deletingSpeed = 45;
        const pauseAfterTyping = 1700;
        const pauseAfterDeleting = 400;


        const typeRole = () => {

            const currentRole =
                roles[roleIndex];


            if (!deleting) {

                characterIndex++;

                typingElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );


                if (
                    characterIndex >=
                    currentRole.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeRole,
                        pauseAfterTyping
                    );

                    return;
                }


                setTimeout(
                    typeRole,
                    typingSpeed
                );

            } else {

                characterIndex--;

                typingElement.textContent =
                    currentRole.substring(
                        0,
                        characterIndex
                    );


                if (characterIndex <= 0) {

                    deleting = false;

                    roleIndex =
                        (roleIndex + 1) %
                        roles.length;

                    setTimeout(
                        typeRole,
                        pauseAfterDeleting
                    );

                    return;
                }


                setTimeout(
                    typeRole,
                    deletingSpeed
                );
            }

        };


        /*
         * Start after a short delay so the
         * hero section has time to render.
         */

        setTimeout(
            typeRole,
            900
        );

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window &&
        revealElements.length
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );

                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -45px 0px"
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

    }


    /* =====================================================
       STAGGERED CARD REVEALS
    ===================================================== */

    const groupedCards = [
        ".skill-card",
        ".project-card",
        ".flow-step",
        ".contact-item",
        ".security-check",
        ".performance-metric"
    ];


    groupedCards.forEach(
        (selector) => {

            const cards =
                document.querySelectorAll(
                    selector
                );


            cards.forEach(
                (card, index) => {

                    card.style.transitionDelay =
                        `${Math.min(index * 70, 420)}ms`;

                }
            );

        }
    );


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const navLinks =
        document.querySelectorAll(
            ".desktop-nav .nav-link"
        );


    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const updateActiveNavigation =
        () => {

            const scrollPosition =
                window.scrollY +
                window.innerHeight * 0.28;


            let currentSection =
                "home";


            sections.forEach(
                (section) => {

                    const top =
                        section.offsetTop;

                    const bottom =
                        top +
                        section.offsetHeight;


                    if (
                        scrollPosition >= top &&
                        scrollPosition < bottom
                    ) {

                        currentSection =
                            section.id;

                    }

                }
            );


            navLinks.forEach(
                (link) => {

                    const target =
                        link.getAttribute("href");


                    link.classList.toggle(
                        "active",
                        target ===
                        `#${currentSection}`
                    );

                }
            );

        };


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    updateActiveNavigation();


    /* =====================================================
       HEADER SCROLL STATE
    ===================================================== */

    const header =
        document.querySelector(
            ".site-header"
        );


    const updateHeader =
        () => {

            if (!header) return;


            if (window.scrollY > 30) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        };


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();


    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const backToTop =
        document.querySelector(
            ".back-to-top"
        );


    const updateBackToTop =
        () => {

            if (!backToTop) return;


            if (window.scrollY > 700) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        };


    backToTop?.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    window.addEventListener(
        "scroll",
        updateBackToTop,
        {
            passive: true
        }
    );


    updateBackToTop();


    /* =====================================================
       CUSTOM CURSOR
    ===================================================== */

    const cursorDot =
        document.querySelector(
            ".cursor-dot"
        );

    const cursorOutline =
        document.querySelector(
            ".cursor-outline"
        );


    const desktopPointer =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (
        desktopPointer &&
        cursorDot &&
        cursorOutline
    ) {

        let mouseX = 0;
        let mouseY = 0;

        let outlineX = 0;
        let outlineY = 0;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursorDot.style.left =
                    `${mouseX}px`;

                cursorDot.style.top =
                    `${mouseY}px`;

            }
        );


        const animateCursor =
            () => {

                outlineX +=
                    (mouseX - outlineX) *
                    0.15;

                outlineY +=
                    (mouseY - outlineY) *
                    0.15;


                cursorOutline.style.left =
                    `${outlineX}px`;

                cursorOutline.style.top =
                    `${outlineY}px`;


                requestAnimationFrame(
                    animateCursor
                );

            };


        animateCursor();


        const interactiveElements =
            document.querySelectorAll(
                "a, button, .skill-card, .project-card, .flow-step, .contact-item"
            );


        interactiveElements.forEach(
            (element) => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        cursorOutline.classList.add(
                            "cursor-hover"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        cursorOutline.classList.remove(
                            "cursor-hover"
                        );

                    }
                );

            }
        );

    }


    /* =====================================================
       CARD TILT EFFECT
    ===================================================== */

    const tiltCards =
        document.querySelectorAll(
            ".skill-card, .contact-item"
        );


    const enableTilt =
        window.matchMedia(
            "(pointer: fine)"
        ).matches;


    if (enableTilt) {

        tiltCards.forEach(
            (card) => {

                card.addEventListener(
                    "mousemove",
                    (event) => {

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
                            -2.5;


                        const rotateY =
                            ((x - centerX) /
                                centerX) *
                            2.5;


                        card.style.transform =
                            `perspective(900px)
                             rotateX(${rotateX}deg)
                             rotateY(${rotateY}deg)
                             translateY(-6px)`;

                    }
                );


                card.addEventListener(
                    "mouseleave",
                    () => {

                        card.style.transform =
                            "";

                    }
                );

            }
        );

    }


    /* =====================================================
       PROJECT CARD HOVER
    ===================================================== */

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        (card) => {

            card.addEventListener(
                "mouseenter",
                () => {

                    card.style.setProperty(
                        "--project-hover",
                        "1"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.setProperty(
                        "--project-hover",
                        "0"
                    );

                }
            );

        }
    );


    /* =====================================================
       HERO PARALLAX
    ===================================================== */

    const heroVisual =
        document.querySelector(
            ".hero-visual"
        );


    if (
        heroVisual &&
        enableTilt
    ) {

        document.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (event.clientX /
                        window.innerWidth -
                        0.5);

                const y =
                    (event.clientY /
                        window.innerHeight -
                        0.5);


                heroVisual.style.transform =
                    `translate3d(
                        ${x * 7}px,
                        ${y * 7}px,
                        0
                    )`;

            }
        );

    }


    /* =====================================================
       ANIMATED NUMBER COUNTERS
    ===================================================== */

    const counterElements =
        document.querySelectorAll(
            ".performance-metric strong[data-count]"
        );


    if (
        "IntersectionObserver" in window &&
        counterElements.length
    ) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const element =
                                entry.target;


                            const target =
                                Number(
                                    element.dataset.count
                                );


                            if (
                                Number.isNaN(target)
                            ) {
                                return;
                            }


                            let current = 0;

                            const duration =
                                1200;


                            const start =
                                performance.now();


                            const animate =
                                (time) => {

                                    const progress =
                                        Math.min(
                                            (
                                                time -
                                                start
                                            ) /
                                            duration,
                                            1
                                        );


                                    /*
                                     * Smooth ease-out
                                     */

                                    const eased =
                                        1 -
                                        Math.pow(
                                            1 -
                                            progress,
                                            3
                                        );


                                    current =
                                        Math.floor(
                                            target *
                                            eased
                                        );


                                    element.textContent =
                                        current;


                                    if (
                                        progress < 1
                                    ) {

                                        requestAnimationFrame(
                                            animate
                                        );

                                    } else {

                                        element.textContent =
                                            target;

                                    }

                                };


                            requestAnimationFrame(
                                animate
                            );


                            observer.unobserve(
                                element
                            );

                        }
                    );

                },
                {
                    threshold: 0.7
                }
            );


        counterElements.forEach(
            (element) => {

                counterObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       PERFORMANCE CHART ANIMATION
    ===================================================== */

    const chartBars =
        document.querySelectorAll(
            ".chart-bars span"
        );


    chartBars.forEach(
        (bar, index) => {

            const height =
                bar.style.height;


            if (!height) {

                const heights = [
                    "42%",
                    "58%",
                    "51%",
                    "74%",
                    "62%",
                    "83%",
                    "69%",
                    "92%"
                ];


                bar.style.height =
                    heights[
                        index %
                        heights.length
                    ];

            }

        }
    );


    /* =====================================================
       TERMINAL TYPE-IN EFFECT
    ===================================================== */

    const terminalOutputs =
        document.querySelectorAll(
            ".console-output"
        );


    if (
        "IntersectionObserver" in window &&
        terminalOutputs.length
    ) {

        const terminalObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const lines =
                                entry.target
                                    .parentElement
                                    ?.querySelectorAll(
                                        ".console-output"
                                    );


                            lines?.forEach(
                                (line, index) => {

                                    line.style.opacity =
                                        "0";


                                    line.style.transform =
                                        "translateX(-8px)";


                                    setTimeout(
                                        () => {

                                            line.style.transition =
                                                "opacity 350ms ease, transform 350ms ease";

                                            line.style.opacity =
                                                "1";

                                            line.style.transform =
                                                "translateX(0)";

                                        },
                                        180 +
                                        index * 170
                                    );

                                }
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.35
                }
            );


        terminalOutputs.forEach(
            (element) => {

                terminalObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       EXTERNAL LINKS — SECURITY
    ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(
        (link) => {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }
    );


    /* =====================================================
       WINDOW RESIZE CLEANUP
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 1100
            ) {

                closeMobileMenu();

            }

        }
    );


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );


    console.log(
        "%c VEERESH AVANTI — QA ENGINEER ",
        "background:#36f59a;color:#05070b;padding:8px 12px;font-weight:700;border-radius:5px;"
    );

    console.log(
        "%c Quality is not a final step. It is a mindset. ",
        "color:#36f59a;font-weight:600;"
    );

});

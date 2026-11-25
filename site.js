document.addEventListener("DOMContentLoaded", function () {
    var header = document.getElementById("page-header");
    var toggle = document.getElementById("menu-toggle");
    var menu = document.getElementById("mobile-menu");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (header) {
        var onScroll = function () {
            header.classList.toggle("is-scrolled", window.scrollY > 20);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }

    if (toggle && menu) {
        var setOpen = function (isOpen) {
            toggle.classList.toggle("is-open", isOpen);
            menu.classList.toggle("is-open", isOpen);
            toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
            toggle.setAttribute("aria-label", isOpen ? "關閉選單" : "開啟選單");
            menu.setAttribute("aria-hidden", isOpen ? "false" : "true");
        };

        toggle.addEventListener("click", function () {
            setOpen(!menu.classList.contains("is-open"));
        });

        menu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                setOpen(false);
            });
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") setOpen(false);
        });

        document.addEventListener("click", function (event) {
            if (!toggle.contains(event.target) && !menu.contains(event.target)) {
                setOpen(false);
            }
        });

        window.addEventListener("resize", function () {
            if (window.innerWidth > 960) setOpen(false);
        });
    }

    if (!reduceMotion) {
        var targets = document.querySelectorAll(
            ".hero h1, .hero .lede, .hero-actions, .stage, .section-head, " +
                ".feature-card, .plain-card, .arch-card, .link-card, .priority, " +
                ".fact-list li, .page-hero .wrap, .faq-box, .callout"
        );
        var pending = [];
        targets.forEach(function (el) {
            var rect = el.getBoundingClientRect();
            var onScreen = rect.top < window.innerHeight && rect.bottom > 0;
            if (onScreen) return;
            el.classList.add("fade-in");
            pending.push(el);
        });

        if (pending.length && "IntersectionObserver" in window) {
            var observer = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entry) {
                        if (!entry.isIntersecting) return;
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    });
                },
                { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
            );
            pending.forEach(function (el) {
                observer.observe(el);
            });
        } else {
            pending.forEach(function (el) {
                el.classList.add("is-visible");
            });
        }

        var cards = document.querySelectorAll(".feature-card, .plain-card, .arch-card, .link-card, .priority");
        cards.forEach(function (card) {
            card.addEventListener("mousemove", function (event) {
                var rect = card.getBoundingClientRect();
                var x = ((event.clientX - rect.left) / rect.width) * 100;
                var y = ((event.clientY - rect.top) / rect.height) * 100;
                card.style.background =
                    "radial-gradient(circle at " +
                    x.toFixed(1) +
                    "% " +
                    y.toFixed(1) +
                    "%, rgba(242,133,0,0.07), transparent 55%), #ffffff";
            });
            card.addEventListener("mouseleave", function () {
                card.style.background = "";
            });
        });
    }
});

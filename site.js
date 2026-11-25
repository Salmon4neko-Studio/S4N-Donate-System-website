document.addEventListener("DOMContentLoaded", function () {
    var toggleBtn = document.getElementById("mobile-menu-toggle");
    var navLinks = document.getElementById("main-navigation");
    if (!toggleBtn || !navLinks) return;

    function setOpen(isOpen) {
        navLinks.classList.toggle("is-open", isOpen);
        document.body.classList.toggle("nav-open", isOpen);
        toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
        var icon = toggleBtn.querySelector("i");
        if (icon) {
            icon.className = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        }
    }

    toggleBtn.addEventListener("click", function () {
        setOpen(!navLinks.classList.contains("is-open"));
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") setOpen(false);
    });

    navLinks.addEventListener("click", function (event) {
        if (event.target.closest("a")) setOpen(false);
    });
});

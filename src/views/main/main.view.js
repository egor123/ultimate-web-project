var moon;

export function load(element) {
    moon = document.getElementById("moon");
    parallax();
    document.addEventListener("scroll", parallax);
}
export function unload(element) {
    document.removeEventListener("scroll", parallax);
}

function parallax() {
    moon.style.transform = `translateY(${-100 + window.scrollY / 2.5}px)`;
}
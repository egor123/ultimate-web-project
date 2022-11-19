const observer = new IntersectionObserver((elements) => {
    for (const el of elements)
        el.target.classList.toggle("visible", el.isIntersecting);
});

export default function (element) {
    observer.observe(element);
}
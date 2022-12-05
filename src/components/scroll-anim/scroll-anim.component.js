const observer = new IntersectionObserver((elements) => {
    for (const el of elements)
        el.target.classList.toggle("visible", el.isIntersecting);
});

/**
* @param {HTMLElement} element 
**/
export default function (element) {
    observer.observe(element);
}
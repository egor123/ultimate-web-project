var moon;

/**
* @param {HTMLElement} element 
**/
export default function (element) {
   if (moon === undefined)
      window.addEventListener('scroll', parallax);
   moon = element.querySelector("#moon");
   parallax();
}
// Changing offset with different speed, than scrolling
function parallax() {
   moon.style.transform = `translateY(${-100 + window.scrollY / 3}px)`;
}
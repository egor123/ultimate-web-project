import { Locales } from "../../../core/js/locale.js";

const changeStateDelta = 200;

/**
* @param {HTMLElement} element 
**/
export default function (element) {
   var previousScrollY = window.scrollY;
   var offset = 0;

   onscroll = () => {
      var delta = previousScrollY - window.scrollY;
      previousScrollY = window.scrollY;
      offset = (delta * offset) >= 0 ? offset + delta : 0;
      element.classList.toggle("hidden", offset < -changeStateDelta);
   };


   const l_btn = element.querySelector('#loc_btn');
   var locale = Locales.locales.filter(l => l !== Locales.locale)[0];
   l_btn.innerHTML = locale;
   l_btn.addEventListener("click", () => {
      Locales.setLocale(locale).then(() => {
         locale = Locales.locales.filter(l => l !== Locales.locale)[0];
         l_btn.innerHTML = locale;
      });
   });

   const t_btn = element.querySelector('#theme_btn');
   const root = document.querySelector(":root");
   var theme = (root.getAttribute("theme") ?? "dark");
   t_btn.innerHTML = theme === "dark"? "🌙" : "☀️";
   t_btn.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      t_btn.innerHTML = theme === "dark"? "☀️" : "🌙";
      root.setAttribute("theme", theme);
   });
}
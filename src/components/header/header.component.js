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


   const btn = document.getElementById('loc_btn');
   var locale = Locales.locales.filter(l => l !== Locales.locale)[0];
   btn.innerHTML = locale;
   btn.addEventListener("click", () => {
      Locales.setLocale(locale).then(() => {
         locale = Locales.locales.filter(l => l !== Locales.locale)[0];
         btn.innerHTML = locale;
      });
   });
}
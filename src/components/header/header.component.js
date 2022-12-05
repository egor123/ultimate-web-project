import { Locales } from "../../../core/js/locale.js";
import { Router } from "../../../core/js/router.js";

const changeStateDelta = 200;

//Dynamicly changes title in head
function updateTitle(){
   const set = () => document.title = Locales.get("name") + ((Router.view === "main") ? "" :` | ${Locales.get(Router.view+"/id")}`);
   set();
   document.addEventListener("localechange", set);
   window.addEventListener("hashchange", set);
}

//Show and hide header on scroll
function scroll(element){
   var previousScrollY = window.scrollY;
   var offset = 0;

   onscroll = () => {
      var delta = previousScrollY - window.scrollY;
      previousScrollY = window.scrollY;
      offset = (delta * offset) >= 0 ? offset + delta : 0;
      element.classList.toggle("hidden", offset < -changeStateDelta);
   };
}

//Toggle locales on click
function localeButton(button){
   var locale = Locales.locales.filter(l => l !== Locales.locale)[0];
   button.innerHTML = locale;
   button.addEventListener("click", () => {
      Locales.setLocale(locale).then(() => {
         //Change locale to next in arr
         locale = Locales.locales.filter(l => l !== Locales.locale)[0];
         button.innerHTML = locale;
      });
   });
}

//Toggle theme on click
function themeButton(button){
   const root = document.querySelector(":root");
   var theme = (root.getAttribute("theme") ?? "dark");
   button.innerHTML = theme === "dark"? "🌙" : "☀️";
   button.addEventListener("click", () => {
      theme = theme === "dark" ? "light" : "dark";
      button.innerHTML = theme === "dark"? "☀️" : "🌙";
      root.setAttribute("theme", theme);
   });
}

/**
* @param {HTMLElement} element 
**/
export default function (element) {
   updateTitle();
   scroll(element);
   localeButton(element.querySelector('#loc_btn'));
   themeButton(element.querySelector('#theme_btn'));
}
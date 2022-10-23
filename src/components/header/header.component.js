const changeStateDelta = 200;

export default function (element) {
   var previousScrollY = window.scrollY;
   var offset = 0;

   onscroll = () => {
      var delta = previousScrollY - window.scrollY;
      previousScrollY = window.scrollY;
      offset = (delta * offset) >= 0 ? offset + delta : 0;
      element.classList.toggle("hidden", offset < -changeStateDelta);
   };
}
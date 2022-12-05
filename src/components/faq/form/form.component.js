/**
* @param {HTMLElement} element 
**/
export default function(element) {
    // element.querySelector("form").onsubmit = (event) => {
    //     event.preventDefault();
    //  };

    //Set selected class to parent
    [...element.querySelectorAll(".element input")].forEach((el) => {
        el.addEventListener("focus", () => {
            el.parentElement.classList.add("selected");
        });
        el.addEventListener("focusout", () => {
            console.log(el.value);
            if(el.value === "")
            el.parentElement.classList.remove("selected");
        }); 
    });
}
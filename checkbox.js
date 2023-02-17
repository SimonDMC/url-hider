const checkbox = document.querySelector("#checkbox");
const input = document.querySelector("#link");

let checkboxOn = true;

checkbox.addEventListener("click", function () {
    if (checkboxOn) {
        checkboxOn = false;
        checkbox.classList.remove("checkbox-on");
        input.type = "text";
    } else {
        checkboxOn = true;
        checkbox.classList.add("checkbox-on");
        input.type = "password";
    }
});

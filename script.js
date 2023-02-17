// load link from local storage if present
const link = localStorage.getItem("url-hider-link");
if (link) {
    const iframe = document.getElementById("iframe");
    iframe.src = link;
    iframe.style.display = "block";
    document.getElementById("exit").style.display = "block";
    document.querySelector(".controls").style.display = "none";
    document.body.style.background = "none";
}

// go to page on enter key press
document.getElementById("link").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const link = document.getElementById("link");
        if (link.value === "") {
            return;
        }

        // add https:// if not present
        if (link.value.startsWith("http://")) {
            link.value = "https://" + link.value.substring(7);
        } else if (!link.value.startsWith("https://")) {
            link.value = "https://" + link.value;
        }

        // save to local storage
        localStorage.setItem("url-hider-link", link.value);

        // set iframe src
        const iframe = document.getElementById("iframe");
        iframe.src = link.value;
        link.value = "";

        // display
        iframe.style.display = "block";
        document.getElementById("exit").style.display = "block";
        document.querySelector(".controls").style.display = "none";
        document.body.style.background = "none";
    }
});

// exit button press
document.getElementById("exit").addEventListener("click", function () {
    const iframe = document.getElementById("iframe");
    iframe.src = "";
    iframe.style.display = "none";
    document.getElementById("exit").style.display = "none";
    document.querySelector(".controls").style.display = "flex";
    document.body.style.background = "black";

    // clear local storage
    localStorage.removeItem("url-hider-link");
});

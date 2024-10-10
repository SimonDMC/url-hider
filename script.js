const YOUTUBE_PATTERNS = [
    /youtube\.com\/watch\?v=([a-zA-Z0-9-_]{11})/, // https://www.youtube.com/watch?v=vRKBGuCHh8Q
    /youtube\.com\/v\/([a-zA-Z0-9-_]{11})/, // https://www.youtube.com/v/vRKBGuCHh8Q
    /youtube\.com\/watch\/([a-zA-Z0-9-_]{11})/, // https://www.youtube.com/watch/vRKBGuCHh8Q
    /youtube\.com\/shorts\/([a-zA-Z0-9-_]{11})/, // https://www.youtube.com/shorts/vRKBGuCHh8Q
    /youtu\.be\/([a-zA-Z0-9-_]{11})/, // https://youtube.be/vRKBGuCHh8Q
];

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
        openLink();
    }
});

// go to page on search button press
document.getElementById("search").addEventListener("click", function () {
    openLink();
});

function openLink() {
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

    // transform to youtube embed link if a youtube video link
    let id;
    for (const pattern of YOUTUBE_PATTERNS) {
        const match = pattern.exec(link.value);
        if (match) {
            id = match[1];
            break;
        }
    }
    if (id) {
        link.value = "https://youtube.com/embed/" + id;
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

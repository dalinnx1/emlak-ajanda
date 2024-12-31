function includeHTML() {
    const elements = document.querySelectorAll("[data-include]");
    elements.forEach((el) => {
        const file = el.getAttribute("data-include");
        fetch(file)
            .then((response) => response.text())
            .then((data) => {
                el.innerHTML = data;
                el.removeAttribute("data-include");
            });
    });
}

document.addEventListener("DOMContentLoaded", includeHTML);

const images = [
    "../assets/ilanresim.png",
    "../assets/ilanresim.png",
    "../assets/ilanresim.png",
];
let currentIndex = 0;

function renderThumbnails() {
    const thumbnailsContainer = document.getElementById("thumbnailsContainer");
    thumbnailsContainer.innerHTML = "";

    images.forEach((src, index) => {
        const thumbnail = document.createElement("img");
        thumbnail.src = src;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.className = `thumbnail w-100 rounded border border-2 cursor-pointer ${
            index === currentIndex ? "border-warning" : ""
        }`;
        thumbnail.style.cursor = "pointer";
        thumbnail.onclick = () => updateMainImage(index);
        const col = document.createElement("div");
        col.className = "col-4";
        col.appendChild(thumbnail);
        thumbnailsContainer.appendChild(col);
    });
}

function updateMainImage(index) {
    currentIndex = index;
    document.getElementById("mainImage").src = images[currentIndex];
    renderThumbnails();
}

function navigateImage(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length;
    updateMainImage(currentIndex);
}

// Initialize the gallery
document.getElementById("mainImage").src = images[currentIndex];
renderThumbnails();

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

document.addEventListener("DOMContentLoaded", () => {
    includeHTML();

    const images = [
        "../assets/ilanresim.png",
        "../assets/anotherbina.jpg",
        "../assets/baskabina.jpg",
    ];
    let currentIndex = 0;

    function renderThumbnails() {
        const thumbnailsContainer = document.getElementById(
            "thumbnailsContainer"
        );
        thumbnailsContainer.innerHTML = "";

        images.forEach((src, index) => {
            const col = document.createElement("div");
            col.className = "col-4";

            if (index === images.length - 1) {
                const wrapper = document.createElement("div");
                wrapper.style.position = "relative";
                wrapper.className =
                    "thumbnail w-100 rounded border border-2 cursor-pointer";

                const thumbnail = document.createElement("img");
                thumbnail.src = src;
                thumbnail.alt = `Thumbnail ${index + 1}`;
                thumbnail.style.width = "100%";
                thumbnail.style.height = "auto";
                wrapper.appendChild(thumbnail);

                const overlay = document.createElement("div");
                overlay.className = "thumbnail-overlay";
                overlay.textContent = "+8";
                wrapper.appendChild(overlay);

                col.appendChild(wrapper);
            } else {
                const thumbnail = document.createElement("img");
                thumbnail.src = src;
                thumbnail.alt = `Thumbnail ${index + 1}`;
                thumbnail.className = `thumbnail w-100 rounded border border-2 cursor-pointer ${
                    index === currentIndex ? "border-warning" : ""
                }`;
                thumbnail.style.cursor = "pointer";
                thumbnail.onclick = () => updateMainImage(index);
                col.appendChild(thumbnail);
            }

            thumbnailsContainer.appendChild(col);
        });
    }

    function updateMainImage(index) {
        currentIndex = index;
        document.getElementById("mainImage").src = images[currentIndex];
        renderThumbnails();
    }

    function navigateImage(direction) {
        currentIndex =
            (currentIndex + direction + images.length) % images.length;
        updateMainImage(currentIndex);
    }
    document.getElementById("mainImage").src = images[currentIndex];
    renderThumbnails();
    window.navigateImage = navigateImage;
});

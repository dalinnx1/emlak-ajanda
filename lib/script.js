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

function updateMainImage(element) {
    document.querySelectorAll(".thumbnail").forEach((thumb) => {
        thumb.style.border = "none";
    });
    element.style.border = "2px solid #f7e435";
    document.getElementById("mainImage").src = element.src;
}

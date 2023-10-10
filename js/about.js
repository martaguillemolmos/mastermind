let volver = document.getElementById("pantallaAnterior");

volver.addEventListener("click", () => {
    if (window.history.length > 1) {
        window.history.back();
    } else {
        window.location.href = "/index.html";
    }
});

let volver = document.getElementById("pantallaAnterior")
    volver.addEventListener("click", () => {
        console.log("han hecho click")
        window.history.back();
    });

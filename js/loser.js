let nombre = localStorage.getItem('name');
let contenedorNombre = document.getElementById('contenedorNombre');
contenedorNombre.textContent = nombre;

let reset = document.getElementById('botonResetear');
reset.addEventListener("click", () => {
    localStorage.clear();            
});
// let nombre = localStorage.getItem('name');
// nombre.textContent = nombre
// let visualizarNombre = document.
let resetLocal = document.getElementById('botonResetear');
resetLocal.addEventListener("click", () => {
    localStorage.clear();            
});
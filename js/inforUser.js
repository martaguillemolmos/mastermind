const botonEnviar = document.getElementById("botonenviar");
const niveles = document.getElementById("niveles");
const nameInput = document.getElementById("nameUser");
let arrayCajas = [];

botonEnviar.addEventListener("click", (event) => {
  const nombreVacio = nameInput.value == null || nameInput.value == "";
  let expectedNumCajas = 0; 
  switch (localStorage.getItem("intento")) {
    case "10":
      expectedNumCajas = 4;
      break;
    case "8":
      expectedNumCajas = 5;
      break;
    case "6":
      expectedNumCajas = 6;
      break;
    default:
      break;
  }
  const coloresAsignados = todosColoresAsignados(arrayCajas, expectedNumCajas);
  if (nombreVacio) {
    alert("El nombre es obligatorio");
    return;
  } else if (coloresAsignados) {
    alert("Todos las cajas deben contener color, el blanco no está permitido.");
    return;
  } else {
    localStorage.setItem("name", nameInput.value);
    localStorage.setItem("colorespartida", arrayCajas);
    window.location.href = "./mastermind.html";
  }
});
niveles.addEventListener("click", (event) => {
  const contColores = document.getElementById("contenedorCol");
  contColores.style.display = "flex";
  switch (event.target.outerText) {
    case "Fácil":
      localStorage.setItem("intento", 10);
      crearCajaSeleccion(4);
      guardarColorLocalStorage(4);
      break;
    case "Intermedio":
      localStorage.setItem("intento", 8);
      crearCajaSeleccion(5);
      guardarColorLocalStorage(5);
      break;
    case "Difícil":
      localStorage.setItem("intento", 6);
      crearCajaSeleccion(6);
      guardarColorLocalStorage(6);
      break;
    default:
      break;
  }
});
function crearCajaSeleccion(cajas) {
  let boxColors = document.getElementById("boxColors");
  boxColors.textContent = null;

  for (let index = 0; index < cajas; index++) {
    let cajaSeleccion = document.createElement("div");
    cajaSeleccion.className = "cajaSeleccion";
    let caja = document.createElement("div");
    caja.id = `caja${index}`;
    caja.className = "caja";
    let input = document.createElement("input");
    input.type = "color";
    input.id = `colorSeleccionado${index}`;
    input.name = index;
    cajaSeleccion.appendChild(caja);
    cajaSeleccion.appendChild(input);
    boxColors.appendChild(cajaSeleccion);
  }
}
function guardarColorLocalStorage(colores) {
  for (let index = 0; index < colores; index++) {
    const caja = document.getElementById(`caja${index}`);
    const colorSeleccionado = document.getElementById(
      `colorSeleccionado${index}`
    );
    colorSeleccionado.addEventListener("change", () => {
      if (arrayCajas.includes(colorSeleccionado.value)) {
        alert("Este color ya está siendo utilizado");
        return;
      } else if (colorSeleccionado.value === "#ffffff") {
        alert("El color blanco no está permitido");
        return;
      } else {
        caja.style.backgroundColor = colorSeleccionado.value;
        arrayCajas[colorSeleccionado.name] = colorSeleccionado.value;
      }
    });
  }
}
function todosColoresAsignados(arrayColores, expectedNumCajas) {
  let errores = 0;
  for (let index = 0; index < arrayColores.length; index++) {
    if (arrayColores[index] == null || arrayColores[index] == "") {
      errores++;
    }
  }
  if (errores > 0 || arrayColores.length !== expectedNumCajas) {
    return true;
  } else {
    return false;
  }
}

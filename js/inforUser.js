const botonEnviar = document.getElementById("botonenviar");
const niveles = document.getElementById("niveles");
const nameInput = document.getElementById("nameUser");
let arrayCajas = [];

const caja1 = document.getElementById("caja1");
const colorSeleccionado1 = document.getElementById("colorSeleccionado1");
const caja2 = document.getElementById("caja2");
const colorSeleccionado2 = document.getElementById("colorSeleccionado2");
const caja3 = document.getElementById("caja3");
const colorSeleccionado3 = document.getElementById("colorSeleccionado3");
const caja4 = document.getElementById("caja4");
const colorSeleccionado4 = document.getElementById("colorSeleccionado4");

botonEnviar.addEventListener("click", (event) => {
  const nombreVacio = nameInput.value == null || nameInput.value == "";
  console.log("nameInput", nameInput);
  const coloresAsignados = todosColoresAsignados(arrayCajas);
  if (nombreVacio) {
    console.log("Inserte un nombre");
    alert("El nombre es obligatorio");
    return;
  } else if (coloresAsignados) {
    console.log("Inserte todos los colores");
    alert("Todos las cajas deben contener color, el blanco no está permitido");
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
  console.log(event.target.outerText);
  switch (event.target.outerText) {
    case "Fácil":
        localStorage.setItem("intento", 10);
      break;
    case "Intermedio":
        localStorage.setItem("intento", 8);

      break;
    case "Difícil":
        localStorage.setItem("intento", 6);

      break;

    default:
      break;
  }
});

function guardarColorLocalStorage(caja, colorSeleccionado) {
  colorSeleccionado.addEventListener("change", () => {
    console.log(colorSeleccionado);
    if (arrayCajas.includes(colorSeleccionado.value)) {
      alert("Este color ya está siendo utilizado");
      return;
    } else if (colorSeleccionado.value === "#ffffff") {
      alert("El color blanco no está permitido");
      return;
    } else caja.style.backgroundColor = colorSeleccionado.value;
    console.log("el nombre de la caja", colorSeleccionado.name);
    arrayCajas[colorSeleccionado.name] = colorSeleccionado.value;
    console.log(arrayCajas);
  });
}

guardarColorLocalStorage(caja1, colorSeleccionado1);
guardarColorLocalStorage(caja2, colorSeleccionado2);
guardarColorLocalStorage(caja3, colorSeleccionado3);
guardarColorLocalStorage(caja4, colorSeleccionado4);

function todosColoresAsignados(arrayColores) {
  console.log("El array", arrayColores);
  let errores = 0;
  for (let index = 0; index < arrayColores.length; index++) {
    if (arrayColores[index] == null || arrayColores[index] == "") {
      errores++;
    }
  }
  console.log(errores);
  console.log(arrayColores.length);
  if (errores > 0 || arrayColores.length < 4) {
    return true;
  } else {
    return false;
  }
  // Aquí tendría que hacer la lógica para que
}

let patron = [];
let userName = localStorage.getItem("name");
let localColor = localStorage.getItem("colorespartida");
let intentos = localStorage.getItem("intento");
numeroIntentos.textContent = intentos;

document.addEventListener("DOMContentLoaded", function () {
  crearPaleta();
  var coloreselegidos = document.querySelectorAll(".coloreselegidos");
  var contenedores = document.querySelectorAll(".contenedor");
  var selectColor = false;
  var coloresSeleccionados = ["", "", "", ""];
  let numeroIntentos = document.getElementById("numeroIntentos");
  let resetLocal = document.getElementById("botonVolver");

  coloreselegidos.forEach(function (colorDiv) {
    colorDiv.addEventListener("click", function () {
      selectColor = rgbToHex(colorDiv.style.backgroundColor);
    });
  });
  //Función para coger los colores y almacenarlas dentro de la array. Pudiendo modificar el color.
  contenedores.forEach((contenedor) => {
    contenedor.addEventListener("click", () => {
      const id = contenedor.getAttribute("id");
      if (!coloresSeleccionados.includes(selectColor)) {
        contenedor.style.backgroundColor = selectColor;
        coloresSeleccionados[id[id.length - 1]] = selectColor;
      } else {
        alert("Escoge un color diferente");
      }
    });
  });
  //Función para crear elementos dependientes de la selección del usuario
  // div paleta de colores
  function crearPaleta() {
    paleta = localStorage.getItem("colorespartida").split(",");
    let paletaElemento = document.getElementById("paletaColores");
    //crea las cajas según la paleta de colores
    for (let index = 0; index < paleta.length; index++) {
      var newDiv = document.createElement("div");
      newDiv.style.backgroundColor = paleta[index];
      newDiv.className = "coloreselegidos";
      paletaElemento.appendChild(newDiv); //añade texto al div creado.
    }
    crearPatron(paleta);
  }
//Funcion para convertir de rgb a Hex
  function rgbToHex(rgb) {
    var rgbValores = rgb.match(/\d+/g);
    var coloresHex = "#";
    for (let i = 0; i < 3; i++) {
      var valorHex = parseInt(rgbValores[i]).toString(16);
      coloresHex += valorHex.length === 1 ? "0" + valorHex : valorHex;
    }
    return coloresHex;
  }

  // Funcion para desordenar paleta, crear Mastermind
  function crearPatron(paleta) {
    let paletadesordenada = paleta.sort(function () {
      return 0.5 - Math.random();
    });
    patron = paletadesordenada.slice(0, 4);
  }
//Función escucha botón validar
  const boton = document.getElementById("botonValidar");
  boton.addEventListener("click", function () {
    if (coloresSeleccionados.every((color) => color !== "")) {
      comprobar(patron, coloresSeleccionados);
    } else {
      alert("Debes rellenar todos los colores");
    }
  });


  function comprobar(patron, coloresSeleccionados) {
    intentos--;
    let errores = 0;
    if (intentos >= 0) {
      for (let i = 0; i < 4; i++) {
        let check = document.getElementById(`check${i}`);
        if (patron[i] === coloresSeleccionados[i]) {
          check.style.backgroundColor = "black";
        } else if (patron.includes(coloresSeleccionados[i])) {
          errores++;
          check.style.backgroundColor = "white";
        } else {
          errores++;
        }
      }
      if (errores > 0) {
        if (intentos === 0) {
          window.location.href = "../pages/loser.html";
          return;
        }
        numeroIntentos.textContent = intentos;
        visualizarIntento();
        resetIntentos(coloresSeleccionados);
      } else {
        window.location.href = "../pages/win.html";
      }
    }
  }

  function resetIntentos() {
    for (let i = 0; i < 4; i++) {
      let check = document.getElementById(`check${i}`);
      let patron = document.getElementById(`contenedor${i}`);
      check.style.backgroundColor = "";
      patron.style.backgroundColor = "";
    }
    coloresSeleccionados = ["", "", "", ""];
  }
  function visualizarIntento() {
    let contenedor = document.getElementById(`contenedorIntentos`);
    let newDivFallidos = document.createElement("div");
    newDivFallidos.className = "intentosFallidos";
    let intentosCheck = document.createElement("div");
    intentosCheck.className = "checkFallidos";
    let intentosPatron = document.createElement("div");
    intentosPatron.className = "patronFallidos";
    for (let i = 0; i < 4; i++) {
      let check = document.getElementById(`check${i}`);
      let patron = document.getElementById(`contenedor${i}`);
      var newDivCheck = document.createElement("div");
      var newDivPatron = document.createElement("div");
      newDivPatron.style.backgroundColor = patron.style.backgroundColor;
      newDivPatron.className = "contenedor";
      intentosPatron.appendChild(newDivPatron);
      newDivCheck.style.backgroundColor = check.style.backgroundColor;
      newDivCheck.className = "check";
      intentosCheck.appendChild(newDivCheck);
    }
    newDivFallidos.appendChild(intentosPatron);
    newDivFallidos.appendChild(intentosCheck);
    contenedor.appendChild(newDivFallidos);
  }
  resetLocal.addEventListener("click", () => {
    localStorage.clear();
  });
});

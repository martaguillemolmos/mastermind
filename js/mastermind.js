let arrayMaster = ['green', 'yellow', 'red', 'blue'];

let paleta = [];
let localColor = localStorage.getItem('colorespartida');

console.log(localColor.split(','))
document.addEventListener("DOMContentLoaded", function(){
    
    crearPaleta();
    crearMind(paleta);
    var coloreselegidos = document.querySelectorAll(".coloreselegidos");
    var contenedores = [
        document.getElementById("contenedor1"),
        document.getElementById("contenedor2"),
        document.getElementById("contenedor3"),
        document.getElementById("contenedor4")
    ];
    var selectColor = false;
    var coloresSeleccionados = [];
    var indiceArrayContenedor = 0; 

    coloreselegidos.forEach(function(colorDiv){
        console.log("Aquí funciona")
        colorDiv.addEventListener("click", function () {
            console.log("colorDiv", colorDiv.style);
         
            console.log("AAAA", rgbToHex (colorDiv.style.backgroundColor))
            selectColor = rgbToHex (colorDiv.style.backgroundColor);
        });
    });

    contenedores.forEach((contenedor, index) => {
        contenedor.addEventListener("click", () => {
            //Validación si el color no lo has seleccionado 
            if (selectColor !== false && index === indiceArrayContenedor) {
                if(existeColor(selectColor, coloresSeleccionados )){
                    alert("ya existe dicho color en el array, elige otro color");
                    return;
                }
                console.log("Aqui entra",selectColor);
                contenedor.style.backgroundColor = selectColor;
                coloresSeleccionados[indiceArrayContenedor] = selectColor;
                console.log(coloresSeleccionados);
                indiceArrayContenedor++; 

                if (indiceArrayContenedor === contenedores.length) {
                    verificarColores(coloresSeleccionados);
                }
            } else {
                alert('Tienes que seleccionar un color')
            }
        });
    });

    //Función para crear elementos dependientes de la selección del usuario
    // div paleta de colores
    function crearPaleta(){
        paleta = localStorage.getItem('colorespartida').split(',');
        let paletaElemento = document.getElementById('paletaColores');
        //crea las cajas según la paleta de colores
        for (let index = 0; index < paleta.length; index++) {
            var newDiv = document.createElement("div");
            newDiv.style.backgroundColor = paleta[index];
            newDiv.className = "coloreselegidos";
            paletaElemento.appendChild(newDiv); //añade texto al div creado.
        }
       
        console.log(paletaElemento)
    }

    // Función que valida si existe el color en el Array
    function existeColor (color, array){
        return array.includes(color);
    }

    function rgbToHex(rgb) {
        var rgbValores= rgb.match (/\d+/g);
        var coloresHex ="#";
        for (let i = 0; i <3; i++) {
            var valorHex= parseInt(rgbValores[i]).toString(16);
            coloresHex += valorHex.length === 1 ? "0" + valorHex : valorHex;
        }
        return coloresHex
    }
    // Funcion para desordenar paleta, crear Mastermind
    
    function crearMind(paleta) {
        let patron = paleta.sort(function() {
            return 0.5 - Math.random()
        
        })
        localStorage.setItem('menteMaster', patron);
        console.log(patron)
    }
});





let patron = [];
let userName = localStorage.getItem('name');
console.log(userName);
let localColor = localStorage.getItem('colorespartida');
let intentos = 2;


console.log(localColor.split(','))
document.addEventListener("DOMContentLoaded", function(){

    crearPaleta();

    var coloreselegidos = document.querySelectorAll(".coloreselegidos");
    var contenedores = [
        document.getElementById("contenedor0"),
        document.getElementById("contenedor1"),
        document.getElementById("contenedor2"),
        document.getElementById("contenedor3")
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
        crearPatron(paleta);
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
    function crearPatron(paleta) {
    let paletadesordenada = paleta.sort(function() {
            return 0.5 - Math.random()
        
    })
    patron = paletadesordenada;
    console.log("este es el patron", patron);
}
    
    const boton = document.getElementById('botonValidar');

    boton.addEventListener("click", function () {
        if (coloresSeleccionados.length === 4){
            comprobar(patron , coloresSeleccionados)
        } else{
            alert("Debes rellenar todos los colores")
        }

    });

  
    function comprobar(patron, coloresSeleccionados) {
        console.log(patron)
        console.log(coloresSeleccionados);
        intentos--;
        let errores = 0;
        if(intentos >= 0){
            for (let i = 0; i < 4; i++) {
                let check = document.getElementById(`check${i}`)
                if (patron[i] === coloresSeleccionados[i]) {
                    check.style.backgroundColor = 'black';
                    console.log("este es", patron);
                    console.log("este es", coloresSeleccionados);
                } else {
                    errores++;
                    check.style.backgroundColor = 'blue';
                }
            } 
            if( errores > 0){
                if(intentos === 0){
                    //Has perdido la partida
                }
                //Borrar los elementos contenedores
                    visualizarIntento();
                    resetIntentos(coloresSeleccionados)
                // alert(`Has perdido un intento, te quedan ${intentos}` );
            } else {
                // alert("Has ganado");
            }
        } 

        console.log(intentos)

       
    }

    function resetIntentos() {
        for (let i = 0; i < 4; i++) {
            let check = document.getElementById(`check${i}`)
            let patron = document.getElementById(`contenedor${i}`)
            check.style.backgroundColor = '';
            patron.style.backgroundColor = '';
        } 
        indiceArrayContenedor = 0
        coloresSeleccionados =[]
        console.log(coloresSeleccionados)
    }

    function visualizarIntento() {
        let contenedor = document.getElementById(`contenedorIntentos`);

        let newDivFallidos = document.createElement("div");
        newDivFallidos.id = "intentosFallidos";
        let intentosCheck = document.createElement("div");
        let intentosPatron = document.createElement("div");
        // let intentosCheck = document.getElementById('intentosCheck');
        // let intentosPatron = document.getElementById('intentosPatron');
        newDivFallidos.id = "intentosFallidos"
        for (let i = 0; i < 4; i++) {
            let check = document.getElementById(`check${i}`);
            let patron = document.getElementById(`contenedor${i}`);
            var newDivCheck = document.createElement("div");
            var newDivPatron = document.createElement("div");
            newDivCheck.style.backgroundColor = check.style.backgroundColor;
            newDivCheck.className = "contenedor";
            intentosCheck.appendChild(newDivCheck); 
            newDivPatron.style.backgroundColor = patron.style.backgroundColor;
            newDivPatron.className = "contenedor";
            intentosPatron.appendChild(newDivPatron); 
            console.log(check.style.backgroundColor);
        } 
        newDivFallidos.appendChild(intentosPatron);
        newDivFallidos.appendChild(intentosCheck);

        contenedor.appendChild(newDivFallidos);

    }

    
});






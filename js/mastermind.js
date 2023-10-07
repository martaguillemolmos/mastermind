let patron = [];
let userName = localStorage.getItem('name');
console.log(userName);
let localColor = localStorage.getItem('colorespartida');
let intentos = localStorage.getItem('intento');
numeroIntentos.textContent = intentos


console.log(localColor.split(','))
document.addEventListener("DOMContentLoaded", function(){

    crearPaleta();
    var coloreselegidos = document.querySelectorAll(".coloreselegidos");
 
    var contenedores = document.querySelectorAll(".contenedor");
    console.log(contenedores)
    var selectColor = false;
    var coloresSeleccionados = ['', '', '', ''];
    let numeroIntentos = document.getElementById('numeroIntentos');


    coloreselegidos.forEach(function(colorDiv){
        console.log("Aquí funciona")
        colorDiv.addEventListener("click", function () {
            console.log("colorDiv", colorDiv.style);
         
            console.log("AAAA", rgbToHex (colorDiv.style.backgroundColor))
            selectColor = rgbToHex (colorDiv.style.backgroundColor);
        });
    });


//Función para coger los colores y almacenarlas dentro de la array. Pudiendo modificar el color.
    contenedores.forEach((contenedor) => {
        contenedor.addEventListener("click", () => {
            const id= contenedor.getAttribute('id')  
                console.log(coloresSeleccionados);
                contenedor.style.backgroundColor = selectColor
                coloresSeleccionados[id[id.length -1]] = selectColor;
                console.log(coloresSeleccionados)
                           
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
    patron = paletadesordenada.slice(0,4);
    console.log("este es el patron recortador", patron);
}
    
    const boton = document.getElementById('botonValidar');
    boton.addEventListener("click", function () {
        if (coloresSeleccionados.every(color => color !== '')) {
            comprobar(patron, coloresSeleccionados);
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
                    window.location.href = "../pages/loser.html"
                }
                //Borrar los elementos contenedores
                    numeroIntentos.textContent = intentos
                    visualizarIntento();
                    resetIntentos(coloresSeleccionados)
                    cambioImagen();
                // alert(`Has perdido un intento, te quedan ${intentos}` );
            } else {
                window.location.href = "../pages/win.html"
            }
        } 
        console.log(intentos)

    }
    
    function cambioImagen () {
        var imgElement = document.getElementById('animo');
        var mitadIntento = localStorage.getItem ('intento') / 2;
        
        if (intentos >= mitadIntento){
            imgElement.src = 'alto.png';
        } else {
            imgElement.src ='bajo.png';
        }  
    }     

    function resetIntentos() {
        for (let i = 0; i < 4; i++) {
            let check = document.getElementById(`check${i}`)
            let patron = document.getElementById(`contenedor${i}`)
            check.style.backgroundColor = '';
            patron.style.backgroundColor = '';
        } 
        coloresSeleccionados = ['', '', '', ''];
        console.log(coloresSeleccionados)
    }

    function visualizarIntento() {
        let contenedor = document.getElementById(`contenedorIntentos`);

        let newDivFallidos = document.createElement("div");
        newDivFallidos.id = "intentosFallidos";
        let intentosCheck = document.createElement("div");
        let intentosPatron = document.createElement("div");
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
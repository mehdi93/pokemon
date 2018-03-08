// audio

 var audioclick = document.getElementById("audioclick");
 var audiogameover = document.getElementById("audiogameover");
 var audiowinner = document.getElementById("audiowinner");
 



//Reloj cuenta atrás

var segundos = 240;
var segCon = 0;
var mensaje = "";
var centesimas = 0;

// Reloj cuenta atrás

function reloj(){
    var s = parseInt( segundos % 60 );
    var ss = ("0" + s ).slice(-2);//.slice(-2) para que no se ponga cero delante
    var m = parseInt( segundos / 60);
    var mm = ("0" + m ).slice(-2);
    document.getElementById("reloj").innerHTML = mm + ":" + ss;
    if ( segundos > 0){
         t = setTimeout(function(){
            reloj(); //Recursividad
        },1000);
        
        document.getElementById("game-over").style.display = "none";
    
       
    } else {
        perdedor.classList.add("open");
        document.getElementById("game-over").style.display = "initial";
        document.getElementById("boton").disabled = false;
        audiogameover.currentTime = 0;
        audiogameover.play();
      
        
        segundos = 6;
    }
    segundos--;

   
};



const arrayPersonajes = [
    {
        nombre:"2",
        rutaImagen: "img/2.png"
    },
    {
        nombre:"3",
        rutaImagen: "img/3.png"
    },
    {
        nombre:"4",
        rutaImagen: "img/4.png"
    },
    {
        nombre:"5",
        rutaImagen: "img/5.png"
    },
    {
        nombre:"6",
        rutaImagen: "img/6.png"
    },
    {
        nombre:"7",
        rutaImagen: "img/7.png"
    },
    {
        nombre:"8",
        rutaImagen: "img/8.png"
    },
    {
        nombre:"9",
        rutaImagen: "img/9.png"
    },
    {
        nombre:"10",
        rutaImagen: "img/10.png"
    },
    {
        nombre:"11",
        rutaImagen: "img/11.png"
    },
    {
        nombre:"12",
        rutaImagen: "img/12.png"
    },
    {
        nombre:"13",
        rutaImagen: "img/13.png"
    }
]



const game = document.getElementById("game");
const rejilla = document.createElement("section");
const ganador = document.getElementById("ganador");
const perdedor = document.getElementById("perdedor");


const doblePersonajes = arrayPersonajes.concat(arrayPersonajes).sort(()=> 0.5 - Math.random());/*para ordenar y desordenar los elementos*/

var contador = 0;
var primerSeleccionado = "";
var segundoSeleccionado = "";
var selPrevio = null;



    

rejilla.setAttribute("class", "rejilla");
game.appendChild(rejilla);

doblePersonajes.forEach(personaje => { /* flecha(=>) igual que: (function(){})*/
    const {nombre, rutaImagen} = personaje;
    tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.dataset.name = nombre;
    
    anverso = document.createElement("div");
    anverso.classList.add("anverso");
   
    reverso = document.createElement("div");
    reverso.classList.add("reverso");

    reverso.style.backgroundImage = `url(${rutaImagen})`;

    rejilla.appendChild(tarjeta);
    tarjeta.appendChild(anverso);
    tarjeta.appendChild(reverso);
    
    
   
});


rejilla.addEventListener("click", function(evento){
    var seleccionado = evento.target;
    

    if (seleccionado.nodeName === "SECTION" || seleccionado.parentNode === selPrevio ||
    seleccionado.parentNode.classList.contains("eliminado")){
        return;
    }
    if(contador < 2){
        contador++;
        if(contador === 1){
            primerSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
        } else {
            segundoSeleccionado = seleccionado.parentNode.dataset.name;
            seleccionado.parentNode.classList.add("seleccionado");
        }
        if (primerSeleccionado !== "" && segundoSeleccionado !== ""){
            if(primerSeleccionado === segundoSeleccionado){
                setTimeout(eliminar,1200);
                setTimeout(resetSelec,1200);
                contEliminados();
            }else{
                setTimeout(resetSelec,1200);
            }
        }
        selPrevio = seleccionado.parentNode;
            
    }  
    audioclick.currentTime = 0;
    audioclick.play();
});

var eliminar = function (){
    var eliminados = document.querySelectorAll(".seleccionado");
    eliminados.forEach(eliminado => {
        eliminado.classList.add("eliminado");

    });
}
var resetSelec = function (){
    primerSeleccionado = "";
    segundoSeleccionado = "";
    contador = 0;

     var seleccionados = document.querySelectorAll(".seleccionado");
     seleccionados.forEach(seleccionado => {
         seleccionado.classList.remove("seleccionado");
     });
}
var contEliminados = function (){
    var eliminados = document.querySelectorAll(".eliminado").length + 2;/*length para contar numero de elementos*/
    if(eliminados === 24){
    ganador.classList.add("open");
    audiowinner.currentTime = 0;
    audiowinner.play();
    pause();
    }
}

function pause(){
    clearTimeout(t);
}


// while (rejilla.firstChild){
//     rejilla.removeChild(rejilla.firstChild);
// }

// A introducir todo el bloque de código de creación de los elemntos tarjeta en una función

// Stop en audio

// objeto.pause();
// objeto.currentTime= 0;
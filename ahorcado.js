/*
    JavaScript code of the Hangman Game.
    Made by Felipe Sandoval for 3D Graphics asignature.
*/

// Libreria que usare para escoger una palabra al azar
var mywords = ["multimedia", "graficos", "ingenieria", "pereza", "estilo", "ordenador", "portatil",
               "camiseta", "asignacion", "zanahoria", "suricata", "complejo", "publico", "ganador",
               "modernidad", "murcielago", "punteria", "unanimidad", "anonimato", "delfin",
               "california", "contenido", "oficina", "encriptar", "protocolo", "acustico",
               "informe", "pizzeria", "federacion", "parlamento", "alemania", "alcohol",
               "bucanero", "onomatopeya", "anaranjado", "cuenca", "motocicleta"];

var letra_usuario, errores, visualizar, random_word, inicializado, imagen, aciertos, usadas, repetida;

inicializado = false;
repetida = false;
usadas = [];

//repite el proceso de estilizar los "_ " por la longitud de la palabra
var visualizar = function repeat(str, times) {
    return new Array(times + 1).join(str);
}

// es un reset del programa sin necesidad de tener que hacer refresh a la página
function start() {
    random_word = mywords[Math.floor(Math.random() * mywords.length)];
    document.getElementById("adivina").innerHTML = visualizar("_ ", random_word.length);
    inicializado = true;
    imagen = document.getElementById("vidas");
    imagen.src = "ahorcado_1.png";
    errores = 0;
    aciertos = 0;
    repetida = false;
    usadas = [];
}

// para remplazar la letra por el o los "_ "
function replace_to(pos, letra) {
    var a_remplazar = document.getElementById("adivina").innerHTML.split(" ").join("");
    a_remplazar = a_remplazar.substring(0, pos) + letra + a_remplazar.substring(pos + 1);
    a_remplazar = a_remplazar.split("").join(" ");
    document.getElementById("adivina").innerHTML = a_remplazar;
}

// para saber si contine una letra y saber su index "_ "
function letter_in_string(letra, palabra) {
    if (palabra.indexOf(letra) > -1 && errores !== 7) {
        var i;
        for (i = 0; i < palabra.length; i++) {
            var posicion = palabra[i], replace_count = 0;
            if (posicion === letra) {
                replace_count = replace_count + 1;
                replace_to(i, letra);
                aciertos = ++aciertos;
            }
        }
    } else if (errores !== 7) {
        errores = errores + 1;
    }
}

// evita que se acepten dos letras iguales y cuenten como error o acierto
function CheckNoRepeat(letra) {
    if (usadas.indexOf(letra) > -1) {
        repetida = true;
        console.log("Deberias escribir otra letra... ya esa la has escrito y me rehuso a continuar.");
    } else {
        usadas.push(letra);
        repetida = false;
        console.log("Las letras que has usado son: " + usadas.join(","));
    }
}

// probamos la letra que introduce el usuario y la cadena de eventos que ello conlleva
function doTry() {
    if (inicializado) {
        letra_usuario = document.getElementById("demo").value.toLowerCase();
        if (letra_usuario === "") {
            letra_usuario = "!";
        }
        CheckNoRepeat(letra_usuario);
        if (!repetida) {
            letter_in_string(letra_usuario, random_word);
        }
        imagen = document.getElementById("vidas");
        if (aciertos === random_word.length) {
            alert("YOU WIN!!! Enhorabuena. Quizás la próxima vez no tengas tanta suerte...");
            start();
        } else if (errores === 1) {
            imagen.src = "ahorcado_2.png";
            console.log("Tendremos piedad de ti y cuándo te reste una oportunidad te diré la respuesta.");
        } else if (errores === 2) {
            imagen.src = "ahorcado_3.png";
        } else if (errores === 3) {
            imagen.src = "ahorcado_4.png";
        } else if (errores === 4) {
            imagen.src = "ahorcado_5.png";
        } else if (errores === 5) {
            imagen.src = "ahorcado_6.png";
        } else if (errores === 6) {
            imagen.src = "ahorcado_7.png";
            console.log("La palabra que buscas es: [" + random_word + "]");
        } else if (errores === 7) {
            imagen.src = "ahorcado_8.png";
            alert("Vaya, vaya... parece que has perdido. La palabra correcta era " + random_word  + "\nDebes presionar el botón de \"JUEGA\" para poder empezar una nueva  partida.");
        }
    } else {
        alert("Debes presionar el botón de \"JUEGA\" para poder empezar tu partida."); 
    }
    document.getElementById("demo").value = ""; //para borrar la letra del usuario en el input
}
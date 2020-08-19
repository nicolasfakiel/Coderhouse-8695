/*
var saludo = "Hola Coders!";
var numero = 5;
var numero2 = 15;
instituto = "Coderhouse";

console.log("Alta camada wacho");
console.info("informacion");
console.warn("peligro");
console.error("error");

alert("alerta alerta")
*/

var nombre = prompt("Hola! Cómo te llamás?");

console.log("Hola " + nombre);

var edad = prompt("Y cuántos años tenés?");

edad = parseInt(edad);

//edadNueva = parseInt(edad) + 1;
//console.info(nombre + ", te cuento que el año que viene vas a tener " + edadNueva + " años");

console.info(nombre + ", te cuento que el año que viene vas a tener " + (edad + 1) + " años");
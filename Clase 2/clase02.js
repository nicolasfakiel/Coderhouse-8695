
var num = parseInt(prompt("Hola! Ingresá un número, por favor."));

if (num >= 10 && num <= 50 && num%2 == 0) {

    console.log("El número está entre 10 y 50 y es par.")
} 

else if (num >= 10 && num <= 50 && num%2 != 0) {
    console.log("El número está entre 10 y 50 y es impar.")
}

else if (num < 10 && num%2 == 0){
    console.log("El número es menor a 10 y es par.")
}

else if (num < 10 && num%2 != 0){
    console.log("El número es menor a 10 y es impar.")
}

else if (num > 50 && num%2 == 0){
    console.log("El númerp es mayor a 50 y es par.")
}

else {
    console.log("El número es mayor a 50 y es impar.")
}
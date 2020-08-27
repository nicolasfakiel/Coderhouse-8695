function sumar(){   
    /* 
    var r;
    var n1 = prompt("Ingresa un número");
    var n2 = prompt("Ingresa otro número");

    n1 = pa(rseInt(n1);
    n2 = parseInt(n2);

    r = n1 + n2;

    console.log("Resultado: " + r);
    */

    var n1 = parseInt(prompt("Ingrese un número"))
    var n2 = parseInt(prompt("Ingrese otro número"))

    console.log("Resultado: " + (n1 + n2));

}

    var dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Vierneshhh', 'Sabaduki', 'Dominguiti', 'Osvaldo'];

function recorrerDias(){

    for (var i = 0; i < dias.length; i++ ){

        // debugger;
        
        if (i == 7) {
            alert("El día " + dias[i] + " no existe")
        }

        if (i % 2 == 0) {
            console.log(dias[i] + " es un día par");
        }

    }

}
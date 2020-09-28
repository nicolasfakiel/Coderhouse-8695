/*MÉDICOS
Los médicos son uno de los principales objetos del proyecto.
Tienen propiedades estátcas como nombre y lugares de atención y otras dinámicas que son las recomendaciones
y puntajes que les dan los pacientes que fueron atendidos por ellos*/

// Listado de doctores
var doctores = []

// Fx para agregar un doctor al listado de doctores
function agregarDoctorADoctores(doctor) {
  doctores.push(doctor)
}

// Consctructor de doctores
function nuevoDoctor(nombre, lugarDeAtencion1, lugarDeAtencion2, lugarDeAtencion3) {
  this.nombre = nombre,
  this.lugaresDeAtencion = [lugarDeAtencion1, lugarDeAtencion2, lugarDeAtencion3] // Listado de lugares donde atiende
  this.recomiendan = 20, // Cantidad de pacientes que pusieron que recomiendan al médico
  this.noRecomiendan = 10, // Cantidad de pacientes que pusieron que no recomiendan al médico
  this.puntajesPuntualidad = [], // Listado de puntajes que pacientes ponen a la puntualidad dél médico en sus visitas
  this.promedioPuntualidad = 1, // Promedio de los puntajes de puntualidad
  this.puntajesAmbiente = [],
  this.promedioAmbiente = 2,
  this.puntajesTrato = [],
  this.promedioTrato = 3,
  this.puntajesResultado = [],
  this.promedioResultado = 4,
  this.puntajesTotal = [], // Array que concatena todos los puntajes
  this.promedioTotal = 0,  // Promedio de todos los puntajes que recibió el médico, a modo de puntaje general

  agregarDoctorADoctores(this)

  // this.agregarDoctorADoctores = function () {
  //   doctores.push()
    
  // }
}

// Doctores de ejemplo
var doctor1 = new nuevoDoctor("Dr. Lucas Gonzalez", "Clínica 1", "Consultorio privado XX", "Hospital 1")
var doctor2 = new nuevoDoctor("Dra. Irma Perez", "Clínica 2", "Consultorio privado YY", "Hospital 2")
var doctor3 = new nuevoDoctor("Dra. José Pekermann", "Clínica 2", "Consultorio privado YY", "Hospital 2")


/*PACIENTES
Los pacientes son la contracara de los médicos. Sus propiedades son datos básicos de la persona atendida*/

var paciente1 = {
  nombre: "Martín Gomez",
  edad: 25,
}

var paciente2 = {
  nombre: "Julia Algo",
  edad: 33,
}

/*VISITAS
Las visitas son los objetos que unen un médico con un paciente.
Tienen un lugar, una fecha, un médico, un paciente y todos los puntajes que el paciente le pone al médico.
Las visitar cuentan con constructor porque es lo que el usuario ingresa en la plataforma*/

var visita1 = {
  fecha: new Date(2020,08,25),
  lugar: doctor1.lugaresDeAtencion[1],
  doctor: doctor1,
  paciente: paciente1,
  puntajePuntualidad: 4,
  PuntajeAmbiente: 2,
  PuntajeTrato: 4,
  PuntajeResultado:5,
  recomienda: true,
}

var visita2 = {
  fecha: new Date(2020,09,22),
  lugar: doctor2.lugaresDeAtencion[0],
  doctor: doctor2,
  paciente: paciente2,
  puntajePuntualidad: 5,
  PuntajeAmbiente: 1,
  PuntajeTrato: 3,
  PuntajeResultado:2,
  recomienda: false,
} 

/* Funciones */

/* Constructora de visita: crea una nueva visita, asigna los pts al médico y calcula los promedios*/
function nuevaVisita(fecha, lugar, doctor, paciente, puntualidad, ambiente, trato, resultado, recomienda) {
  this.fecha = new Date(fecha),
  this.lugar = lugar,
  this.doctor = doctor,
  this.paciente = paciente,
  this.puntajePuntualidad = puntualidad,
  this.puntajesAmbiente = ambiente,
  this.puntajesTrato = trato,
  this.puntajesResultado = resultado;
  switch (recomienda) {
    case 1:
      this.recomienda = true;
      break;
  
    case 0:
      this.recomienda = false;
  }
  
  doctor.puntajesPuntualidad.push(puntualidad)
  doctor.puntajesAmbiente.push(ambiente)
  doctor.puntajesTrato.push(trato)
  doctor.puntajesResultado.push(resultado)
  switch (recomienda) {
    case 1:
      doctor.recomiendan += 1;
      break;
    case 0:
      doctor.noRecomiendan += 1;
  }
  
  promediar(doctor)
}

/* Para sacar el promedio de puntajes de un médico */
function promediar(doctor) {
  var acum = 0;
  for (let i = 0; i < doctor.puntajesPuntualidad.length; i++) {
    acum += doctor.puntajesPuntualidad[i];    
  }
  doctor.promedioPuntualidad = acum / doctor.puntajesPuntualidad.length   

  var acum = 0;
  for (let i = 0; i < doctor.puntajesAmbiente.length; i++) {
    acum += doctor.puntajesAmbiente[i];    
  }
  doctor.promedioAmbiente = acum / doctor.puntajesAmbiente.length
  
  var acum = 0;
  for (let i = 0; i < doctor.puntajesTrato.length; i++) {
    acum += doctor.puntajesTrato[i];    
  }
  doctor.promedioTrato = acum / doctor.puntajesTrato.length

  var acum = 0;
  for (let i = 0; i < doctor.puntajesResultado.length; i++) {
    acum += doctor.puntajesResultado[i];    
  }
  doctor.promedioResultado = acum / doctor.puntajesResultado.length;

  doctor.puntajesTotal = [...doctor.puntajesPuntualidad, ...doctor.puntajesAmbiente, ...doctor.puntajesTrato, ...doctor.puntajesResultado]
  var acum = 0;
  for (let i = 0; i < doctor.puntajesTotal.length; i++) {
    acum += doctor.puntajesTotal[i];    
  }
  doctor.promedioTotal = acum / doctor.puntajesTotal.length;
}

//Para mostrar los puntajes promediios actuales de un médico, para la sección Buscar.
// function verPuntajes(doctor) {
//   console.log(doctor.promedioPuntualidad)
//   console.log(doctor.promedioAmbiente)
//   console.log(doctor.promedioTrato)
//   console.log(doctor.promedioResultado)
// }

// Autocompletar con elementos de array
document.addEventListener('DOMContentLoaded', function() {
  function getWords(){
    var options = {}
    doctores.forEach(element => {
      options[element.nombre] = null
    })
    return options
  }
  var elems = document.querySelectorAll('.autocomplete');
  var instances = M.Autocomplete.init(elems, {data: getWords()});
})

// Datepicker
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {autoClose: true});
});



// Select lugares de atención
  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, cargarLugaresDeAtencion());
  });

function cargarLugaresDeAtencion() {
  
  doctor1.lugaresDeAtencion.forEach(element => {
    
    let select = document.querySelector('#seleccionLugar')
    nuevaOpcion = document.createElement('option')

    nuevaOpcion.setAttribute('value', doctor1.lugaresDeAtencion.indexOf(element)+1)
    nuevaOpcion.textContent = element

    select.appendChild(nuevaOpcion)

  });
}







document.addEventListener('DOMContentLoaded', function() {

// Agregar evento al botón del paso 1
  const botonPaso1 = document.querySelector('#botonPaso1')

  botonPaso1.addEventListener('click', function() {

    var doctorElegido = document.querySelector("#autocomplete-input").value

    if (doctorElegido ===''){
      console.log("campo nombre de medico vacio")
    }

    else {
      guardarSessionStorage("nombre", doctorElegido)
      document.querySelector('#paso1').style.display='none'    
      setTimeout(() => {
        document.querySelector('#paso2').style.display='block'  
      }, 500)

    }
  })

// Agregar evento al botón del paso 2
  const botonPaso2 = document.querySelector('#botonPaso2')

  botonPaso2.addEventListener('click', function() {

    var fechaElegida = document.querySelector(".datepicker").value

    if (fechaElegida ===''){
      console.log("campo fecha vacia")
    }

    else {
      guardarSessionStorage("fecha", fechaElegida)
      document.querySelector('#paso2').style.display='none'
      document.querySelector('#paso3').style.display='block'
    }
  })

// Agregar evento al botón del paso 3
  const botonPaso3 = document.querySelector('#botonPaso3')

  botonPaso3.addEventListener('click', function() {

    var lugarElegido = document.querySelector("#seleccionLugar").value

    if (lugarElegido ===''){
      console.log("campo lugar vacio")
    }

    else {
      guardarSessionStorage("lugar", lugarElegido)
      document.querySelector('#paso3').style.display='none'
      document.querySelector('#paso4').style.display='block'
    }
  })

// Agregar evento al botón del paso 4
  const botonPaso4 = document.querySelector('#botonPaso4')

  botonPaso4.addEventListener('click', function() {

    var puntualidadElegida = document.querySelector('#puntualidad span').textContent

    if (puntualidadElegida ===''){
      console.log("campo puntualidad vacia")
    }

    else {
      guardarSessionStorage("puntualidad", puntualidadElegida)
      document.querySelector('#paso4').style.display='none'
      setTimeout(() => {
        document.querySelector('#paso5').style.display='block'  
      }, 500)    }
  })

  // Agregar evento al botón del paso 5
  const botonPaso5 = document.querySelector('#botonPaso5')

  botonPaso5.addEventListener('click', function() {

    var tratoElegido = document.querySelector('#trato span').textContent

    if (tratoElegido ===''){
      console.log("campo puntualidad vacia")
    }

    else {
      guardarSessionStorage("trato", tratoElegido)
      document.querySelector('#paso5').style.display='none'
      document.querySelector('#paso6').style.display='block'
    }
  })

// Agregar evento al botón del paso 6
  const botonPaso6 = document.querySelector('#botonPaso6')

  botonPaso6.addEventListener('click', function() {

    var ambienteElegido = document.querySelector('#ambiente span').textContent

    if (ambienteElegido ===''){
      console.log("campo ambiente vacio")
    }

    else {
      guardarSessionStorage("ambiente", ambienteElegido)
      document.querySelector('#paso6').style.display='none'
      document.querySelector('#paso7').style.display='block'
    }
  })

// Agregar evento al botón del paso 7
  const botonPaso7 = document.querySelector('#botonPaso7')

  botonPaso7.addEventListener('click', function() {

    var resultadoElegido = document.querySelector('#resultado span').textContent

    if (resultadoElegido ===''){
      console.log("campo resultado vacio")
    }

    else {
      guardarSessionStorage("resultado", resultadoElegido)
      document.querySelector('#paso7').style.display='none'
      document.querySelector('#paso8').style.display='block'
    }
  })

// Agregar evento al botón del paso 8
  const botonPaso8 = document.querySelector('#botonPaso8')

  botonPaso8.addEventListener('click', function() {

    var recomendacionElegida = document.querySelector('#seleccionRecomienda').value

    if (recomendacionElegida ===''){
      console.log("campo recomendacion vacia")
    }

    else {
      guardarSessionStorage("recomendacion", recomendacionElegida)
      document.querySelector('#paso8').style.display='none'
      document.querySelector('#paso9').style.display='block'
    }
  })

// Agregar evento al botón del paso 9
  const botonPaso9 = document.querySelector('#botonPaso9')

  botonPaso9.addEventListener('click', function() {

    var comentarioElegido = document.querySelector('#textarea').value

    if (comentarioElegido ===''){
      console.log("campo comentario vacio")
    }

    else {
      guardarSessionStorage("comentario", comentarioElegido)
      document.querySelector('#paso9').style.display='none'
      document.querySelector('#paso10').style.display='block'
      llenarDatosPaso10()
    }
  })

function llenarDatosPaso10() {

  var nombre = document.createElement('span')
  var dia = document.createElement('span')
  var lugar = document.createElement('span')
  var puntualidad = document.createElement('span')
  var trato = document.createElement('span')
  var ambiente = document.createElement('span')
  var resultado = document.createElement('span')
  var recomendacion = document.createElement('span')
  var comentario = document.createElement('span')

  var traerNombre = JSON.parse(sessionStorage.getItem('nombre'))
  var traerDia = JSON.parse(sessionStorage.getItem('fecha'))
  var traerLugar = JSON.parse(sessionStorage.getItem('lugar'))
  var traerPuntualidad = JSON.parse(sessionStorage.getItem('puntualidad'))
  var traerTrato = JSON.parse(sessionStorage.getItem('trato'))
  var traerAmbiente = JSON.parse(sessionStorage.getItem('ambiente'))
  var traerResultado = JSON.parse(sessionStorage.getItem('resultado'))
  var traerRecomendacion = JSON.parse(sessionStorage.getItem('recomendacion'))
  var traerComentario = JSON.parse(sessionStorage.getItem('comentario'))
  
  nombre.textContent = traerNombre
  dia.textContent = traerDia
  lugar.textContent = traerLugar
  puntualidad.textContent = traerPuntualidad
  trato.textContent = traerTrato
  ambiente.textContent = traerAmbiente
  resultado.textContent = traerResultado
  recomendacion.textContent = traerRecomendacion
  comentario.textContent = traerComentario

  document.querySelector('#verNombre').appendChild(nombre)
  document.querySelector('#verDia').appendChild(dia)
  document.querySelector('#verLugar').appendChild(lugar)
  document.querySelector('#verPuntualidad').appendChild(puntualidad)
  document.querySelector('#verTrato').appendChild(trato)
  document.querySelector('#verAmbiente').appendChild(ambiente)
  document.querySelector('#verResultado').appendChild(resultado)
  document.querySelector('#verRecomendacion').appendChild(recomendacion)
  document.querySelector('#verComentario').appendChild(comentario)
}

})



// Guardar en Session Storage
function guardarSessionStorage(clave, valor) { 

  var json = JSON.stringify(valor)
  sessionStorage.setItem(clave,json)

}


// Mostrar info de médico con el botón buscar
var doctorBuscado = document.getElementById("botonBuscar")

doctorBuscado.addEventListener("click", funcBotonBuscar)
  
function funcBotonBuscar() {
  var doctorElegido = document.querySelector("#autocomplete-input").value
  
  var pasarDoctorElegido = doctores.find(doctor => {
  if (doctor.nombre == doctorElegido) {
    return doctor
  }
  })

verPuntajes(pasarDoctorElegido)
}

function verPuntajes(doctor) {

  document.querySelector("h2").textContent = doctor.nombre
  document.querySelector("#puntaje-total").textContent = doctor.promedioTotal
  
  let porcentajeRecomiendan = doctor.recomiendan * 100 / (doctor.recomiendan + doctor.noRecomiendan)
  document.querySelector("#porcentaje").textContent = `${parseInt(porcentajeRecomiendan)}%`

  console.log(doctor.promedioPuntualidad)
  console.log(doctor.promedioAmbiente)
  console.log(doctor.promedioTrato)
  console.log(doctor.promedioResultado)

  document.querySelector("#divisor").style.display = "block"


}




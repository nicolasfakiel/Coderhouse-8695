/*MÉDICOS
Los médicos son uno de los principales objetos del proyecto.
Tienen propiedades estátcas como nombre y lugares de atención y otras dinámicas que son las recomendaciones
y puntajes que les dan los pacientes que fueron atendidos por ellos*/

// Listado de doctores
var doctores = []

// Fx para agregar un doctor al listado de doctores
function AgregarDoctorADoctores(doctor) {
  doctores.push(doctor)
}

// Consctructor de doctores
function nuevoDoctor(nombre, lugarDeAtencion1, lugarDeAtencion2, lugarDeAtencion3) {
  this.nombre = nombre,
  this.lugaresDeAtencion = [lugarDeAtencion1, lugarDeAtencion2, lugarDeAtencion3] // Listado de lugares donde atiende
  this.recomiendan = 0, // Cantidad de pacientes que pusieron que recomiendan al médico
  this.noRecomiendan = 0, // Cantidad de pacientes que pusieron que no recomiendan al médico
  this.puntajesPuntualidad = [], // Listado de puntajes que pacientes ponen a la puntualidad dél médico en sus visitas
  this.promedioPuntualidad = 0, // Promedio de los puntajes de puntualidad
  this.puntajesAmbiente = [],
  this.promedioAmbiente = 0,
  this.puntajesTrato = [],
  this.promedioTrato = 0,
  this.puntajesResultado = [],
  this.promedioResultado = 0,
  this.puntajesTotal = [], // Array que concatena todos los puntajes
  this.promedioTotal = 0,  // Promedio de todos los puntajes que recibió el médico, a modo de puntaje general

  AgregarDoctorADoctores(this)
}

// Doctores de ejemplo
var doctor1 = new nuevoDoctor("Dr. Lucas Gonzalez", "Clínica 1", "Consultorio privado XX", "Hospital 1")
var doctor2 = new nuevoDoctor("Dra. Irma Perez", "Clínica 2", "Consultorio privado YY", "Hospital 2")

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
function verPuntajes(doctor) {
  console.log(doctor.promedioPuntualidad)
  console.log(doctor.promedioAmbiente)
  console.log(doctor.promedioTrato)
  console.log(doctor.promedioResultado)
}

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

// prueba sessionStorage
function myScript(){
  sessionStorage.setItem("AAAA", "yAAyy")
  sessionStorage.setItem("aaAAAA", "yAAyy")
}

function botonBuscar() {

  document.querySelector("#divisor").style.visibility = "visible"

// var doctorElegido = document.querySelector("#autocomplete-input").value

// verPuntajes(doctor1)
 


}
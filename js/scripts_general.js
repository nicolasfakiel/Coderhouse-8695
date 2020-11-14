/*DOCTORES
Los doctores son uno de los principales objetos del proyecto.
Tienen propiedades estátcas como nombre y lugares de atención y otras dinámicas que son las recomendaciones
y puntajes que les dan los pacientes que fueron atendidos por ellos*/


// Listado de doctores
var doctores = []

// Cargar los doctores al inicio (archivo JSON la primera vez y Local Storage las siguientes)
if (localStorage.doctores) {
  var doctores = JSON.parse(localStorage.doctores)
} else {
  $.ajax({
    url: 'js/doctores.json',
    
    success: function (datosDoctores) {
      datosDoctores.forEach(element => {
        agregarDoctorADoctores(element)
      })
    }
  })
} 

// Rellenar el Autocomplete con los datos de los doctores
function pasarDocsAlAutocomplete(){
  var options = {}
  doctores.forEach(element => {
    options[element.nombre] = null
  })
  return options
}

// Inicializar el Autocomplete
$(document).ready(function(){

setTimeout(() => {
  $('input.autocomplete').autocomplete({
    data: pasarDocsAlAutocomplete()
  })
  
}, 500);



// setTimeout($('input.autocomplete').autocomplete({
  // data: pasarDocsAlAutocomplete()}),   500)
})



// Consctructor de doctores (No se usa porque se pasó a usar AJAX)
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
  this.comentarios = [] 
  this.agregarDoctorADoctores = function () { // Método para agregar el doctor al listado de doctores
    doctores.push(this)
  }  
}

// Función para agregar los doctores al Array de doctores
function agregarDoctorADoctores(doc) {
  doctores.push(doc)  
}

/*VISITAS
Las visitas son los objetos que completan a los doctores. Tienen un lugar, una fecha, un doctor asociado y todos los puntajes que el paciente le pone al doctor.
Los doctores ya vienen con visitas predeterminadas y se van agregando las que agrega el usuario, para lo cual se usa un constructor*/

// Listado de visitas (array vacío la primera vez (las visitas iniciales vienen predeterminadsa) y Local Storage las siguientes)
var visitas = localStorage.visitas ? JSON.parse(localStorage.visitas) : []

// Constructor de visitas (crea una nueva visita, asigna los pts al médico y calcula los promedios)
function nuevaVisita(fecha, lugar, doctor, puntualidad, ambiente, trato, resultado, recomendacion, comentario) {
  this.fecha = fecha,
  this.lugar = lugar,
  this.doctor = doctor,
  this.puntajePuntualidad = puntualidad,
  this.puntajeAmbiente = ambiente,
  this.puntajeTrato = trato,
  this.puntajeResultado = resultado;
  if (recomendacion == "Si") {
    this.recomendacion = true
  } else {
    this.recomendacion = false
  }  
  this.comentario = comentario,
  this.agregarVisitaAVisitas = function () { // Método para agregar la visita al listado de visitas
    visitas.push(this)
  }
}

// Función para agregar los visitas al Array de visitas
function agregarVisitaAVisitas(visi) {
  visitas.push(visi)  
}

// Función para agregar puntajes de una visita al doctor correspondiente
function agregarPuntajes(ptsPuntualidad, ptsTrato, ptsAmbiente, ptsResultado, recomienda, doctorEnCuestion, dia, comentario) {
  doctorEnCuestion.puntajesPuntualidad.push(ptsPuntualidad)
  doctorEnCuestion.puntajesTrato.push(ptsTrato)
  doctorEnCuestion.puntajesAmbiente.push(ptsAmbiente)
  doctorEnCuestion.puntajesResultado.push(ptsResultado)
  if (recomienda == "Si") {
    doctorEnCuestion.recomiendan += 1
  } else {
    doctorEnCuestion.noRecomiendan += 1   
  }
  doctorEnCuestion.comentarios.push({fechaVisita: dia, comentario: comentario})
}

// Función para sacar el promedio de puntajes de un médico
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







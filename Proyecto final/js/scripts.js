/*DOCTORES
Los doctores son uno de los principales objetos del proyecto.
Tienen propiedades estátcas como nombre y lugares de atención y otras dinámicas que son las recomendaciones
y puntajes que les dan los pacientes que fueron atendidos por ellos*/

// Listado de doctores
var doctores = []

// Cargar los doctores al inicio
if (localStorage.doctores) {
  var doctores = JSON.parse(localStorage.doctores)
} else {
  $.ajax({
    url: 'js/doctores.json',
    
    success: function (datosDoctores) {
      datosDoctores.forEach(element => {
        agregarDoctorADoctores(element)
      });
    }
  })
}

// Consctructor de doctores (no se usa)
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
Las visitas son los objetos que completan a los doctores.
Tienen un lugar, una fecha, un doctor asociado y todos los puntajes que el paciente le pone al doctor.
Las visitas cuentan con constructor porque es lo que el usuario ingresa en la plataforma*/

// Listado de visitas
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
    this.recomiendan = false
  }  
  this.comentario = comentario,

  this.agregarVisitaAVisitas = function () { // Método para agregar la visita al listado de visitas
    visitas.push(this)
  }
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


/* =============== */

// Inicializar el Autocomplete
$(document).ready(function(){
  $('input.autocomplete').autocomplete({
    data: pasarDocsAlAutocomplete(),
  });
});

// Rellenar el Autocomplete con los datos de los doctores
function pasarDocsAlAutocomplete(){
  var options = {}
  doctores.forEach(element => {
    options[element.nombre] = null
  })
  // console.log(options)
  return options
}   

// Inicializar Select de lugares de atención de los doctores
function iniciarSelect() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, cargarLugaresDeAtencion(JSON.parse(sessionStorage.getItem('nombre'))))
}

// Rellear Select con los lugares de atención correspondientes
function cargarLugaresDeAtencion(doctorElegidoPaso1) {

  var doctorElegido = doctores.find (doctor => doctor.nombre == doctorElegidoPaso1)
    
  doctorElegido.lugaresDeAtencion.forEach(element => {
    
    let select = document.querySelector('#seleccionLugar')
    nuevaOpcion = document.createElement('option')
    
    nuevaOpcion.setAttribute('value', doctores[0].lugaresDeAtencion.indexOf(element)+1)
    nuevaOpcion.textContent = element
    
    select.appendChild(nuevaOpcion)
    
  })
}

// Inicializar el Datepicker
function iniciarDatepicker() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {autoClose: true});
}


// Guarda en Session Storage la valoración que va completando el usuario
function guardarSessionStorage(clave, valor) { 
  var json = JSON.stringify(valor)
  sessionStorage.setItem(clave,json)
}

// Avanzar de paso en la valoración
function siguientePaso (nombreDelCampoSS, valorDelCampoSS, pasoEnElListado, campoEnElListado, pasoActual, pasoSiguiente) {
  
  guardarSessionStorage(nombreDelCampoSS, valorDelCampoSS)
  $(pasoEnElListado).css('color','black')

  if (isNaN(parseInt(valorDelCampoSS)) == false){
    if (valorDelCampoSS > 1) {
      $(campoEnElListado).text(valorDelCampoSS + " puntos")
    }
    else if (valorDelCampoSS = 1) {
      $(campoEnElListado).text(valorDelCampoSS + " punto") 
    }

  } else if (pasoEnElListado == '#listadoPaso9') {
    if (valorDelCampoSS == "Si") {
      $(campoEnElListado).text("Recomendado")
    } else {
      $(campoEnElListado).text("No recomendado")
    }

  } else {
    $(campoEnElListado).text(valorDelCampoSS)
  }

  $(campoEnElListado).append(`<i class="material-icons right">edit</i>`)
  document.querySelector(pasoActual).style.display='none'    
  document.querySelector(pasoSiguiente).style.display='block'
}

// Eventos a los botones de los 10 pasos en Valorar:
document.addEventListener('DOMContentLoaded', function() {

  // Creo variables para cada botón de cada paso
  const botonPaso1 = document.querySelector('#botonPaso1')
  const botonPaso2 = document.querySelector('#botonPaso2')
  const botonPaso3 = document.querySelector('#botonPaso3')
  const botonPaso4 = document.querySelector('#botonPaso4')
  const botonPaso5 = document.querySelector('#botonPaso5')
  const botonPaso6 = document.querySelector('#botonPaso6')
  const botonPaso7 = document.querySelector('#botonPaso7')
  const botonPaso8 = document.querySelector('#botonPaso8')
  const botonPaso9 = document.querySelector('#botonPaso9')

  // Agregar evento al botón del paso 1
  botonPaso1.addEventListener('click', function() {

    var doctorElegido = document.querySelector("#autocomplete-input").value

    if (doctorElegido !==''){
      iniciarDatepicker()
      siguientePaso("nombre", doctorElegido, "#listadoPaso2", "#eleccionPaso1", "#paso1", "#paso2")
    }
  })

  // Agregar evento al botón del paso 2
  botonPaso2.addEventListener('click', function() {

    var fechaElegida = document.querySelector(".datepicker").value

    if (fechaElegida !==''){
      iniciarSelect()
      siguientePaso("fecha", fechaElegida, "#listadoPaso3", "#eleccionPaso2", "#paso2", "#paso3")  
    }
  })

  // Agregar evento al botón del paso 3
  botonPaso3.addEventListener('click', function() {

    var lugarElegido = document.querySelector('#seleccionLugar').selectedOptions[0].textContent

    if (lugarElegido !==''){
      siguientePaso("lugar", lugarElegido, "#listadoPaso4", "#eleccionPaso3", "#paso3", "#paso4")
    }
  })

  // Agregar evento al botón del paso 4
  botonPaso4.addEventListener('click', function() {

    var puntualidadElegida = document.querySelector('#puntualidad span').textContent
  
    if (puntualidadElegida !==''){
      siguientePaso("puntualidad", puntualidadElegida, "#listadoPaso5", "#eleccionPaso4", "#paso4", "#paso5")
    }
  })

  // Agregar evento al botón del paso 5
  botonPaso5.addEventListener('click', function() {

    var tratoElegido = document.querySelector('#trato span').textContent

    if (tratoElegido !==''){
      siguientePaso("trato", tratoElegido, "#listadoPaso6", "#eleccionPaso5", "#paso5", "#paso6")
    }
  })

  // Agregar evento al botón del paso 6
  botonPaso6.addEventListener('click', function() {

    var ambienteElegido = document.querySelector('#ambiente span').textContent

    if (ambienteElegido !==''){
      siguientePaso("ambiente", ambienteElegido, "#listadoPaso7", "#eleccionPaso6", "#paso6", "#paso7")
    }
  })

  // Agregar evento al botón del paso 7
  botonPaso7.addEventListener('click', function() {

    var resultadoElegido = document.querySelector('#resultado span').textContent

    if (resultadoElegido !==''){
      siguientePaso("resultado", resultadoElegido, "#listadoPaso8", "#eleccionPaso7", "#paso7", "#paso8")
    }
  })

  // Agregar evento al botón del paso 8
  botonPaso8.addEventListener('click', function() {

    var recomendacionElegida = document.querySelector('#seleccionRecomienda').selectedOptions[0].textContent

    if (recomendacionElegida == 'No' || recomendacionElegida == 'Si'){      
      siguientePaso("recomendacion", recomendacionElegida, "#listadoPaso9", "#eleccionPaso8", "#paso8", "#paso9")
    }
  })

  // Agregar evento al botón del paso 9
  botonPaso9.addEventListener('click', function() {

    var comentarioElegido = document.querySelector('#textarea').value

    if (comentarioElegido !==''){
      siguientePaso("comentario", comentarioElegido, "#listadoPaso10", "#eleccionPaso9", "#paso9", "#paso10")
      llenarDatosPaso10()
    }
  })

})

// Variables con la info que viene de Session Storage de los 9 pasos
var traerNombre
var traerDia
var traerLugar
var traerPuntualidad
var traerTrato
var traerAmbiente
var traerResultado
var traerRecomendacion
var traerComentario

// Función que luego de completar los 9 pasos muestra el resumen
function llenarDatosPaso10() {
  traerNombre = JSON.parse(sessionStorage.getItem('nombre'))
  traerDia = JSON.parse(sessionStorage.getItem('fecha'))
  traerLugar = JSON.parse(sessionStorage.getItem('lugar'))
  traerPuntualidad = parseInt(JSON.parse(sessionStorage.getItem('puntualidad')))
  traerTrato = parseInt(JSON.parse(sessionStorage.getItem('trato')))
  traerAmbiente = parseInt(JSON.parse(sessionStorage.getItem('ambiente')))
  traerResultado = parseInt(JSON.parse(sessionStorage.getItem('resultado')))
  traerRecomendacion = (JSON.parse(sessionStorage.getItem('recomendacion')))
  traerComentario = JSON.parse(sessionStorage.getItem('comentario'))
  
    document.querySelector('#verNombre').textContent = traerNombre
    document.querySelector('#verDia').textContent = traerDia
    document.querySelector('#verLugar').textContent = traerLugar
    document.querySelector('#verPuntualidad').textContent = traerPuntualidad > 1 ? traerPuntualidad + " puntos" : traerPuntualidad + " punto"
    document.querySelector('#verTrato').textContent = traerTrato > 1 ? traerTrato + " puntos" : traerTrato + " punto"
    document.querySelector('#verAmbiente').textContent = traerAmbiente > 1 ? traerAmbiente + " puntos" : traerAmbiente + " punto"
    document.querySelector('#verResultado').textContent = traerResultado > 1 ? traerResultado + " puntos" : traerResultado + " punto"
    document.querySelector('#verRecomendacion').textContent = traerRecomendacion
    document.querySelector('#verComentario').textContent = traerComentario
}

// Agregar evento al botón del paso 10
botonPaso10.addEventListener('click', function() {

  var doctorDeLaVisita = doctores.find (doctor => doctor.nombre == traerNombre)

  var visita = new nuevaVisita(traerDia, traerLugar, doctorDeLaVisita, traerPuntualidad, traerAmbiente, traerTrato, traerResultado, traerRecomendacion, traerComentario)
      
  visita.agregarVisitaAVisitas()
  agregarPuntajes(traerPuntualidad, traerTrato, traerAmbiente, traerResultado, traerRecomendacion, doctorDeLaVisita, traerDia, traerComentario)
  promediar(doctorDeLaVisita)
  
  localStorage.setItem('doctores', JSON.stringify(doctores))  
  localStorage.setItem('visitas', JSON.stringify(visitas))
  
  // sessionStorage.clear()
  
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: '¡Gracias por dejar una valoración!',
    showConfirmButton: true,
    confirmButtonText: 'Volver al Inicio',
    confirmButtonColor: '#49a016',
    showDenyButton: true,
    denyButtonText: 'Dejar otra valoración',
    denyButtonColor: '#3085d6',
    allowOutsideClick: false  
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "index.html";
    } else if (result.isDenied) {
      window.location.href = "valorar.html";
    }
  })

})
// Inicializar Select de lugares de atención de los doctores
function iniciarSelect() {
  var elems = document.querySelectorAll('select');
  var instances = M.FormSelect.init(elems, cargarLugaresDeAtencion(sessionStorage.getItem('nombre')))
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
  var instances = M.Datepicker.init(elems, {autoClose: true, maxDate: new Date()});  
}

// Inicializar el contador del textarea
$(document).ready(function() {
  $('input#input_text, textarea#textarea').characterCounter();
});

// Guarda en Session Storage la valoración que va completando el usuario
function guardarSessionStorage(clave, valor) { 
  sessionStorage.setItem(clave,valor)
}

// Función para avanzar de paso en la valoración
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

  $(pasoActual).hide()   
  $(pasoSiguiente).fadeIn('slow')
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

  // Agregar evento al botón del paso 1: Doctor de la atención
  botonPaso1.addEventListener('click', function() {

    var doctorElegido = document.querySelector("#autocomplete-input").value

    if (doctorElegido !==''){
      iniciarDatepicker()
      siguientePaso("nombre", doctorElegido, "#listadoPaso2", "#eleccionPaso1", "#paso1", "#paso2")
    }
  })

  // Agregar evento al botón del paso 2: Fecha de la atención
  botonPaso2.addEventListener('click', function() {

    var fechaElegida = document.querySelector(".datepicker").value

    if (fechaElegida !==''){
      iniciarSelect()
      siguientePaso("fecha", fechaElegida, "#listadoPaso3", "#eleccionPaso2", "#paso2", "#paso3")  
    }
  })

  // Agregar evento al botón del paso 3: Lugar de la atención
  botonPaso3.addEventListener('click', function() {

    var lugarElegido = document.querySelector('#seleccionLugar').selectedOptions[0].textContent

    if (lugarElegido !=='' && lugarElegido !== 'Elegí el lugar dónde te atendiste'){
      siguientePaso("lugar", lugarElegido, "#listadoPaso4", "#eleccionPaso3", "#paso3", "#paso4")
    }
  })

  // Agregar evento al botón del paso 4: Puntaje Puntualidad
  botonPaso4.addEventListener('click', function() {

    var puntualidadElegida = document.querySelector('#puntualidad span').textContent
  
    if (puntualidadElegida !==''){
      siguientePaso("puntualidad", puntualidadElegida, "#listadoPaso5", "#eleccionPaso4", "#paso4", "#paso5")
    }
  })

  // Agregar evento al botón del paso 5: Puntaje Trato
  botonPaso5.addEventListener('click', function() {

    var tratoElegido = document.querySelector('#trato span').textContent

    if (tratoElegido !==''){
      siguientePaso("trato", tratoElegido, "#listadoPaso6", "#eleccionPaso5", "#paso5", "#paso6")
    }
  })

  // Agregar evento al botón del paso 6: Puntaje Ambiente
  botonPaso6.addEventListener('click', function() {

    var ambienteElegido = document.querySelector('#ambiente span').textContent

    if (ambienteElegido !==''){
      siguientePaso("ambiente", ambienteElegido, "#listadoPaso7", "#eleccionPaso6", "#paso6", "#paso7")
    }
  })

  // Agregar evento al botón del paso 7: Puntaje Resultado
  botonPaso7.addEventListener('click', function() {

    var resultadoElegido = document.querySelector('#resultado span').textContent

    if (resultadoElegido !==''){
      siguientePaso("resultado", resultadoElegido, "#listadoPaso8", "#eleccionPaso7", "#paso7", "#paso8")
    }
  })

  // Agregar evento al botón del paso 8: Recomendación
  botonPaso8.addEventListener('click', function() {

    var recomendacionElegida = document.querySelector('#seleccionRecomienda').selectedOptions[0].textContent

    if (recomendacionElegida == 'No' || recomendacionElegida == 'Si'){      
      siguientePaso("recomendacion", recomendacionElegida, "#listadoPaso9", "#eleccionPaso8", "#paso8", "#paso9")
    }
  })

  // Agregar evento al botón del paso 9: Comentario
  botonPaso9.addEventListener('click', function() {

    var comentarioElegido = document.querySelector('#textarea').value

    if (comentarioElegido !=='' && $('textarea')[0].M_CharacterCounter.isValidLength) {
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
  traerNombre = sessionStorage.getItem('nombre')
  traerDia = sessionStorage.getItem('fecha')
  traerLugar = sessionStorage.getItem('lugar')
  traerPuntualidad = parseInt(sessionStorage.getItem('puntualidad'))
  traerTrato = parseInt(sessionStorage.getItem('trato'))
  traerAmbiente = parseInt(sessionStorage.getItem('ambiente'))
  traerResultado = parseInt(sessionStorage.getItem('resultado'))
  traerRecomendacion = sessionStorage.getItem('recomendacion')
  traerComentario = sessionStorage.getItem('comentario')
  
    document.querySelector('#verNombre').textContent = traerNombre
    document.querySelector('#verDia').textContent = traerDia
    document.querySelector('#verLugar').textContent = traerLugar
    document.querySelector('#verPuntualidad').textContent = traerPuntualidad > 1 ? traerPuntualidad + " puntos" : traerPuntualidad + " punto"
    document.querySelector('#verTrato').textContent = traerTrato > 1 ? traerTrato + " puntos" : traerTrato + " punto"
    document.querySelector('#verAmbiente').textContent = traerAmbiente > 1 ? traerAmbiente + " puntos" : traerAmbiente + " punto"
    document.querySelector('#verResultado').textContent = traerResultado > 1 ? traerResultado + " puntos" : traerResultado + " punto"
    document.querySelector('#verRecomendacion').textContent = traerRecomendacion == 'Si' ? 'Recomendado' : 'No recomendado'
    document.querySelector('#verComentario').textContent = traerComentario
}

// Agregar evento al botón del paso 10
botonPaso10.addEventListener('click', function() {

  var doctorDeLaVisita = doctores.find (doctor => doctor.nombre == traerNombre)

  var visita = new nuevaVisita(traerDia, traerLugar, doctorDeLaVisita, traerPuntualidad, traerAmbiente, traerTrato, traerResultado, traerRecomendacion, traerComentario)
      
  agregarVisitaAVisitas(visita)
  agregarPuntajes(traerPuntualidad, traerTrato, traerAmbiente, traerResultado, traerRecomendacion, doctorDeLaVisita, traerDia, traerComentario)
  promediar(doctorDeLaVisita)
  
  localStorage.setItem('doctores', JSON.stringify(doctores))  
  localStorage.setItem('visitas', JSON.stringify(visitas))
  
  // Sweet Alert
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
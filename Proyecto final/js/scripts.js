/*DOCTORES
Los médicos son uno de los principales objetos del proyecto.
Tienen propiedades estátcas como nombre y lugares de atención y otras dinámicas que son las recomendaciones
y puntajes que les dan los pacientes que fueron atendidos por ellos*/

// Listado de doctores
var doctores = []

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

  this.agregarDoctorADoctores = function () { // Método para agregar el doctor al listado de doctores
    doctores.push(this)
  }  
}

// Doctores de ejemplo
var doctor1 = new nuevoDoctor("Daniela", "Clínica 1", "Consultorio privado XX", "Hospital 1")
doctor1.agregarDoctorADoctores()
var doctor2 = new nuevoDoctor("Matias", "Clínica 2", "Consultorio privado YY", "Hospital 2")
doctor2.agregarDoctorADoctores()

/*VISITAS
Las visitas son los objetos que completan a los doctores.
Tienen un lugar, una fecha, un médico y todos los puntajes que el paciente le pone al doctor.
Las visitar cuentan con constructor porque es lo que el usuario ingresa en la plataforma*/

// Listado de visitas
var visitas = []

// Constructor de visitas (crea una nueva visita, asigna los pts al médico y calcula los promedios)
function nuevaVisita(fecha, lugar, doctor, puntualidad, ambiente, trato, resultado, recomendacion) {
  this.fecha = fecha,
  this.lugar = lugar,
  this.doctor = doctor,
  this.puntajePuntualidad = puntualidad,
  this.puntajeAmbiente = ambiente,
  this.puntajeTrato = trato,
  this.puntajeResultado = resultado;
  switch (recomendacion) {
    case 0:
      this.recomendacion = false
      break;
    case 1:
      this.recomiendan = true
      break;
  }

  this.agregarVisitaAVisitas = function () { // Método para agregar la visita al listado de visitas
    visitas.push(this)
  }

// Las líneas 69 a 72 se usaban para agregar  los puntajes al doctor, se cambiaron por la función agregarPuntajes
  // doctor.puntajesPuntualidad.push(puntualidad)
  // doctor.puntajesAmbiente.push(ambiente)
  // doctor.puntajesTrato.push(trato)
  // doctor.puntajesResultado.push(resultado)
    
  agregarPuntajes(puntualidad, trato, ambiente, resultado, recomendacion, doctor)
  
  promediar(doctor)
}

// Función para agregar puntajes de una visita al doctor correspondiente
function agregarPuntajes(ptsPuntualidad, ptsTrato, ptsAmbiente, ptsResultado, recomienda, doctorEnCuestion) {
  doctorEnCuestion.puntajesPuntualidad.push(ptsPuntualidad)
  doctorEnCuestion.puntajesTrato.push(ptsTrato)
  doctorEnCuestion.puntajesAmbiente.push(ptsAmbiente)
  doctorEnCuestion.puntajesResultado.push(ptsResultado)
  switch (recomienda) {
    case 0:
      doctorEnCuestion.noRecomiendan += 1
      break;
    case 1:
      doctorEnCuestion.recomiendan += 1
      break;
  }
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

/* ======== Inicio funciones para la página Valorar ======== */

// Inicializa el Autocompletar y le trae los nombres del listado de doctores
document.addEventListener('DOMContentLoaded', function() {
  function pasarDocsAlAutocomplete(){
    var options = {}
    doctores.forEach(element => {
      options[element.nombre] = null
    })
    // console.log(options)
    return options
  }
  var elems = document.querySelectorAll('.autocomplete');
  var instances = M.Autocomplete.init(elems, {data: pasarDocsAlAutocomplete()});
})

// Inicializa el Datepicker
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.datepicker');
  var instances = M.Datepicker.init(elems, {autoClose: true});
});

// Inicializa el Select con lugares de atención (aún hardcodeado)
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

// Guarda en Session Storage lo que va a ir completando el usuario
function guardarSessionStorage(clave, valor) { 
  var json = JSON.stringify(valor)
  sessionStorage.setItem(clave,json)
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

    if (doctorElegido ===''){
      console.log("campo nombre de medico vacio")
    }

    else {
      guardarSessionStorage("nombre", doctorElegido)
      document.querySelector('#paso1').style.display='none'    
      document.querySelector('#paso2').style.display='block'
    }
  })

  // Agregar evento al botón del paso 2
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
  botonPaso4.addEventListener('click', function() {

    var puntualidadElegida = document.querySelector('#puntualidad span').textContent

    if (puntualidadElegida ===''){
      console.log("campo puntualidad vacia")
    }

    else {
      guardarSessionStorage("puntualidad", puntualidadElegida)
      document.querySelector('#paso4').style.display='none'
      document.querySelector('#paso5').style.display='block'  
    }
  })

  // Agregar evento al botón del paso 5
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

})

  // Luego de completar los pasos muestra el resumen
  function llenarDatosPaso10() {
    
    var traerNombre = JSON.parse(sessionStorage.getItem('nombre'))
    var traerDia = JSON.parse(sessionStorage.getItem('fecha'))
    var traerLugar = JSON.parse(sessionStorage.getItem('lugar'))
    var traerPuntualidad = parseInt(JSON.parse(sessionStorage.getItem('puntualidad')))
    var traerTrato = parseInt(JSON.parse(sessionStorage.getItem('trato')))
    var traerAmbiente = parseInt(JSON.parse(sessionStorage.getItem('ambiente')))
    var traerResultado = parseInt(JSON.parse(sessionStorage.getItem('resultado')))
    var traerRecomendacion = parseInt(JSON.parse(sessionStorage.getItem('recomendacion')))
    var traerComentario = JSON.parse(sessionStorage.getItem('comentario'))
  
    
    document.querySelector('#verNombre').textContent = traerNombre
    document.querySelector('#verDia').textContent = traerDia
    document.querySelector('#verLugar').textContent = traerLugar
    document.querySelector('#verPuntualidad').textContent = traerPuntualidad
    document.querySelector('#verTrato').textContent = traerTrato
    document.querySelector('#verAmbiente').textContent = traerAmbiente
    document.querySelector('#verResultado').textContent = traerResultado
    document.querySelector('#verRecomendacion').textContent = traerRecomendacion
    document.querySelector('#verComentario').textContent = traerComentario

    
    // Agregar evento al botón del paso 10
    const botonPaso10 = document.querySelector('#botonPaso10')

    botonPaso10.addEventListener('click', function() {

      var visita = new nuevaVisita(traerDia, traerLugar, doctorDeLaVisita, traerPuntualidad, traerAmbiente, traerTrato, traerResultado, traerRecomendacion)
      visita.agregarVisitaAVisitas()
      // sessionStorage.clear()
      document.querySelector('#paso10').style.display='none'    
      document.querySelector('#paso1').style.display='block'

    })
    
    var doctorDeLaVisita = doctores.find (doctor => doctor.nombre == traerNombre
    )

  }








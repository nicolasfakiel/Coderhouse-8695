/* ======== Inicio funciones para la página Buscar ======== */

// Mostrar info de médico con el botón buscar
var doctorBuscado = document.getElementById("botonBuscar")
doctorBuscado.addEventListener("click", funcBotonBuscar)
  
function funcBotonBuscar() { // Manda la info del doctor buscado
  var doctorElegido = document.querySelector("#autocomplete-input").value
  
  var pasarDoctorElegido = doctores.find(doctor => doctor.nombre == doctorElegido
  )

  verPuntajes(pasarDoctorElegido)
}

function verPuntajes(doctor) { // Muestra la info del doctor buscado
  document.querySelector("h2").textContent = doctor.nombre
  document.querySelector("#puntaje-total").textContent = doctor.promedioTotal
  
  let porcentajeRecomiendan = doctor.recomiendan * 100 / (doctor.recomiendan + doctor.noRecomiendan)
  document.querySelector("#porcentaje").textContent = `${parseInt(porcentajeRecomiendan)}%`

  document.querySelector("#divisor").style.display = "block"
}

/* ======== Fin (por ahora) funciones para la página Buscar ======== */

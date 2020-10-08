/* ======== Inicio funciones para la página Buscar ======== */

// Mostrar info de médico con el botón buscar
var doctorBuscado = document.getElementById("botonBuscar")
doctorBuscado.addEventListener("click", funcBotonBuscar)
  
function funcBotonBuscar() { // Manda la info del doctor buscado
  var doctorElegido = document.querySelector("#autocomplete-input").value
  
  var pasarDoctorElegido = doctores.find(doctor => doctor.nombre == doctorElegido)

  verPuntajes(pasarDoctorElegido)
  verComentarios(pasarDoctorElegido)

}

function verComentarios(doctor) {
  visitas.forEach(visita => {
  
    if (visita.doctor.nombre == doctor.nombre) {
      console.log("aaa")
      var parrafoFecha = document.createElement('p')
      var parrafoComentario = document.createElement('p')
      parrafoFecha.textContent = visita.fecha
      parrafoComentario.textContent = visita.comentario
      document.querySelector('#listaComentarios').appendChild(parrafoFecha)
      document.querySelector('#listaComentarios').appendChild(parrafoComentario)
    }
    else {
      console.log("no cargo comentarios")
    }
  });
  
}

function verPuntajes(doctor) { // Muestra la info del doctor buscado
  
  document.querySelector("h2").textContent = doctor.nombre
  
  document.querySelector("#puntaje-total").textContent = doctor.promedioTotal
  
  let porcentajeRecomiendan = doctor.recomiendan * 100 / (doctor.recomiendan + doctor.noRecomiendan)
  document.querySelector("#porcentaje").textContent = `${parseInt(porcentajeRecomiendan)}%`



// Rellenado de estrellas de Puntualidad
  if (doctor.promedioPuntualidad >= 0 && doctor.promedioPuntualidad < 0.75  ) {
    document.querySelector("#estrellaPuntualidad1").textContent = "star_half"
    document.querySelector("#estrellaPuntualidad2").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad3").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad4").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad5").textContent = "star_border"
  } 
  else if  (doctor.promedioPuntualidad >= 0.75 && doctor.promedioPuntualidad < 1.25  ) {
    document.querySelector("#estrellaPuntualidad1").textContent = "star"
    document.querySelector("#estrellaPuntualidad2").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad3").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad4").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad5").textContent = "star_border"
  }
  else if  (doctor.promedioPuntualidad >= 1.25 && doctor.promedioPuntualidad < 1.75  ) {
    document.querySelector("#estrellaPuntualidad1").textContent = "star"
    document.querySelector("#estrellaPuntualidad2").textContent = "star_half"
    document.querySelector("#estrellaPuntualidad3").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad4").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad5").textContent = "star_border"
  }
  else if  (doctor.promedioPuntualidad >= 1.75 && doctor.promedioPuntualidad < 2.25  ) {
    document.querySelector("#estrellaPuntualidad1").textContent = "star"
    document.querySelector("#estrellaPuntualidad2").textContent = "star"
    document.querySelector("#estrellaPuntualidad3").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad4").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad5").textContent = "star_border"
  }
  else if  (doctor.promedioPuntualidad >= 2.25 && doctor.promedioPuntualidad < 2.75  ) {
    document.querySelector("#estrellaPuntualidad1").textContent = "star"
    document.querySelector("#estrellaPuntualidad2").textContent = "star"
    document.querySelector("#estrellaPuntualidad3").textContent = "star_half"
    document.querySelector("#estrellaPuntualidad4").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad5").textContent = "star_border"
  }
  else if  (doctor.promedioPuntualidad >= 2.75 && doctor.promedioPuntualidad < 3.25  ) {
    document.querySelector("#estrellaPuntualidad1").textContent = "star"
    document.querySelector("#estrellaPuntualidad2").textContent = "star"
    document.querySelector("#estrellaPuntualidad3").textContent = "star"
    document.querySelector("#estrellaPuntualidad4").textContent = "star_border"
    document.querySelector("#estrellaPuntualidad5").textContent = "star_border"
  }
  else if  (doctor.promedioPuntualidad >= 3.25 && doctor.promedioPuntualidad < 3.75  ) {
    document.querySelector("#estrellaPuntualidad1").textContent = "star"
    document.querySelector("#estrellaPuntualidad2").textContent = "star"
    document.querySelector("#estrellaPuntualidad3").textContent = "star"
    document.querySelector("#estrellaPuntualidad4").textContent = "star_half"
    document.querySelector("#estrellaPuntualidad5").textContent = "star_border"
  }
  else if  (doctor.promedioPuntualidad >= 3.75 && doctor.promedioPuntualidad < 4.25  ) {
    document.querySelector("#estrellaPuntualidad1").textContent = "star"
    document.querySelector("#estrellaPuntualidad2").textContent = "star"
    document.querySelector("#estrellaPuntualidad3").textContent = "star"
    document.querySelector("#estrellaPuntualidad4").textContent = "star"
    document.querySelector("#estrellaPuntualidad5").textContent = "star_border"
  }
  else if  (doctor.promedioPuntualidad >= 4.25 && doctor.promedioPuntualidad < 4.75  ) {
    document.querySelector("#estrellaPuntualidad1").textContent = "star"
    document.querySelector("#estrellaPuntualidad2").textContent = "star"
    document.querySelector("#estrellaPuntualidad3").textContent = "star"
    document.querySelector("#estrellaPuntualidad4").textContent = "star"
    document.querySelector("#estrellaPuntualidad5").textContent = "star_half"
  }
  else if  (doctor.promedioPuntualidad >= 4.75 && doctor.promedioPuntualidad <= 5  ) {
    document.querySelector("#estrellaPuntualidad1").textContent = "star"
    document.querySelector("#estrellaPuntualidad2").textContent = "star"
    document.querySelector("#estrellaPuntualidad3").textContent = "star"
    document.querySelector("#estrellaPuntualidad4").textContent = "star"
    document.querySelector("#estrellaPuntualidad5").textContent = "star"
  }

// Rellenado de estrellas de Trato  
  if (doctor.promedioTrato >= 0 && doctor.promedioTrato < 0.75  ) {
    document.querySelector("#estrellaTrato1").textContent = "star_half"
    document.querySelector("#estrellaTrato2").textContent = "star_border"
    document.querySelector("#estrellaTrato3").textContent = "star_border"
    document.querySelector("#estrellaTrato4").textContent = "star_border"
    document.querySelector("#estrellaTrato5").textContent = "star_border"
  } 
  else if (doctor.promedioTrato >= 0.75 && doctor.promedioTrato < 1.25  ) {
    document.querySelector("#estrellaTrato1").textContent = "star"
    document.querySelector("#estrellaTrato2").textContent = "star_border"
    document.querySelector("#estrellaTrato3").textContent = "star_border"
    document.querySelector("#estrellaTrato4").textContent = "star_border"
    document.querySelector("#estrellaTrato5").textContent = "star_border"
  }
  else if (doctor.promedioTrato >= 1.25 && doctor.promedioTrato < 1.75  ) {
    document.querySelector("#estrellaTrato1").textContent = "star"
    document.querySelector("#estrellaTrato2").textContent = "star_half"
    document.querySelector("#estrellaTrato3").textContent = "star_border"
    document.querySelector("#estrellaTrato4").textContent = "star_border"
    document.querySelector("#estrellaTrato5").textContent = "star_border"
  }
  else if (doctor.promedioTrato >= 1.75 && doctor.promedioTrato < 2.25  ) {
    document.querySelector("#estrellaTrato1").textContent = "star"
    document.querySelector("#estrellaTrato2").textContent = "star"
    document.querySelector("#estrellaTrato3").textContent = "star_border"
    document.querySelector("#estrellaTrato4").textContent = "star_border"
    document.querySelector("#estrellaTrato5").textContent = "star_border"
  }
  else if (doctor.promedioTrato >= 2.25 && doctor.promedioTrato < 2.75  ) {
    document.querySelector("#estrellaTrato1").textContent = "star"
    document.querySelector("#estrellaTrato2").textContent = "star"
    document.querySelector("#estrellaTrato3").textContent = "star_half"
    document.querySelector("#estrellaTrato4").textContent = "star_border"
    document.querySelector("#estrellaTrato5").textContent = "star_border"
  }
  else if (doctor.promedioTrato >= 2.75 && doctor.promedioTrato < 3.25  ) {
    document.querySelector("#estrellaTrato1").textContent = "star"
    document.querySelector("#estrellaTrato2").textContent = "star"
    document.querySelector("#estrellaTrato3").textContent = "star"
    document.querySelector("#estrellaTrato4").textContent = "star_border"
    document.querySelector("#estrellaTrato5").textContent = "star_border"
  }
  else if (doctor.promedioTrato >= 3.25 && doctor.promedioTrato < 3.75  ) {
    document.querySelector("#estrellaTrato1").textContent = "star"
    document.querySelector("#estrellaTrato2").textContent = "star"
    document.querySelector("#estrellaTrato3").textContent = "star"
    document.querySelector("#estrellaTrato4").textContent = "star_half"
    document.querySelector("#estrellaTrato5").textContent = "star_border"
  }
  else if (doctor.promedioTrato >= 3.75 && doctor.promedioTrato < 4.25  ) {
    document.querySelector("#estrellaTrato1").textContent = "star"
    document.querySelector("#estrellaTrato2").textContent = "star"
    document.querySelector("#estrellaTrato3").textContent = "star"
    document.querySelector("#estrellaTrato4").textContent = "star"
    document.querySelector("#estrellaTrato5").textContent = "star_border"
  }
  else if (doctor.promedioTrato >= 4.25 && doctor.promedioTrato < 4.75  ) {
    document.querySelector("#estrellaTrato1").textContent = "star"
    document.querySelector("#estrellaTrato2").textContent = "star"
    document.querySelector("#estrellaTrato3").textContent = "star"
    document.querySelector("#estrellaTrato4").textContent = "star"
    document.querySelector("#estrellaTrato5").textContent = "star_half"
  }
  else if (doctor.promedioTrato >= 4.75 && doctor.promedioTrato <= 5  ) {
    document.querySelector("#estrellaTrato1").textContent = "star"
    document.querySelector("#estrellaTrato2").textContent = "star"
    document.querySelector("#estrellaTrato3").textContent = "star"
    document.querySelector("#estrellaTrato4").textContent = "star"
    document.querySelector("#estrellaTrato5").textContent = "star"
  }

// Rellenado de estrellas de Ambiente  
if (doctor.promedioAmbiente >= 0 && doctor.promedioAmbiente < 0.75  ) {
    document.querySelector("#estrellaAmbiente1").textContent = "star_half"
    document.querySelector("#estrellaAmbiente2").textContent = "star_border"
    document.querySelector("#estrellaAmbiente3").textContent = "star_border"
    document.querySelector("#estrellaAmbiente4").textContent = "star_border"
    document.querySelector("#estrellaAmbiente5").textContent = "star_border"
  } 
  else if  (doctor.promedioAmbiente >= 0.75 && doctor.promedioAmbiente < 1.25  ) {
    document.querySelector("#estrellaAmbiente1").textContent = "star"
    document.querySelector("#estrellaAmbiente2").textContent = "star_border"
    document.querySelector("#estrellaAmbiente3").textContent = "star_border"
    document.querySelector("#estrellaAmbiente4").textContent = "star_border"
    document.querySelector("#estrellaAmbiente5").textContent = "star_border"
  }
  else if  (doctor.promedioAmbiente >= 1.25 && doctor.promedioAmbiente < 1.75  ) {
    document.querySelector("#estrellaAmbiente1").textContent = "star"
    document.querySelector("#estrellaAmbiente2").textContent = "star_half"
    document.querySelector("#estrellaAmbiente3").textContent = "star_border"
    document.querySelector("#estrellaAmbiente4").textContent = "star_border"
    document.querySelector("#estrellaAmbiente5").textContent = "star_border"
  }
  else if  (doctor.promedioAmbiente >= 1.75 && doctor.promedioAmbiente < 2.25  ) {
    document.querySelector("#estrellaAmbiente1").textContent = "star"
    document.querySelector("#estrellaAmbiente2").textContent = "star"
    document.querySelector("#estrellaAmbiente3").textContent = "star_border"
    document.querySelector("#estrellaAmbiente4").textContent = "star_border"
    document.querySelector("#estrellaAmbiente5").textContent = "star_border"
  }
  else if  (doctor.promedioAmbiente >= 2.25 && doctor.promedioAmbiente < 2.75  ) {
    document.querySelector("#estrellaAmbiente1").textContent = "star"
    document.querySelector("#estrellaAmbiente2").textContent = "star"
    document.querySelector("#estrellaAmbiente3").textContent = "star_half"
    document.querySelector("#estrellaAmbiente4").textContent = "star_border"
    document.querySelector("#estrellaAmbiente5").textContent = "star_border"
  }
  else if  (doctor.promedioAmbiente >= 2.75 && doctor.promedioAmbiente < 3.25  ) {
    document.querySelector("#estrellaAmbiente1").textContent = "star"
    document.querySelector("#estrellaAmbiente2").textContent = "star"
    document.querySelector("#estrellaAmbiente3").textContent = "star"
    document.querySelector("#estrellaAmbiente4").textContent = "star_border"
    document.querySelector("#estrellaAmbiente5").textContent = "star_border"
  }
  else if  (doctor.promedioAmbiente >= 3.25 && doctor.promedioAmbiente < 3.75  ) {
    document.querySelector("#estrellaAmbiente1").textContent = "star"
    document.querySelector("#estrellaAmbiente2").textContent = "star"
    document.querySelector("#estrellaAmbiente3").textContent = "star"
    document.querySelector("#estrellaAmbiente4").textContent = "star_half"
    document.querySelector("#estrellaAmbiente5").textContent = "star_border"
  }
  else if  (doctor.promedioAmbiente >= 3.75 && doctor.promedioAmbiente < 4.25  ) {
    document.querySelector("#estrellaAmbiente1").textContent = "star"
    document.querySelector("#estrellaAmbiente2").textContent = "star"
    document.querySelector("#estrellaAmbiente3").textContent = "star"
    document.querySelector("#estrellaAmbiente4").textContent = "star"
    document.querySelector("#estrellaAmbiente5").textContent = "star_border"
  }
  else if  (doctor.promedioAmbiente >= 4.25 && doctor.promedioAmbiente < 4.75  ) {
    document.querySelector("#estrellaAmbiente1").textContent = "star"
    document.querySelector("#estrellaAmbiente2").textContent = "star"
    document.querySelector("#estrellaAmbiente3").textContent = "star"
    document.querySelector("#estrellaAmbiente4").textContent = "star"
    document.querySelector("#estrellaAmbiente5").textContent = "star_half"
  }
  else if  (doctor.promedioAmbiente >= 4.75 && doctor.promedioAmbiente <= 5  ) {
    document.querySelector("#estrellaAmbiente1").textContent = "star"
    document.querySelector("#estrellaAmbiente2").textContent = "star"
    document.querySelector("#estrellaAmbiente3").textContent = "star"
    document.querySelector("#estrellaAmbiente4").textContent = "star"
    document.querySelector("#estrellaAmbiente5").textContent = "star"
  }

// Rellenado de estrellas de Resultado
  if (doctor.promedioResultado >= 0 && doctor.promedioResultado < 0.75  ) {
    document.querySelector("#estrellaResultado1").textContent = "star_half"
    document.querySelector("#estrellaResultado2").textContent = "star_border"
    document.querySelector("#estrellaResultado3").textContent = "star_border"
    document.querySelector("#estrellaResultado4").textContent = "star_border"
    document.querySelector("#estrellaResultado5").textContent = "star_border"
  } 
  else if  (doctor.promedioResultado >= 0.75 && doctor.promedioResultado < 1.25  ) {
    document.querySelector("#estrellaResultado1").textContent = "star"
    document.querySelector("#estrellaResultado2").textContent = "star_border"
    document.querySelector("#estrellaResultado3").textContent = "star_border"
    document.querySelector("#estrellaResultado4").textContent = "star_border"
    document.querySelector("#estrellaResultado5").textContent = "star_border"
  }
  else if  (doctor.promedioResultado >= 1.25 && doctor.promedioResultado < 1.75  ) {
    document.querySelector("#estrellaResultado1").textContent = "star"
    document.querySelector("#estrellaResultado2").textContent = "star_half"
    document.querySelector("#estrellaResultado3").textContent = "star_border"
    document.querySelector("#estrellaResultado4").textContent = "star_border"
    document.querySelector("#estrellaResultado5").textContent = "star_border"
  }
  else if  (doctor.promedioResultado >= 1.75 && doctor.promedioResultado < 2.25  ) {
    document.querySelector("#estrellaResultado1").textContent = "star"
    document.querySelector("#estrellaResultado2").textContent = "star"
    document.querySelector("#estrellaResultado3").textContent = "star_border"
    document.querySelector("#estrellaResultado4").textContent = "star_border"
    document.querySelector("#estrellaResultado5").textContent = "star_border"
  }
  else if  (doctor.promedioResultado >= 2.25 && doctor.promedioResultado < 2.75  ) {
    document.querySelector("#estrellaResultado1").textContent = "star"
    document.querySelector("#estrellaResultado2").textContent = "star"
    document.querySelector("#estrellaResultado3").textContent = "star_half"
    document.querySelector("#estrellaResultado4").textContent = "star_border"
    document.querySelector("#estrellaResultado5").textContent = "star_border"
  }
  else if  (doctor.promedioResultado >= 2.75 && doctor.promedioResultado < 3.25  ) {
    document.querySelector("#estrellaResultado1").textContent = "star"
    document.querySelector("#estrellaResultado2").textContent = "star"
    document.querySelector("#estrellaResultado3").textContent = "star"
    document.querySelector("#estrellaResultado4").textContent = "star_border"
    document.querySelector("#estrellaResultado5").textContent = "star_border"
  }
  else if  (doctor.promedioResultado >= 3.25 && doctor.promedioResultado < 3.75  ) {
    document.querySelector("#estrellaResultado1").textContent = "star"
    document.querySelector("#estrellaResultado2").textContent = "star"
    document.querySelector("#estrellaResultado3").textContent = "star"
    document.querySelector("#estrellaResultado4").textContent = "star_half"
    document.querySelector("#estrellaResultado5").textContent = "star_border"
  }
  else if  (doctor.promedioResultado >= 3.75 && doctor.promedioResultado < 4.25  ) {
    document.querySelector("#estrellaResultado1").textContent = "star"
    document.querySelector("#estrellaResultado2").textContent = "star"
    document.querySelector("#estrellaResultado3").textContent = "star"
    document.querySelector("#estrellaResultado4").textContent = "star"
    document.querySelector("#estrellaResultado5").textContent = "star_border"
  }
  else if  (doctor.promedioResultado >= 4.25 && doctor.promedioResultado < 4.75  ) {
    document.querySelector("#estrellaResultado1").textContent = "star"
    document.querySelector("#estrellaResultado2").textContent = "star"
    document.querySelector("#estrellaResultado3").textContent = "star"
    document.querySelector("#estrellaResultado4").textContent = "star"
    document.querySelector("#estrellaResultado5").textContent = "star_half"
  }
  else if  (doctor.promedioResultado >= 4.75 && doctor.promedioResultado <= 5  ) {
    document.querySelector("#estrellaResultado1").textContent = "star"
    document.querySelector("#estrellaResultado2").textContent = "star"
    document.querySelector("#estrellaResultado3").textContent = "star"
    document.querySelector("#estrellaResultado4").textContent = "star"
    document.querySelector("#estrellaResultado5").textContent = "star"
  }

  $('#divisor').slideDown( 'slow' )

  // if ($('#divisor').css.display == undefined){
  //   $('#divisor').slideDown( "slow" );
  // } else {
  //   $('#divisor').slideOut();
  // }
  
}

/* ======== Fin (por ahora) funciones para la página Buscar ======== */

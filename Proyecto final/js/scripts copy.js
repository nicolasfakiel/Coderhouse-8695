/*MÉDICOS
Los médicos son uno de los principales objetos del proyecto.
Tienen propiedades estátcas como nombre y lugares de atención y otras dinámicas que son las recomendaciones
y puntajes que les dan los pacientes que fueron atendidos por ellos*/

var doctor1 = {
  nombre: "Dr. Lucas Gonzalez",
  lugaresDeAtencion: ["Clínica 1", "Consultorio privado XX", "Hospital 1"], // Listado de lugares en donde atiende el médico
  recomiendan: 38, // Cantidad de pacientes que pusieron que recomiendan al médico
  noRecomiendan: 4, // Cantidad de pacientes que pusieron que no recomiendan al médico
  puntajesPuntualidad: [4, 2, 3, 5], // Listado de puntajes que pacientes ponen a la puntualidad dél médico en sus visitas
  promedioPuntualidad: 0, // Promedio de los puntajes de puntualidad
  puntajesAmbiente: [3, 2, 5, 1],
  promedioAmbiente: 0,
  puntajesTrato: [4, 5, 3, 4],
  promedioTrato: 0,
  puntajesResultado: [4, 2, 3, 5],
  promedioResultado: 0,
  promedioTotal: 0, // Promedio de todos los puntajes que recibió el médico, a modo de puntaje 
}

var doctor2 = {
  nombre: "Dra. Irma Perez",
  lugaresDeAtencion: ["Clínica 2", "Consultorio privado YY", "Hospital 2"],
  recomiendan: 50,
  noRecomiendan: 10,
  puntajesPuntualidad: [1, 2, 2, 3],
  promedioPuntualidad: 0,
  puntajesAmbiente: [2, 4, 5, 1],
  promedioAmbiente: 0,
  puntajesTrato: [5, 5, 4, 4],
  promedioTrato: 0,
  puntajesResultado: [2, 2, 3, 4],
  promedioResultado: 0,
  promedioTotal: 0,
}

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
Tienen un lugar, una fecha, un médico, un paciente y todos los puntajes que el paciente le pone al médico*/

var visita1 = {
  fecha: new Date(2020,08,25),
  lugar: doctor1.lugaresDeAtencion[1],
  medico: doctor1,
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
  medico: doctor2,
  paciente: paciente2,
  puntajePuntualidad: 5,
  PuntajeAmbiente: 1,
  PuntajeTrato: 3,
  PuntajeResultado:2,
  recomienda: false,
} 

/* Funciones */

/* Constructora de visita para que el paciente que carga la info de su visita cree una nueva visita*/
function nuevaVisita(fecha, lugar, medico, paciente, puntualidad, ambiente, trato, resultado, recomienda) {
  this.fecha = fecha,
  this.lugar = lugar,
  this.medico = medico,
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
}

/* Para agregar un nuevo puntaje a un médico (se usa como ejemplo la categoría Puntualidad) */
function agregarPuntajePuntualidad(Doctor,PuntajeNuevo) {
  Doctor.puntajesPuntualidad.push(PuntajeNuevo)
}

/* Para sacar el promedio de puntajes de un médico (se usa como ejemplo la categoría Puntualidad) */
function promediarPuntualidad(Doctor) {
  var acum = 0;
  for (let i = 0; i < Doctor.puntajesPuntualidad.length; i++) {
    acum += Doctor.puntajesPuntualidad[i];    
  }
  Doctor.promedioPuntualidad = acum / Doctor.puntajesPuntualidad.length   
}
 

/*Otras funciones que voy a necesitar (y que no me están saliendo):
Una para mostrar los puntajes actuales de un médico, para la sección Buscar.
Una para pasar los parámetros de las nuevas visitas al objeto médico correspondiente. 
 */




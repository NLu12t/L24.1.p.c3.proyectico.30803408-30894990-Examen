/** 
 * Examen
 * Se desea llevar un control de los estudiantes que asisten a presentar un examen.
 * Se tiene por cada participante: nombre, cédula, sexo y nota. 
 * ojo: Se requiere de un programa que permita el registro de esta información, 
 * conociendo al principio de la ejecución el valor del examen y el mínimo aprobatorio.
 * 
 * Estructuras de datos recomendadas
 * Cl_examen: valor ( valor: 20), minAprueba (minAprueba: 9.6)
 * Cl_estudiante: nombre, cedula, sexo (‘F’ - ‘M’) y nota
 * 
 * Primeros requerimientos
 * Los datos entrada vienen en un archivo Dt_estudiantes (con import)
 * 
 * Segundos requerimientos
 * El programa debe tener:
 * Opciones para incluir, modificar,... eliminar mediante funciones de array involucrando el archivo Dt_estudiantes
 * Opciones para mostrar resultados (no por consola ni por alert)
 * Se admiten salidas por: <div id=”salida”> o por tablas
 *
 * calculos:
 * Porcentaje de aprobados = cantidadAprobados / cntEstudiantesAprobados =2/3 (resultado es un flotante de 2 decimales)
 * Porcentaje de reprobados = cantidadReprobados / cntEstudiantesReprobados =1/3 (resultado es un flotante de 2 decimales)
 * estudiante mejor nota = EstudianteMayorNota   (resultado es un array de un objeto)
 * calcular el promedio de notas = NotaPromedio (resultado es un flotante de 2 decimales)
 * chicas por encima de la nota promedio = ChicasPorEncimaDeLaNotaPromedio  (resultado es un objeto)
 * la salida sera enlazada a un div con id salida en el html. la vista sera en forma de tabla 
 * 
 * nombre  cedula  sexo  nota ejemplos:
 * luis     1111     M    12
 * carla    2222     F   16.5
 * mery     3333     F   8.5
 * ...y asi los que se sigan agregando
 * 
 */
import Cl_estudiante from './Cl_estudiante.js';
import Cl_examen from './Cl_examen.js';
import Dt_estudiantes from './Dt_estudiantes.js';
import Dt_examen from './Dt_examen.js';

const examen = new Cl_examen(Dt_examen.valor, Dt_examen.minAprueba);

Dt_estudiantes.forEach((estudiante) => 
  examen.agregarEstudiante( new 
    Cl_estudiante(estudiante.nombre, estudiante.cedula, estudiante.sexo, estudiante.nota))
);
  
let modificarEstudiante = (examen) => {
  let cedula = +prompt("Ingrese la cédula del estudiante que desea modificar:");
  
  let estudiante = examen.estudiantes.find(e => e.cedula === cedula);
  if (!estudiante) {
    alert("No se encontró ningún estudiante con esa cédula");
    return;
}
  let nuevoNombre = prompt("Ingrese el nuevo nombre:");
  let nuevaCedula = prompt("Ingrese la nueva cédula:");
  let nuevoSexo = prompt("Ingrese el nuevo sexo (F o M):");
  let nuevaNota = prompt("Ingrese la nueva nota:");
  
    // Convertir a número solo si se ingresó un valor
    nuevaCedula = nuevaCedula !== "" ? +nuevaCedula : "";
    nuevaNota = nuevaNota !== "" ? +nuevaNota : "";

  if (examen.modificarEstudiante(cedula, nuevoNombre, nuevaCedula, nuevoSexo, nuevaNota)) {
      alert("Estudiante modificado con éxito");
      listarEstudiantes(examen, salida2);
  } else {
      alert("No se pudo modificar el estudiante");
  }
};
  
let agregarEstudiante = ( examen ) => {
  let nombre = prompt(`Ingrese el nombre del estudiante:`);
  let cedula = +prompt(`Ingrese la cedula del estudiante:`);
  let sexo = prompt(`Ingrese el sexo del estudiante:`);
  let nota = +prompt(`Ingrese la nota del estudiante:`);
  examen.agregarEstudiante(new Cl_estudiante(nombre, cedula, sexo, nota));
  listarEstudiantes(examen, salida2);
};

let eliminarEstudiante = ( examen ) => {
  let cedula = +prompt(`Ingrese la cedula del estudiante a eliminar:`);
  if (examen.eliminarEstudiante(cedula)) {
    listarEstudiantes(examen, salida2);
  }
};

let porcAprobados = (examen, salida) => {
  salida.innerHTML = ` <br><h3>Porcentaje estudiantes que aprueban:</h3>
  ${examen.porcentajeAprobados().toFixed(2)} %`;
};

let porcReprobados = (examen, salida) => {
  salida.innerHTML = ` <br><h3>Porcentaje estudiantes que reprueban:</h3>
  ${examen.porcentajeReprobados().toFixed(2)} %`;
};

let estudMejorNota = (examen, salida) => {
  salida.innerHTML = ` <br><h3>Estudiante con mejor nota:</h3>
  estudiante:
  ${examen.estudianteMejorNota().nombre}. <br>nota: ${examen.estudianteMejorNota().nota}`;
}

let prom = (examen, salida) => {
  salida.innerHTML = ` <br><h3>Promedio de notas:</h3>
  ${examen.promedioNotas().toFixed(2)}`;
}

let chicas = (examen, salida) => { //EN FORMA DE TABLA
  salida.innerHTML = ` <br><h3>Chicas por encima de la nota promedio:</h3>
<br>
    <table border="1", style="border-collapse: collapse;" >
    <thead>
    <tr>
       <th>Nombre</th>
       <th>Nota</th>
    </tr>
    </thead>
  <tbody>
    ${examen.chicasPorEncimaDeLaNotaPromedio().map(estudiante => `
      <tr></tr>
        <td>${estudiante.nombre}</td>
        <td>${estudiante.nota}</td>
      </tr>
    `).join('')}
  </tbody>
</table>
  `;
};

let listarEstudiantes = (examen, salida) => {
  salida.innerHTML = `
  <br>
    <table border="1", style="border-collapse: collapse;" >
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cédula</th>
          <th>Sexo</th>
          <th>Nota</th>
        </tr>
      </thead>
      <tbody>
        ${examen.estudiantes.map(estudiante => `
          <tr>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.cedula}</td>
            <td>${estudiante.sexo}</td>
            <td>${estudiante.nota}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
};

const salida1 = document.getElementById("salida1"),
      salida2 = document.getElementById("salida2"),
      opciones = document.getElementById("opciones");

salida1.innerHTML = ` <h3>Elija una opción: </h3>
  <br>1 = Agregar estudiante
  <br>2 = Modificar estudiante
  <br>3 = Eliminar estudiante
  <br>4 = Porcentaje de Aprobados
  <br>5 = Porcentaje de Reprobados
  <br>6 = Estudiante con mejor nota
  <br>7 = Chicas por encima de la nota promedio
  <br>8 = Listar estudiantes
`;
  
opciones.onclick = () => {
  let opcion = +prompt("Ingrese una opcion:");
  switch (opcion) {
    case 1:
      agregarEstudiante(examen);
      break;
    case 2:
      modificarEstudiante(examen);
      break;
    case 3:
      eliminarEstudiante(examen);
      break;
    case 4:
      porcAprobados(examen, salida2);
      break;
    case 5:
      porcReprobados(examen, salida2);
      break;
    case 6:
      estudMejorNota(examen, salida2);
      break;
    case 7:
      chicas(examen, salida2);
      break;
    case 8:
      listarEstudiantes(examen, salida2);
      break;
    }
};
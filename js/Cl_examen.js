
export default class Cl_examen {
    constructor(valor, minAprueba) {
        this._valor = valor;
        this._minAprueba = minAprueba;
        this.estudiantes = [];
    }
    set valor(valor) {
        this._valor = +valor;
    }
    get valor() {
        return this._valor;
    }
    set minAprueba(minAprueba) {
        this._minAprueba = +minAprueba;
    }
    get minAprueba() {
        return this._minAprueba;
    }

    modificarEstudiante(cedula, nuevoNombre, nuevaCedula, nuevoSexo, nuevaNota) {
        cedula = +cedula;
        for (let i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].cedula === cedula) {
                // Solo modificar si se ingresó un nuevo valor
                if (nuevoNombre !== "") this.estudiantes[i].nombre = nuevoNombre;
                if (nuevaCedula !== "") this.estudiantes[i].cedula = nuevaCedula;
                if (nuevoSexo !== "") this.estudiantes[i].sexo = nuevoSexo;
                if (nuevaNota !== "") this.estudiantes[i].nota = nuevaNota;
                return true;
            }
        }
        return false;
    }    

    agregarEstudiante(estudiantes) {
        this.estudiantes.push(estudiantes);
    }
    
    eliminarEstudiante(cedula) {
        cedula = +cedula;
        let indexEstudiante = -1;
        for (let i = 0; i < this.estudiantes.length; i++) 
            if (this.estudiantes[i].cedula == cedula) indexEstudiante = i;
        if (indexEstudiante != -1) this.estudiantes.splice(indexEstudiante, 1);
        return indexEstudiante != -1;
    }
    
    porcentajeAprobados() {
        let aprobados = 0;
        for (let i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i]._nota >= this._minAprueba) aprobados++;
        }
        return (aprobados / this.estudiantes.length )  *  100;
    }
    porcentajeReprobados() {
        let reprobados = 0;
        for (let i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i]._nota <= this._minAprueba) reprobados++;
        }
        return (reprobados / this.estudiantes.length)  *  100;
    }

    estudianteMejorNota() {
        let mejorNota = 0;
        let estudianteMejorNota = null;
        for (let i = 0; i < this.estudiantes.length; i++) {
            if (this.estudiantes[i].nota > mejorNota) {
                mejorNota = this.estudiantes[i].nota;
                estudianteMejorNota = this.estudiantes[i];
            }
        }
        return estudianteMejorNota;
    }

    promedioNotas() {
        let suma = 0;
        for(let estudiante of this.estudiantes) {
            suma += estudiante.nota;
        }
        return suma / this.estudiantes.length;
    }

    chicasPorEncimaDeLaNotaPromedio() {
        const promedio = this.promedioNotas();
        return this.estudiantes.filter(estudiante => estudiante.sexo == 'F' && estudiante.nota > promedio);
    }
}

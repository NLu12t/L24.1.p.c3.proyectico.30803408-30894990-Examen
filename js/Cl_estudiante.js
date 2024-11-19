export default class Cl_estudiante {
    constructor(nombre, cedula, sexo, nota){
        this._nombre = nombre;
        this._cedula = cedula;
        this._sexo = sexo;
        this._nota = nota;
    }

    set nombre(nombre){
        this._nombre = nombre;
    }
    get nombre(){
        return this._nombre;
    }
    set cedula(cedula){ 
        this._cedula = +cedula;
    }
    get cedula(){
        return this._cedula;
    }
    set sexo(sexo){ 
        this._sexo = sexo;
    }
    get sexo(){
        return this._sexo;
    }
    set nota(nota){ 
        this._nota =+ nota;
    }
    get nota(){
        return this._nota;
    }
}
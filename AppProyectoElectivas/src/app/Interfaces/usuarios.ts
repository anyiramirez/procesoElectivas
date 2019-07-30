export class Usuarios {
    constructor(
        NombreCompleto : string,
        correo: string,
        datosCompletos: string,
        estado: string,
        fcreacion: string,
        foto: string,
        id: string,
        rol: string,
        ultAcc: string,

    ){
    this.NombreCompleto=NombreCompleto;
    this.datosCompletos=datosCompletos;
    this.estado=estado;
    this.fcreacion=fcreacion;
    this.foto=foto;
    this.id=id;
    this.correo=correo;
    this.rol=rol;
    this.ultAcc=ultAcc;
    }
    NombreCompleto : string;
    correo: string;
    datosCompletos: string;
    estado: string;
    fcreacion: string;
    foto: string;
    id: string;
    rol: string;
    ultAcc: string;
}

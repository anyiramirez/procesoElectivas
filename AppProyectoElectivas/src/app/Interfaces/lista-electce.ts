export class ListaElectCE {
    constructor( 
        nombreElectiva:string,
        cupos?:any,
        estudiantes?:any[],
 
        ){
        this.nombreElectiva = nombreElectiva;
        this.cupos = cupos ;
        this.estudiantes = estudiantes;
 
        
    }

    nombreElectiva:string;
    cupos?:any;
    estudiantes?:any[];
}
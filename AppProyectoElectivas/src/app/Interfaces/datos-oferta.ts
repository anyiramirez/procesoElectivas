import { transition } from '@angular/animations';

export class DatosOferta {
    constructor( fechaInicio:Date,fechaFin:Date,anio:string, periodo:string ){
        this.fechaFin=fechaFin;
        this.fechaInicio=fechaInicio;
        this.periodo=periodo;
        this.anio=anio;
    }
    fechaInicio:Date;
    fechaFin:Date;
    anio:string;
    periodo:string; 
}


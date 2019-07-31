import { Component, OnInit } from '@angular/core';
import { RegistroDatosService } from '../../Services/registro-datos.service'
import { ExcelService } from '../../Services/excel.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
   
lista = new Array();
periodos: string[] = ["2019_02"]; // luego se reemplazara con una lista de periodos
  constructor(private registro: RegistroDatosService,private excelService:ExcelService) { 
    this.obtenerDatosRechazados();
  }

  ngOnInit() {
  }
  
  obtenerperiodosAcademicos(){}

  obtenerDatosRechazados(){
    this.registro.obtenerReporteRechazados().subscribe(res=>{
      this.lista = new Array();
      console.log(res[0]);
      for(var key in res){
        this.lista.push(res[key]);
      }
    });
  }
  DescargarExcelRechazados (id:string){
   this.excelService.exportAsExcelFile(this.lista, id + "_Archivo_Rechazados");
  }
}

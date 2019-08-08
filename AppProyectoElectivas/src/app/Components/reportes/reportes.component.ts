import { Component, OnInit } from '@angular/core';
import { RegistroDatosService } from '../../Services/registro-datos.service'
import { ExcelService } from '../../Services/excel.service';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
listaperiodosRechazados = new Array();  
lista = new Array();
  constructor(private registro: RegistroDatosService,private excelService:ExcelService) { 
    this.llenarListaIdRtechazados();
  }

  ngOnInit() {
  }
  
  llenarListaIdRtechazados(){
    this.registro.obtenerListasRechazados().subscribe(res=>{
      this.listaperiodosRechazados = new Array();
      for(var key in res){
        this.listaperiodosRechazados.push(res[key]);
      }
      console.log(this.listaperiodosRechazados);
    });
  }
  DescargarExcelRechazados(id:string){
    this.registro.InformacionRechazadosPeriodo(id).subscribe(res=>{
      this.lista = new Array();
      for(var key in res){
        this.lista.push(res[key]);
      }
      this.excelService.exportAsExcelFile(this.lista, id + "_Archivo_Rechazados");
    });
  }
}

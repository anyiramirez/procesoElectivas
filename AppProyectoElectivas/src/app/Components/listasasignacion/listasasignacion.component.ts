import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { ExcelService } from '../../Services/excel.service';
import { ListaElectCE} from '../../Interfaces/lista-electce';

@Component({
  selector: 'app-listasasignacion',
  templateUrl: './listasasignacion.component.html',
  styleUrls: ['./listasasignacion.component.css']
})
export class ListasasignacionComponent implements OnInit {
  @Output() vistaelectiva: EventEmitter<any> = new EventEmitter<any>();
  infoElectiva: any;
  electivas = new Array();
  lista: any[];

  constructor(private registrar:RegistroDatosService,private excelService:ExcelService) { 
    this.listarE();
  }
  ngOnInit() {
  }

  cambioVistaElectiva(electivaSeleccionada: any){
    console.log("listaasignacion ruta", electivaSeleccionada)
    this.infoElectiva = electivaSeleccionada;
    this.vistaelectiva.emit(this.infoElectiva);
  }

  listarE(){
   this.registrar.obtenerElectivasCE().subscribe(res => {
    this.electivas = new Array();
    this.registrar.solElectCE= res as ListaElectCE[];
    for(var key in res){
      this.electivas.push(res[key]);
    }

   }); 
  }
  DescargarE(id: number, name: string){
    console.log(id);
    console.log(name);
    this.lista=this.registrar.solElectCE[id].estudiantes;
    this.excelService.exportAsExcelFile(this.lista,"Electiva-"+name);
   }

  

}

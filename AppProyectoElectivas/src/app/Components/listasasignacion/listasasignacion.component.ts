import { Component, OnInit } from '@angular/core';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { ExcelService } from '../../Services/excel.service';
import { ListaElectCE} from '../../Interfaces/lista-electce';

@Component({
  selector: 'app-listasasignacion',
  templateUrl: './listasasignacion.component.html',
  styleUrls: ['./listasasignacion.component.css']
})
export class ListasasignacionComponent implements OnInit {
  electivas = new Array();
  lista;

  constructor(private registrar:RegistroDatosService,private excelService:ExcelService) { 
    this.listarE();
  }

  ngOnInit() {
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

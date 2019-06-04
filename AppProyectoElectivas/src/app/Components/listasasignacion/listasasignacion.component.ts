import { Component, OnInit } from '@angular/core';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { ListaElectCE} from '../../Interfaces/lista-electce';

@Component({
  selector: 'app-listasasignacion',
  templateUrl: './listasasignacion.component.html',
  styleUrls: ['./listasasignacion.component.css']
})
export class ListasasignacionComponent implements OnInit {
  electivas = new Array();


  constructor(private registrar:RegistroDatosService) { 
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

  

}

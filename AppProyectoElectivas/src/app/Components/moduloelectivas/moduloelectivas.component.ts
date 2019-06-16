import { Component, OnInit } from '@angular/core';
import { Electivas} from '../../Interfaces/electivas';
import { RegistroDatosService} from '../../Services/registro-datos.service';

@Component({
 selector: 'app-moduloelectivas',
 templateUrl: './moduloelectivas.component.html',
 styleUrls: ['./moduloelectivas.component.css']
})

export class ModuloelectivasComponent implements OnInit {
  electivas:any={};
  
  constructor(private registrar:RegistroDatosService) 
  {
  }

  getElectivas(){
    this.electivas.programa = "";
    if (this.electivas.piet){
      this.electivas.programa = this.electivas.programa + "PIET ";
    }
    if (this.electivas.pis){
      this.electivas.programa = this.electivas.programa + "PIS "
    }
    if (this.electivas.pia){
      this.electivas.programa = this.electivas.programa + "PIAI"
    }
    this.electivas.piet = null;
    this.electivas.pis = null;
    this.electivas.pia = null;
  }
  
  registrarElectivas(){

    this.getElectivas();    
    this.registrar.saveElectivas(this.electivas).
    subscribe
    (
      res => {
        console.log("respuesta del servidor: ",res);
      },
      res =>{
        console.log(this.electivas);
        console.error(res);
        alert("Error en el registro ");
      }
      )
      
    }
    
    ngOnInit() {
    }
    
    
  }
  
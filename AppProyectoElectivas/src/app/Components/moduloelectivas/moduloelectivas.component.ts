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
  
  registrarElectivas(){
    
    //this.electivas = new Electivas("","","","");
    this.registrar.saveElectivas(this.electivas).
    subscribe
    (
      res => {
        console.log("respuesta del servidor: ",res);
        
        //  this.router.navigate(['perfil']);
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
  
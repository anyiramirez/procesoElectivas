import { Component, OnInit } from '@angular/core';
import { Electivas} from '../../Interfaces/electivas';
import { RegistroDatosService} from '../../Services/registro-datos.service';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-moduloelectivas',
  templateUrl: './moduloelectivas.component.html',
  styleUrls: ['./moduloelectivas.component.css']
})
export class ModuloelectivasComponent implements OnInit {
  electivas:any={};
  
  foods: Food[] = [
    {value: 'teorico', viewValue: 'Teórico'},
    {value: 'practico', viewValue: 'Práctico'},
    {value: 'teoPract', viewValue: 'Teorico Práctico'}
  ];
  
  constructor(private registrar:RegistroDatosService) 
  {
    
   }
  ngOnInit() {
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
  

  
  
}

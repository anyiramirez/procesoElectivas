import { Component, OnInit } from '@angular/core';
import { Electivas} from '../../Interfaces/electivas';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
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
  nombreCampo;
  contenidoCampo;
  programaCampo;
  tipoCampo;
  nombreFormControl;
  contenidoFormControl;
  programaFormControl;
  tipoFormControl;
  
  
  constructor(private registrar:RegistroDatosService,private router:Router) 
  {
    
   }
  ngOnInit() {
    this.nombreFormControl = new FormControl('', [
      Validators.required,     
    ]);
    this.contenidoFormControl = new FormControl('', [
      Validators.required,     
    ]);
    this.programaFormControl = new FormControl('', [
      Validators.required,     
    ]);
    this.tipoFormControl = new FormControl('', [
      Validators.required,     
    ]);
  }
  registrarElectivas(){
    
    //this.electivas = new Electivas("","","","");
    if(this.nombreFormControl.hasError('required')){
      this.nombreCampo=true;}
      else{this.nombreCampo=false;
    }
    if(this.contenidoFormControl.hasError('required')){
      this.contenidoCampo=true;}
      else{this.contenidoCampo=false;
    }
    if(this.electivas.programa === 'PIET' ||this.electivas.programa === 'PIAI'||this.electivas.programa === 'PIS'||this.electivas.programa === 'PIET-PIAI-PIS' )
    {this.programaCampo=false; }
    else{ this.programaCampo=true; 
    }
    if(this.electivas.tipo === 'Teorica' ||this.electivas.tipo === 'Practica'||this.electivas.tipo === 'teoricoPractica')
    {this.tipoCampo=false; }
    else{ this.tipoCampo=true; 
    }
              
      if(!this.nombreCampo &&!this.contenidoCampo && !this.programaCampo && !this.tipoCampo)
      {  
         alert("Datos guardados");
         this.registrar.saveElectivas(this.electivas).
         subscribe
         (
         res => {
         alert("Electiva registrada ");
         this.router.navigate(['/GestionElectivas']);
      },
    
      err =>{
        console.log(this.electivas);
        console.error(err);
        alert("Error en el registro ");
      }
    
      )
      
    }else{
      alert("Error en el registro");
    }
  }
  

  
  
}

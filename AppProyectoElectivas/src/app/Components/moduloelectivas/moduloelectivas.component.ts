import { Component, OnInit } from '@angular/core';
import { Electivas} from '../../Interfaces/electivas';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-moduloelectivas',
  templateUrl: './moduloelectivas.component.html',
  styleUrls: ['./moduloelectivas.component.css']
})

export class ModuloelectivasComponent implements OnInit {
  electivas:any={};
  electivasRegistradas = new Array();
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
    this.listarElectivas();
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
  
  getElectivas(){
    this.electivas.programa = '';
    if (this.electivas.piet){
      this.electivas.programa = this.electivas.programa + 'PIET ';
    }
    if (this.electivas.pis){
      this.electivas.programa = this.electivas.programa + 'PIS '
    }
    if (this.electivas.pia){
      this.electivas.programa = this.electivas.programa + 'PIAI'
    }
    this.electivas.piet = null;
    this.electivas.pis = null;
    this.electivas.pia = null;
  }
  
  registrarElectivas(){
    
    this.getElectivas();
    
    if(this.nombreFormControl.hasError('required')){
      this.nombreCampo=true;
    }else{ this.nombreCampo=false; }
    if(this.contenidoFormControl.hasError('required')){
      this.contenidoCampo=true;
    }else{ this.contenidoCampo=false; }
    if(this.electivas.programa === ''){
      this.programaCampo=true; 
    }else{ this.programaCampo=false; }
    if(this.electivas.tipo === 'Teorica' ||this.electivas.tipo === 'Practica'||this.electivas.tipo === 'teoricoPractica'){
      this.tipoCampo=false; 
    }else{ this.tipoCampo=true; }
    
    if(!this.nombreCampo && !this.contenidoCampo && !this.programaCampo && !this.tipoCampo){  
      alert("Electiva registrada");
      this.registrar.saveElectivas(this.electivas).
      subscribe
      (
        res => {
          alert("Electiva registrada ");
          this.router.navigate(['/GestionElectivas']);
        }
        )
        
    }else{
      alert("Error en el registro");
    }
  }
  listarElectivas(){
    this.registrar.obtenerInformacionElectivas().subscribe(res => {
      this.electivasRegistradas=new Array();
      //this.registrar.electivas= res as Electivas[];
      for(let p in res){  
        this.electivasRegistradas.push(res[p]);
      }
        
      }
    );
      
  }
    
}
  
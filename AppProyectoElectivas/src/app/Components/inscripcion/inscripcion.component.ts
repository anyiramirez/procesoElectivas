import { Component, OnInit } from '@angular/core';
import { Electivas} from '../../Interfaces/electivas';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})

export class InscripcionComponent implements OnInit {
  
  inscripcion:any={};
  electivasRegistradas = new Array();
  electivasDos = new Array();
  electivasTres= new Array();
  electivasCuatro= new Array();
  electivasCinco= new Array();
  nombresCampo;
  apellidosCampo;
  codigoCampo;
  programaCampo;
  opcion1Campo;
  nombresFormControl;
  apellidosFormControl;
  codigoFormControl;
  programaFormControl;
  opcion1FormControl;
  constructor(private registrar:RegistroDatosService,private router:Router) {
   
   
   }

  ngOnInit() {
    this.nombresFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.apellidosFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.codigoFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.programaFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.opcion1FormControl = new FormControl('', [
      Validators.required,
    ]);
  }
  registrarInscripcion(){
    if(this.nombresFormControl.hasError('required')){
      this.nombresCampo=true;
    }else{ this.nombresCampo=false; }
    if(this.apellidosFormControl.hasError('required')){
      this.apellidosCampo=true;
    }else{ this.apellidosCampo=false; }
    if(this.codigoFormControl.hasError('required')){
      this.codigoCampo=true;
    }else{ this.codigoCampo=false; }
    if(this.inscripcion.programa=== 'PIS' ||this.inscripcion.programa === 'PIAI'||this.inscripcion.programa === 'PIET'){
      this.programaCampo=false;
    }else{ this.programaCampo=true; }
    
    if(this.opcion1FormControl.hasError('required')){
      this.opcion1Campo=true;
    }else{ this.opcion1Campo=false; }
    if(this.inscripcion.opcion2==null){
      this.inscripcion.opcion2="";
    }
    if(this.inscripcion.opcion3==null){
      this.inscripcion.opcion3 ="";
    }
    if(this.inscripcion.opcion4==null){
      this.inscripcion.opcion4 ="";
    }
    if(this.inscripcion.opcion5==null){
      this.inscripcion.opcion5 ="";
    }
    if(!this.nombresCampo && !this.apellidosCampo && !this.codigoCampo && !this.programaCampo && !this.opcion1Campo){
      this.inscripcion.usuario= "anyiramirez@unicauca.edu.co";
      
      this.registrar.saveRegistrarInscripcion(this.inscripcion).subscribe(res => {
        alert(res);
        //this.listarElectivas();
       // this.limpiarModal();
        //this.router.navigate(['/GestionElectivas']);
      })
    }else{
      alert("Error en el registro");
    }

    
    

  }
  listarPrimeraOpcion(varProgram:string){
    debugger;
    this.registrar.obtenerElectivasOfertadas(varProgram).subscribe(res => {
      this.electivasRegistradas=new Array();
      this.registrar.electivas= res as Electivas[];
        for(let p in res){
          debugger;
          this.electivasRegistradas.push(res[p]);
          debugger;
        }
        
      }
      );

  }
  listarSegundaOpcion(){
    for(let i in this.electivasRegistradas){
      if(this.electivasRegistradas[i]!=this.inscripcion.opcion1){
    
        this.electivasDos.push(this.electivasRegistradas[i]);

      }
    }

  }
  listarTerceraOpcion(){
    for(let e in this.electivasDos){
      if(this.electivasDos[e]!=this.inscripcion.opcion2){
        
        this.electivasTres.push(this.electivasDos[e]);
      }
    
    }
  }
  listarCuartaOpcion(){
    for(let e in this.electivasTres){
      if(this.electivasTres[e]!=this.inscripcion.opcion3){
      
        this.electivasCuatro.push(this.electivasTres[e]);
      }
    
    }

  }
  listarQuintaOpcion(){
    for(let e in this.electivasCuatro){
      if(this.electivasCuatro[e]!=this.inscripcion.opcion4){
        
        this.electivasCinco.push(this.electivasCuatro[e]);
      }
    
    }

  }
 
}

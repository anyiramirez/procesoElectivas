import { Component, OnInit, Input } from '@angular/core';
import { Electivas} from '../../Interfaces/electivas';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { DISABLED } from '@angular/forms/src/model';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { LoginService} from '../../Services/login.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})

export class InscripcionComponent implements OnInit {
  durationInSeconds=5;
  inscripcion:any={};
  info:any;
  electivasRegistradas = new Array();
  electivasDos = new Array();
  electivasTres= new Array();
  electivasCuatro= new Array();
  electivasCinco= new Array();
  electivasSeis = new Array();
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

  opcionesElec: boolean;
  
  habilitarop2: boolean = true;
  habilitarop3: boolean = true;
  habilitarop4: boolean = true;
  habilitarop5: boolean = true;
  habilitarop6: boolean = true;

  texto: any;
  nuevoTexto: any;
  
  constructor(private _snackBar: MatSnackBar,private registrar:RegistroDatosService,private router:Router,private servicioLogin: LoginService) {   
  }
  
  ngOnInit() {
    this.servicioLogin.obtenerDatosUsuario().subscribe(res => {
      this.info=res;
         
    });
    
    this.nombresFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.nombresFormControl = new FormControl('', [
      Validators.pattern("[A-Za-z ]+"),
    ]);
    this.apellidosFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.apellidosFormControl = new FormControl('', [
      Validators.pattern("[A-Za-z ]+"),
    ]);
    this.codigoFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.codigoFormControl = new FormControl('', [
      Validators.pattern("^[0-9]+"),
    ]);
    this.programaFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.opcion1FormControl = new FormControl('', [
      Validators.required,
    ]);
  }
  openSnackBar() {
    this._snackBar.openFromComponent(mensajeExitoInscripcion, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openErrorkBar() {
    this._snackBar.openFromComponent(mensajeErroInscripcion, {
      duration: this.durationInSeconds * 1000,
    });
  }
  registrarInscripcion(){
    if(this.nombresFormControl.hasError('required')){
      this.nombresCampo=true;
    }else if(this.nombresFormControl.hasError('pattern')){
      this.nombresCampo=true;
    }else
    { this.nombresCampo=false; }
    if(this.apellidosFormControl.hasError('required')){
      this.apellidosCampo=true;
    }else if(this.apellidosFormControl.hasError('pattern')){
      this.apellidosCampo=true;
    }else
    { this.apellidosCampo=false; }
    if(this.codigoFormControl.hasError('required')){
      this.codigoCampo=true;
    }else if(this.codigoFormControl.hasError('pattern')){
      this.codigoCampo=true;
    }else
    { this.codigoCampo=false; }
    if(this.inscripcion.programa=== 'PIS' ||this.inscripcion.programa === 'PIAI'||this.inscripcion.programa === 'PIET'){
      this.programaCampo=false;
    }else{ this.programaCampo=true; }
    
    if(this.opcion1FormControl.hasError('required')){
      this.opcion1Campo=true;
    }else{ 
      this.opcion1Campo=false;
    }
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
      this.inscripcion.usuario=this.info.correo;
      this.inscripcion.nombres = this.MayusculaPrimera(this.inscripcion.nombres );
      this.inscripcion.apellidos = this.MayusculaPrimera(this.inscripcion.apellidos );

      
      this.registrar.saveRegistrarInscripcion(this.inscripcion).subscribe(res => {
      this.openSnackBar();
       
      })
    }else{
    this.openErrorkBar();
    
    }    
  }
  listarPrimeraOpcion(varProgram:string){
    this.registrar.obtenerElectivasOfertadas(varProgram).subscribe(res => {
      this.electivasRegistradas=new Array();
      this.registrar.electivas= res as Electivas[];
      for(let p in res){
        this.electivasRegistradas.push(res[p]);
      }
      this.habilitarop2 = false; 
    }
    );
    
  }
  listarSegundaOpcion(){
    for(let i in this.electivasRegistradas){
      if(this.electivasRegistradas[i]!=this.inscripcion.opcion1){
        this.electivasDos.push(this.electivasRegistradas[i]);
      }
    }
    this.habilitarop3 = false;
  }
  listarTerceraOpcion(){
    for(let e in this.electivasDos){
      if(this.electivasDos[e]!=this.inscripcion.opcion2){
        this.electivasTres.push(this.electivasDos[e]);
      }
    }
    this.habilitarop4 = false;
  }
  listarCuartaOpcion(){
    for(let e in this.electivasTres){
      if(this.electivasTres[e]!=this.inscripcion.opcion3){
        this.electivasCuatro.push(this.electivasTres[e]);
      }
    }
    this.habilitarop5= false;
  }
  listarQuintaOpcion(){
    for(let e in this.electivasCuatro){
      if(this.electivasCuatro[e]!=this.inscripcion.opcion4){
        this.electivasCinco.push(this.electivasCuatro[e]);
      }
    }
    this.habilitarop6 = false;
  }

  listarSextaOpcion(){
    for(let e in this.electivasCinco){
      if(this.electivasCinco[e]!=this.inscripcion.opcion5){
        this.electivasSeis.push(this.electivasCinco[e]);
      }
    }
  }

  mostrarOpciones(programaSeleccionado: string){
    if(programaSeleccionado === 'PIS'){
      this.opcionesElec = true;
    }
    else{
      this.opcionesElec = false;
    }
  }

  MayusculaPrimera(palabra:string){
    this.nuevoTexto = "";
    palabra = palabra.toLowerCase();

    this.texto = palabra.split(' ');
    for(let i in this.texto){
      palabra = this.texto[i];
      palabra = palabra.charAt(0).toUpperCase() + palabra.slice(1) + " ";
      this.nuevoTexto = this.nuevoTexto + palabra;
    }
    this.nuevoTexto = this.nuevoTexto.substring(0, this.nuevoTexto.length-1);
    return this.nuevoTexto;
  }
  
}
@Component({
  selector: 'mensajeExitoInscripcion',
  templateUrl: './mensajeExitoInscripcion.html',
  
})
export class mensajeExitoInscripcion{}
@Component({
  selector: 'mensajeErrorInscripcion',
  templateUrl: './mensajeErrorInscripcion.html',
  
})
export class mensajeErroInscripcion{}
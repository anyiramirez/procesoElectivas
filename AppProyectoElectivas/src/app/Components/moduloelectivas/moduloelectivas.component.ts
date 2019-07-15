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
  varPrograma:any={};
  electivas:any={};
  objeto:any={};
  nombreAntiguo:any;
  electivasRegistradas = new Array();
  nombreCampo;
  contenidoCampo;
  departamentoCampo;
  tipoCampo;
  nombreFormControl;
  contenidoFormControl;
  programaFormControl;
  tipoFormControl;
  nombreEditarCampo;
  contenidoEditarCampo;
  programaEditarCampo;
  tipoEditarCampo;
  nombreEditarFormControl;
  contenidoEditarFormControl;
  programaEditarFormControl;
  tipoEditarFormControl;
  
  
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
    if (this.varPrograma.piet){
      this.electivas.programa = this.electivas.programa + 'PIET';
    }
    if (this.varPrograma.piet && this.varPrograma.piai){
      this.electivas.programa = this.electivas.programa +'-';
    }
    if (this.varPrograma.piai){
      this.electivas.programa = this.electivas.programa + 'PIAI'
    }
    if ((this.varPrograma.piai && this.varPrograma.pis) || (this.varPrograma.piet && this.varPrograma.pis)){
      this.electivas.programa = this.electivas.programa +'-';
    }
    if (this.varPrograma.pis){
      this.electivas.programa = this.electivas.programa + 'PIS'
    }

    
    this.varPrograma.piet = false;
    this.varPrograma.pis = false;
    this.varPrograma.piai = false;
  }
  getEditarElectivas(){
    this.objeto.Programa = '';
    console.log("piet: ",this.varPrograma.piet);
    if (this.varPrograma.piet){
      
      this.objeto.Programa = this.objeto.Programa + 'PIET';
      console.log(this.objeto.Programa);
    }
    if (this.varPrograma.piet && this.varPrograma.piai){

      this.objeto.Programa = this.objeto.Programa +'-';
      console.log(this.objeto.Programa);
    }
    if (this.varPrograma.piai){
      this.objeto.Programa = this.objeto.Programa + 'PIAI'
      console.log(this.objeto.Programa);
    }
    if ((this.varPrograma.piai && this.varPrograma.pis) || (this.varPrograma.piet && this.varPrograma.pis)){
      this.objeto.Programa = this.objeto.Programa +'-';
      console.log(this.objeto.Programa);
    }
    if (this.varPrograma.pis){
      this.objeto.Programa = this.objeto.Programa + 'PIS'
      console.log(this.objeto.Programa);
    }
    console.log("programas:",this.objeto.Programa);
    this.varPrograma.piet = false;
    this.varPrograma.pis = false;
    this.varPrograma.piai = false;
  }
 
  
  registrarElectivas(){
    
     
    if(this.nombreFormControl.hasError('required')){
      this.nombreCampo=true;
    }else{ this.nombreCampo=false; }
    if(this.contenidoFormControl.hasError('required')){
      this.contenidoCampo=true;
    }else{ this.contenidoCampo=false; }
    if(this.electivas.programa === ''){
      this.departamentoCampo=true;
    }else{ this.departamentoCampo=false; }
    if(this.electivas.tipo === 'Teórica' ||this.electivas.tipo === 'Práctica'||this.electivas.tipo === 'Teórico Práctica'){
      this.tipoCampo=false;
    }else{ this.tipoCampo=true; }
    if(!this.nombreCampo && !this.contenidoCampo && !this.departamentoCampo && !this.tipoCampo){
      this.electivas.estado = 'Habilitar';
      this.registrar.saveElectivas(this.electivas).subscribe(res => {
        alert(res);
        this.listarElectivas();
        this.limpiarModal();
        this.router.navigate(['/GestionElectivas']);
      })
    }else{
      alert("Error en el registro");
    }
    this.listarElectivas();
    
  }
  editarElectivas(){
    
    //this.getEditarElectivas();
    if(this.nombreFormControl.hasError('required')){
      this.nombreCampo=true;
    }else{ this.nombreCampo=false; }
    if(this.contenidoFormControl.hasError('required')){
      this.contenidoCampo=true;
    }else{ this.contenidoCampo=false; }
    if(this.objeto.Programa === ''){
      this.departamentoCampo=true;
    }else{ this.departamentoCampo=false; }
    
    if(this.objeto.TipoElectiva === 'Teórica' ||this.objeto.TipoElectiva === 'Práctica'||this.objeto.TipoElectiva === 'Teórico Práctica'){
      this.tipoCampo=false;
    }else{ this.tipoCampo=true; }
    if(!this.nombreCampo && !this.contenidoCampo && !this.departamentoCampo && !this.tipoCampo){

      this.registrar.editarElectiva(this.nombreAntiguo,this.objeto).subscribe(res => {

        alert(res);
        this.listarElectivas();
        this.limpiarModal();
        this.router.navigate(['/GestionElectivas']);
      })
    }else{
      alert("Error en el registro");
    }
    
  }
  
  
  limpiarModal(){
    this.electivas.nombre= '';
    this.electivas.contenido = '';
    this.electivas.tipo = '';
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
  obtenerElectiva(nombre){
    
  this.registrar.obtenerDatosNombreElectiva(nombre).subscribe(res=>
    {
      //this.objeto = res;
      this.varPrograma.piai = false;
      this.varPrograma.pis = false;
      this.varPrograma.piet = false;
      for(let e in this.electivasRegistradas){
      if(nombre==this.electivasRegistradas[e].nombre){
      var objElectiva = new Electivas(this.electivasRegistradas[e].nombre,this.electivasRegistradas[e].contenido,this.electivasRegistradas[e].programa,this.electivasRegistradas[e].tipo);
      this.nombreAntiguo= objElectiva.NombreElectiva;
      this.objeto= objElectiva;
      if(this.objeto.Programa.indexOf('PIS')>-1)
      {
        this.varPrograma.pis = true;
      }
      if(this.objeto.Programa.indexOf('PIAI')>-1)
      {
        this.varPrograma.piai = true;
      }
      if(this.objeto.Programa.indexOf('PIET')>-1)
      {
        this.varPrograma.piet = true;
      }
      break;
      }
      }

    }

  );

  }

  
  ActualizarEstado(nombre){
    
    this.registrar.editarEstado(nombre).subscribe(res => {
      if(res === "funciono"){
        this.listarElectivas();
      }
    });
  }
  
}
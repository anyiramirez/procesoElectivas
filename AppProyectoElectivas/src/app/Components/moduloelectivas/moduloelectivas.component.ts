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
  objeto:any={};
  nombreAntiguo:any;
  electivasRegistradas = new Array();
  nombreCampo;
  contenidoCampo;
  departamentoCampo;
  tipoCampo;
  nombreFormControl;
  contenidoFormControl;
  departamentoFormControl;
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
    this.departamentoFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.tipoFormControl = new FormControl('', [
      Validators.required,
    ]);
  }
  registrarElectivas(){

    
    if(this.nombreFormControl.hasError('required')){
      this.nombreCampo=true;
    }else{ this.nombreCampo=false; }

    if(this.contenidoFormControl.hasError('required')){
      this.contenidoCampo=true;
    }else{ this.contenidoCampo=false; }
  
    if(this.electivas.departamento === 'Electrónica instrumentación y control' ||this.electivas.departamento === 'Sistemas'||this.electivas.departamento === 'Telecomunicaciones'||this.electivas.departamento === 'Telemática'){
      this.departamentoCampo=false;
    }else{ this.tipoCampo=true; }

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
    if(this.nombreFormControl.hasError('required')){
      this.nombreCampo=true;
    }else{ this.nombreCampo=false; }

    if(this.contenidoFormControl.hasError('required')){
      this.contenidoCampo=true;
    }else{ this.contenidoCampo=false; }
   
     if(this.objeto.Departamento === 'Electrónica instrumentación y control' ||this.objeto.Departamento === 'Sistemas'||this.objeto.Departamento === 'Telecomunicaciones'||this.objeto.Departamento === 'Telemática'){
      this.departamentoCampo=false;
    }else{ this.departamentoCampo=true; }

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
    this.electivas.departamento = '';
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
      for(let e in this.electivasRegistradas){
      if(nombre==this.electivasRegistradas[e].nombre){
      var objElectiva = new Electivas(this.electivasRegistradas[e].nombre,this.electivasRegistradas[e].contenido,this.electivasRegistradas[e].departamento,this.electivasRegistradas[e].tipo);
      this.nombreAntiguo= objElectiva.NombreElectiva;
      this.objeto= objElectiva;
     
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
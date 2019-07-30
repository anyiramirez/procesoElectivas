import { Component,OnInit } from '@angular/core';
import { Electivas} from '../../Interfaces/electivas';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit{

  electivas:any={};
  durationInSeconds=5;
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
  
  constructor(private _snackBar: MatSnackBar,private registrar:RegistroDatosService,private router:Router,public dialog: MatDialog,public dialogRef: MatDialogRef<ModalComponent>)
  {
    this.listarElectivas();
  }
  ngOnInit() {
    this.nombreFormControl = new FormControl('', [
      Validators.required,
      
    ]);
    this.nombreFormControl = new FormControl('', [
      Validators.pattern("[A-Za-zñÑáéíóúÁÉÍÓÚ ]+"),
      
    ]);
    this.contenidoFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.contenidoFormControl = new FormControl('', [
      Validators.pattern("[A-Za-z ]+"),
    ]);
    this.departamentoFormControl = new FormControl('', [
      Validators.required,
      
    ]);
    this.tipoFormControl = new FormControl('', [
      Validators.required,
    ]);
  }
  openSnackBar() {
    this._snackBar.openFromComponent(mensajeExitoElectiva, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openErrorkBar() {
    this._snackBar.openFromComponent(mensajeErrorElectiva, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openErrorRepetidoBar() {
    this._snackBar.openFromComponent(mensajeErrorNombreRepetido, {
      duration: this.durationInSeconds * 1000,
    });
  }
  registrarElectivas(){
    
    if(this.nombreFormControl.hasError('required')){
      this.nombreCampo=true;
    }else if(this.nombreFormControl.hasError('pattern') ){
      
      this.nombreCampo=true;
    }else{
      this.nombreCampo=false;
    }
    if(this.contenidoFormControl.hasError('required')){
      this.contenidoCampo=true;
    }else if(this.contenidoFormControl.hasError('pattern')){
      this.contenidoCampo=true;
    }
    { this.contenidoCampo=false; }
    
    if(this.electivas.departamento === 'Electrónica instrumentación y control' ||this.electivas.departamento === 'Sistemas'||this.electivas.departamento === 'Telecomunicaciones'||this.electivas.departamento === 'Telemática'){
      this.departamentoCampo=false;
    }else{ this.departamentoCampo=true; }
    
    if(this.electivas.tipo === 'Teórica' ||this.electivas.tipo === 'Práctica'||this.electivas.tipo === 'Teórico Práctica'){
      this.tipoCampo=false;
    }else{ this.tipoCampo=true; }
    
    if(!this.nombreCampo && !this.contenidoCampo && !this.departamentoCampo && !this.tipoCampo){
      if(!this.validarElectivaUnica(this.electivas.nombre)){
        this.electivas.nombre = this.MayusculaPrimera(this.electivas.nombre);
        this.electivas.estado = 'Habilitar';
        this.registrar.saveElectivas(this.electivas).subscribe(res => {
          this.limpiarModal();
          this.dialogRef.close();
          this.openSnackBar();
        })
      }else{
        this.openErrorRepetidoBar();
       
      }
    }else{
      this.openErrorkBar();

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
  validarElectivaUnica(nuevaElectiva: any){
    var existe=false; 
    for(let i in this.electivasRegistradas) {
      if ( this.electivasRegistradas[i].nombre==nuevaElectiva) {
        existe = true;
      }
    }
    return existe;
  }
  
  MayusculaPrimera(palabra:string){
    palabra = palabra.toLowerCase();
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  }
 
  
}
@Component({
  selector: 'mensajeExitoElectiva',
  templateUrl: './mensajeExitoElectiva.html',
  
})
export class mensajeExitoElectiva{}
@Component({
  selector: 'mensajeErrorElectiva',
  templateUrl: './mensajeErrorElectiva.html',
  
})
export class mensajeErrorElectiva{}

@Component({
  selector: 'mensajeErrorNombreRepetido',
  templateUrl: './mensajeErrorNombreRepetido.html',
  
})
export class mensajeErrorNombreRepetido{}


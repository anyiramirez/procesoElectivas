import { Component, OnInit ,Inject} from '@angular/core';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {mensajeErrorElectiva,mensajeExitoElectiva,mensajeErrorNombreRepetido} from '../modal/modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
export interface DialogData {
  name: string;
  electiva: any;
  antiguo:any;
  lista:any;
}

@Component({
  selector: 'app-modal-editar-electiva',
  templateUrl: './modal-editar-electiva.component.html',
  styleUrls: ['./modal-editar-electiva.component.css']
})
export class ModalEditarElectivaComponent implements OnInit {
  electivas:any={};
  electivasRegistradas = new Array();
  nombreCampo;
  contenidoCampo;
  departamentoCampo;
  tipoCampo;
  nombreFormControl;
  contenidoFormControl;
  departamentoFormControl;
  tipoFormControl;
  durationInSeconds=5;
  
  
  constructor(private _snackBar: MatSnackBar,private registrar:RegistroDatosService,public dialog: MatDialog,public dialogRef: MatDialogRef<ModalEditarElectivaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
  {
    this.listarElectivas();
  }
  ngOnInit() {
    this.nombreFormControl = new FormControl('', [
      Validators.required,
      
    ]);
    this.nombreFormControl = new FormControl('', [
      Validators.pattern("[A-Za-z ]+"),
      
    ]);
    this.contenidoFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.contenidoFormControl = new FormControl('', [
      Validators.pattern("[A-Za-z ]+"),
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
  editarElectivas(){
    
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
    
    if(!this.nombreCampo && !this.contenidoCampo && !this.departamentoCampo && !this.tipoCampo){
      this.electivas.nombre = this.MayusculaPrimera(this.data.electiva.NombreElectiva);
      if(!this.validarNombreElectivaEdit(this.data.electiva.NombreElectiva)){
        this.registrar.editarElectiva(this.data.antiguo,this.data.electiva).subscribe(res => {
          this.dialogRef.close();
        })
      }else{
        this.openErrorRepetidoBar();
        this.data.electiva.NombreElectiva=this.data.antiguo;

      }
    }else{
     this.openErrorkBar();
    }
  }
  listarElectivas(){
    this.registrar.obtenerInformacionElectivas().subscribe(res => {
      this.electivasRegistradas=new Array();
      for(let p in res){
        this.electivasRegistradas.push(res[p]);
      }
      
    }
    );
    
  }
  validarNombreElectivaEdit(nuevoNombre: any){
    var existe=false; 
    console.log("listado ofertas",this.electivasRegistradas);
    for(let i in this.electivasRegistradas) {
      console.log(this.data.antiguo,nuevoNombre,this.electivasRegistradas[i].nombre);
    
      if ( this.electivasRegistradas[i].nombre==nuevoNombre && this.data.antiguo != nuevoNombre) {
        existe = true;
        console.log(this.data.antiguo,nuevoNombre);
      }
    }
    return existe;
  }
  MayusculaPrimera(palabra:string){
    palabra = palabra.toLowerCase();
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  }
 
  
}

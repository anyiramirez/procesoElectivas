import { Component, OnInit ,Inject} from '@angular/core';
import { Router } from '@angular/router';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

export interface DialogData {
  oferta: any;
  name: string;
}

@Component({
  selector: 'app-modal-editar-oferta',
  templateUrl: './modal-editar-oferta.component.html',
  styleUrls: ['./modal-editar-oferta.component.css'],
})
export class ModalEditarOfertaComponent implements OnInit {
  anioCampo;
  periodoAcademicoCampo;
  ofertaCampo;
  inicioCampo;
  finCampo;
  anioFormControl;
  periodoFormControl;
  ofertaFormControl;
  inicioFormControl;
  finFormControl;
  ofertaArray= new Array();
  durationInSeconds=5;
  
  constructor(private _snackBar: MatSnackBar,private registrar:RegistroDatosService,
              private router:Router,public dialog: MatDialog,
              public dialogRef: MatDialogRef<ModalEditarOfertaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData){
         
  }
  ngOnInit(){ 
    console.log("este es",this.data); 
      this.anioFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.periodoFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.inicioFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.finFormControl = new FormControl('', [
      Validators.required,
    ]);
  }
  
  openSnackBar() {
    this._snackBar.openFromComponent(mensajeEditarOferta, {
      duration: this.durationInSeconds * 1000,
    });
  }
    
  openErrorFecha() {
    this._snackBar.openFromComponent(mensajeErrorFecha, {
      duration: this.durationInSeconds * 1000,
    });
  }
  actualizarOferta(){
   
    if(this.inicioFormControl.hasError('required') || !this.validarFechaInicio(this.data.oferta.fechaInicio)){
      this.inicioCampo=true;
    }else{ this.inicioCampo=false; }
    if(this.finFormControl.hasError('required') || !this.validarFechaFin(this.data.oferta.fechaInicio,this.data.oferta.fechaFin)){
      this.finCampo=true;
    }else{ this.finCampo=false; }
    if(!this.inicioCampo && !this.finCampo){
            this.ofertaArray.push(this.data.oferta.anio,this.data.oferta.periodo,this.data.oferta.fechaFin,this.data.oferta.fechaInicio);  
            this.ofertaArray= new Array();
            this.ofertaArray.push(this.data.oferta);      
            this.registrar.editarOferta(this.ofertaArray).subscribe(res => {
            this.ofertaArray= new Array();
            
            this.dialogRef.close();
            this.openSnackBar();
          });
    }else{
      //this.openErrorkBar();
     this.openErrorFecha();
      }
  }
  
  validarFechaInicio(fechaInitFor: any){    
    var fecha = new Date();
    if ( fecha <= fechaInitFor) {
      return true;
    }
    else {
      return false;
    }
  }
  validarFechaFin(fechaInitFor: any,fechaFinFor: any){   
    if ( fechaInitFor < fechaFinFor) {
      return true;
    }
    else{
      return false;
    }
    
  }
}
@Component({
  selector: 'mensajeEditarOferta',
  templateUrl: './mensajeEditarOferta.html',
  
})
export class mensajeEditarOferta{}
@Component({
  selector: 'mensajeErrorFecha',
  templateUrl: './mensajeErrorFecha.html',
  
})
export class mensajeErrorFecha

{}

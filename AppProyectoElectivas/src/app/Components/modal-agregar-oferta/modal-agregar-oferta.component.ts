import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { Electivas} from '../../Interfaces/electivas';
import { Oferta} from '../../Interfaces/oferta'
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { DatosOferta } from '../../Interfaces/datos-oferta';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';

import * as moment from 'moment';
export interface PeriodoAcademico {
  value: string;
  viewValue: string;
}
export interface anios {
  value: number;
  viewValue: number;
}


@Component({
  selector: 'app-modal-agregar-oferta',
  templateUrl: './modal-agregar-oferta.component.html',
  styleUrls: ['./modal-agregar-oferta.component.css'],
  
})
export class ModalAgregarOfertaComponent implements OnInit {
  fecha= new Date();
  anioActual=this.fecha.getFullYear();
  ofertaAcademica=new Array();
  oferAcademica=new Array();
  electivas:any={};
  objeto:any={};
  varPrograma:any={};
  ofertas:any={};
  listaOfertas = new Array();
  obtenerOfertas = new Array();
  objOferta= new Array();
  ofertaArray= new Array();
  cantidades= new Array();
  estados = new Array();
  contador:number;
  ElectivasOfertaActual= new Array();
  nombreOfertaACtual;
  nombreElectivaCampo;
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
  
  valoresAnio: anios[] = [
    {value: this.anioActual, viewValue: this.anioActual},
    {value: this.anioActual+1, viewValue: this.anioActual+1},
    {value: this.anioActual+2, viewValue: this.anioActual+2}
  ];
  durationInSeconds=5;
  
  valores: PeriodoAcademico[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'}
    
  ];
  
  constructor(private _snackBar: MatSnackBar,private registrar:RegistroDatosService,private router:Router,public dialogRef: MatDialogRef<ModalAgregarOfertaComponent>) {
    this.listarElectivas();
    this.listarOfertas();
  }
  
  ngOnInit() {
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
  
  listarElectivas(){
    this.registrar.obtenerInformacionElectivas().subscribe(res => {
      this.electivas=new Array();
      //this.registrar.electivas= res as Electivas[];
      for(let p in res){
        if(res[p].estado=="Deshabilitar")
        {
          this.electivas.push(res[p]);
          var objetoArray = new Oferta(res[p].nombre,"");
          this.ofertaAcademica.push(objetoArray);
        }
      }
      
    }
    );
    
  }
  
  limpiarModal(){
    this.ofertas.anio= '';
    this.ofertas.periodo = '';
    this.ofertas.dateInicio = '';
    this.ofertas.dateFin = '';
  }
  
  openSnackBar() {
    this._snackBar.openFromComponent(mensajeExitoOferta, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openErrorkBar() {
    this._snackBar.openFromComponent(mensajeErrorOferta, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openErrorRepetidoBar() {
    this._snackBar.openFromComponent(mensajeErroRepetido, {
      duration: this.durationInSeconds * 1000,
    });
  }
  
  registrarOferta(){
    var marcoElectiva=false;
    var marcoProgram=true;
    
    if(this.anioFormControl.hasError('required')){
      this.anioCampo=true;
    }
    else{ this.anioCampo=false; }
    if(this.periodoFormControl.hasError('required')){
      this.periodoAcademicoCampo=true;
    }else{ this.periodoAcademicoCampo=false; }
    if(this.inicioFormControl.hasError('required') || !this.validarFechaInicio(this.ofertas.dateInicio)){
      this.inicioCampo=true;
    }else{ this.inicioCampo=false; }
    if(this.finFormControl.hasError('required') || !this.validarFechaFin(this.ofertas.dateInicio,this.ofertas.dateFin)){
      this.finCampo=true;
    }else{ this.finCampo=false; }
    if(!this.anioCampo && !this.periodoAcademicoCampo && !this.inicioCampo && !this.finCampo){
      if(!this.validarOfertaUnica(this.ofertas.anio,this.ofertas.periodo)){
        for(let i in this.ofertaAcademica) {
          if(this.ofertaAcademica[i].oferta === true){
            marcoElectiva=true;
            this.oferAcademica.push(this.ofertaAcademica[i]);    
            this.ofertaAcademica[i].programa= '';
            if (this.ofertaAcademica[i].piet){
              this.ofertaAcademica[i].programa = this.ofertaAcademica[i].programa + 'PIET';
            }
            if (this.ofertaAcademica[i].piet && this.ofertaAcademica[i].piai){
              this.ofertaAcademica[i].programa = this.ofertaAcademica[i].programa +'-';
            }
            if (this.ofertaAcademica[i].piai){
              this.ofertaAcademica[i].programa = this.ofertaAcademica[i].programa + 'PIAI'
            }
            if ((this.ofertaAcademica[i].piai && this.ofertaAcademica[i].pis) || (this.ofertaAcademica[i].piet && this.ofertaAcademica[i].pis)){
              this.ofertaAcademica[i].programa = this.ofertaAcademica[i].programa +'-';
            }
            if (this.ofertaAcademica[i].pis){
              this.ofertaAcademica[i].programa = this.ofertaAcademica[i].programa + 'PIS'
            }
            if (!this.ofertaAcademica[i].pis && !this.ofertaAcademica[i].piai && !this.ofertaAcademica[i].piet){
              marcoProgram=false;
              break;
            }
            
            this.ofertaArray.push(this.ofertas.anio,this.ofertas.periodo,this.ofertas.dateFin,this.ofertas.dateInicio,this.ofertaAcademica[i].nombre,this.ofertaAcademica[i].programa,this.ofertaAcademica[i].oferta);    
          }
          
        }
        if(marcoElectiva==false){
          alert("No ha ofertado ninguna electiva ");
        }
        else if(marcoProgram==false){
          alert("Selecione  programas asociados a la oferta"); 
        }
        else{
          this.ofertas.fechaInicio=new FormControl(moment());
          var objDatosOFerta = new DatosOferta(this.ofertas.fechaInicio, this.ofertas.fechaFin,this.ofertas.anio, this.ofertas.periodo);
          this.ofertaArray= new Array();
          this.ofertaArray.push(this.ofertas,this.oferAcademica);
          this.registrar.saveOfertaAcademica(this.ofertaArray).subscribe(res => {
            this.ofertaArray= new Array();
            
            this.limpiarModal();
            this.dialogRef.close();
            this.openSnackBar();
          });
        } 
        
      }else{
        this.openErrorRepetidoBar();
      }
    }else{
      this.openErrorkBar();
    }
  }
  
  validarOfertaUnica(nuevoAnio:any,nuevoPeriodo:any){
    var existe=false; 
    for(let i in this.listaOfertas) {
      console.log(nuevoAnio,nuevoPeriodo,"->",this.listaOfertas[i].anio,this.listaOfertas[i].periodo);
      if (this.listaOfertas[i].anio==nuevoAnio && this.listaOfertas[i].periodo==nuevoPeriodo) {
        existe = true;
      }
    }
    return existe;
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
  listarOfertas(){
    this.registrar.obtenerOfertas().subscribe(res => {
      this.obtenerOfertas= new Array();
      this.registrar.electivas= res as Electivas[];
      var band=0;
      for(let p in res){ 
        var contador = res[p].electivasOfertadas.length;
        // this.cantidad[band]=contador; {{cantidad[indice]}}
        var estado = this.estadoOferta(res[p].fechaInicio,res[p].fechaFin);
        this.cantidades[band]=contador;
        this.estados[band]=estado;
        
        this.obtenerOfertas.push(res[p]); 
        band++; 
      }
      
    });
  }
  estadoOferta(fechaInicio:any,fechaFin:any){
    var fecha = new Date(); 
    var f1= new Date(fechaInicio);
    var f2= new Date(fechaFin);
    fecha.setHours(0,0,0,0);
    if(fecha < f1){
      return "Pendiente"
    }
    if (fecha > f2){
      return "Finalizado"
    }
    else{
      return "En curso"
    }
  }
}
@Component({
  selector: 'mensajeExitoOferta',
  templateUrl: './mensajeExitoOferta.html',
  
})
export class mensajeExitoOferta{}
@Component({
  selector: 'mensajeErrorOferta',
  templateUrl: './mensajeErrorOferta.html',
  
})
export class mensajeErrorOferta{}

@Component({
  selector: 'mensajeErroRepetido',
  templateUrl: './mensajeErroRepetido.html',
  
})
export class mensajeErroRepetido{}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { Electivas} from '../../Interfaces/electivas';
import { Oferta} from '../../Interfaces/oferta'
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { DatosOferta } from '../../Interfaces/datos-oferta';
export interface PeriodoAcademico {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-modal-agregar-oferta',
  templateUrl: './modal-agregar-oferta.component.html',
  styleUrls: ['./modal-agregar-oferta.component.css']
})
export class ModalAgregarOfertaComponent implements OnInit {
  ofertaAcademica=new Array();
  oferAcademica=new Array();
  electivas:any={};
  objeto:any={};
  varPrograma:any={};
  ofertas:any={};
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
  
  valores: PeriodoAcademico[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'}
    
  ];
  
  constructor(private registrar:RegistroDatosService,private router:Router) {
    this.listarElectivas();
    
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
    this.anioFormControl = new FormControl('', [
      Validators.pattern("^[0-9]+"),
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
    
  registrarOferta(){
    
    if(this.anioFormControl.hasError('required') || !this.validarAnio(this.ofertas.anio)){
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
            this.ofertaArray.push(this.ofertas.anio,this.ofertas.periodo,this.ofertas.dateFin,this.ofertas.dateInicio,this.ofertaAcademica[i].nombre,this.ofertaAcademica[i].programa,this.ofertaAcademica[i].oferta);
            
          }
          
          
        }
        var objDatosOFerta = new DatosOferta(this.ofertas.fechaInicio, this.ofertas.fechaFin,this.ofertas.anio, this.ofertas.periodo);
        this.ofertaArray= new Array();
        this.ofertaArray.push(this.ofertas,this.oferAcademica);
        this.registrar.saveOfertaAcademica(this.ofertaArray).subscribe(res => {
          this.ofertaArray= new Array();
          alert(res);
          this.limpiarModal();
        });
      }else{
        alert("Error en el registro, Oferta ya existe ");
      }
    }else{
      alert("Error en el registro, Dato no valido ");
    }
    this.listarElectivas();
  }
  
  validarOfertaUnica(nuevoAnio:any,nuevoPeriodo:any){
    var existe=false; 
    for(let i in this.obtenerOfertas) {
      if ( this.obtenerOfertas[i].anio==nuevoAnio && this.obtenerOfertas[i].periodo==nuevoPeriodo) {
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
  
  validarAnio(anioFor:any){
    var fecha = new Date();
    var aniofecha = fecha.getFullYear();
    if ( aniofecha <= anioFor) {
      return true;
    }
    else {
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
  
  detalleOferta(id: number){
    this.ElectivasOfertaActual=this.obtenerOfertas[id].electivasOfertadas;
    this.nombreOfertaACtual=this.obtenerOfertas[id].anio+"/"+this.obtenerOfertas[id].periodo; 
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

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { Electivas} from '../../Interfaces/electivas';
import { Oferta} from '../../Interfaces/oferta'
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { DatosOferta } from '../../Interfaces/datos-oferta';

@Component({
  selector: 'app-oferta-academica',
  templateUrl: './oferta-academica.component.html',
  styleUrls: ['./oferta-academica.component.css']
})
export class OfertaAcademicaComponent implements OnInit {
  ofertaAcademica=new Array();
  oferAcademica=new Array();
  electivas:any={};
  objeto:any={};
  varPrograma:any={};
  contador:number;
  cantidad=new Array();
  ofertas:any={};
  ElectivasOfertaActual= new Array();
  nombreOfertaACtual;
  obtenerOfertas = new Array();
  objOferta= new Array();
  ofertaArray= new Array();
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





  constructor(private registrar:RegistroDatosService,private router:Router) {
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
      console.log(this.electivas,"tamanio del array guardar: ",this.ofertaAcademica.length);

    }
    );

  }
  listarOfertas(){
    this.registrar.obtenerOfertas().subscribe(res => {
      this.obtenerOfertas= new Array();
      //this.registrar.electivas= res as Electivas[];
      var band=0;
      for(let p in res){                    
             var contador= res[p].electivasOfertadas.length;
             this.cantidad[band]=contador;
             this.obtenerOfertas.push(res[p]); 
             band++; 
      }

    });
  }
  
  detalleOferta(id: number){
    this.ElectivasOfertaActual=this.obtenerOfertas[id].electivasOfertadas;
    this.nombreOfertaACtual=this.obtenerOfertas[id].anio+"/"+this.obtenerOfertas[id].periodo; 
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
    if(this.inicioFormControl.hasError('required') || !this.validarFechas(this.ofertas.dateInicio)){
      this.inicioCampo=true;
    }else{ this.inicioCampo=false; }
    if(this.finFormControl.hasError('required') || !this.validarFechas(this.ofertas.dateFin)){
      this.finCampo=true;
    }else{ this.finCampo=false; }
    if(!this.anioCampo && !this.periodoAcademicoCampo && !this.inicioCampo && !this.finCampo){
    for(let i in this.ofertaAcademica){
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
   //
    var objDatosOFerta = new DatosOferta(this.ofertas.fechaInicio, this.ofertas.fechaFin,this.ofertas.anio, this.ofertas.periodo);
    this.ofertaArray= new Array();
    this.ofertaArray.push(this.ofertas,this.oferAcademica);
    this.registrar.saveOfertaAcademica(this.ofertaArray).subscribe(res => {
    this.ofertaArray= new Array();

      alert(res);
      //this.listarElectivas();
      this.limpiarModal();
      this.listarOfertas();
      //this.router.navigate(['/GestionElectivas']);

    });
  }else{
    alert("Error en el registro, dato incorrecto ");
     }
     this.listarElectivas();
    }

    validarFechas(fechaFor: any){    
      var fecha = new Date();
      // Comparamos solo las fechas => no las horas!!
      console.log(fecha, fechaFor); 
      if ( fecha <= fechaFor) {
        return true;
      }
      else {
        return false;
      }
    }

    validarAnio(anioFor:any){
      var fecha = new Date();
      var aniofecha = fecha.getFullYear();
      console.log(aniofecha,anioFor);
      if ( aniofecha <= anioFor) {
        return true;
      }
      else {
        return false;
      }
    }

}

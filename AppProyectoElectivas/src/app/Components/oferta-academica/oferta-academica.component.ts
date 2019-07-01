import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { Electivas} from '../../Interfaces/electivas';
import { Oferta} from '../../Interfaces/oferta'
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';

@Component({
  selector: 'app-oferta-academica',
  templateUrl: './oferta-academica.component.html',
  styleUrls: ['./oferta-academica.component.css']
})
export class OfertaAcademicaComponent implements OnInit {
  ofertaAcademica=new Array();
  electivas:any={};
  ofertas:any={};
  objOferta= new Array();
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
      console.log(res,"tamanio del array guardar: ",this.ofertaAcademica.length);
      
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
    debugger;
    if(this.anioFormControl.hasError('required')){
      this.anioCampo=true;
    }else{ this.anioCampo=false; }
    if(this.periodoFormControl.hasError('required')){
      this.periodoAcademicoCampo=true;
    }else{ this.periodoAcademicoCampo=false; }
    if(this.inicioFormControl.hasError('required')){
      this.inicioCampo=true;
    }else{ this.inicioCampo=false; }
    if(this.finFormControl.hasError('required')){
      this.finCampo=true;
    }else{ this.finCampo=false; }
    if(!this.anioCampo && !this.periodoAcademicoCampo && !this.inicioCampo && !this.finCampo){
    this.registrar.saveOfertaAcademica(this.ofertas,this.ofertaAcademica).subscribe(res => {

      alert(res);
      //this.listarElectivas();
      this.limpiarModal();
      //this.router.navigate(['/GestionElectivas']);
   
    });
  }else{
    alert("Error en el registro");
     }
    }
  
}

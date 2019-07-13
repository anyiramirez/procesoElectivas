import { Component, OnInit } from '@angular/core';
import { Electivas} from '../../Interfaces/electivas';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.css']
})

export class InscripcionComponent implements OnInit {
  
  inscripcion:any={};
  electivasRegistradas = new Array();
  electivasDos = new Array();
  electivasTres= new Array();
  constructor(private registrar:RegistroDatosService,private router:Router) {
    this.listarElectivas();
    this.registrar.obtenerElectivasOfertadas("PIS").subscribe(res => {
      this.electivasRegistradas=new Array();
      //this.registrar.electivas= res as Electivas[];
      for(let p in res){
        debugger;
        this.electivasRegistradas.push(res[p]);
        debugger;
      }
      
    }
    );

    for(let i in this.electivasRegistradas){
      if(this.electivasRegistradas[i]!=this.inscripcion.opcion1){
        debugger;
        this.electivasDos.push(this.electivasRegistradas[i]);

      }
    }
    for(let i in this.electivasDos){
      if(this.electivasDos[i]!=this.inscripcion.opcion2){
        debugger;
        this.electivasTres.push(this.electivasDos[i]);

      }
    }
   }

  ngOnInit() {
  }
  registrarInscripcion(){

    this.registrar.obtenerElectivasOfertadas("PIS").subscribe(res => {
      this.electivasRegistradas=new Array();
      //this.registrar.electivas= res as Electivas[];
      for(let p in res){
        debugger;
        this.electivasRegistradas.push(res[p]);
        debugger;
      }
      
    }
    );

    for(let i in this.electivasRegistradas){
      if(this.electivasRegistradas[i]!=this.inscripcion.opcion1){
        debugger;
        this.electivasDos.push(this.electivasRegistradas[i]);

      }
    }
    for(let e in this.electivasDos){
      if(this.electivasDos[e]!=this.inscripcion.opcion2){
        debugger;
        this.electivasTres.push(this.electivasDos[e]);
      }
    
    }

  }

  listarElectivas(){
    this.registrar.obtenerElectivasOfertadas("PIS").subscribe(res => {
      this.electivasRegistradas=new Array();
      //this.registrar.electivas= res as Electivas[];
      for(let p in res){
        this.electivasRegistradas.push(res[p]);
      }
      
    }
    );

    for(let i in this.electivasRegistradas){
      if(this.electivasRegistradas[i]!=this.inscripcion.opcion1){
        this.electivasDos.push(this.electivasRegistradas[i]);

      }
    }
    
  }
}

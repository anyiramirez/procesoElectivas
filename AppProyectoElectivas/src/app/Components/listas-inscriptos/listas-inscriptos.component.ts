import { Component, OnInit } from '@angular/core';
import { RegistroDatosService } from '../../Services/registro-datos.service'

@Component({
  selector: 'app-listas-inscriptos',
  templateUrl: './listas-inscriptos.component.html',
  styleUrls: ['./listas-inscriptos.component.css']
})
export class ListasInscriptosComponent implements OnInit {
  listaInscripciones = new Array();

  constructor(private registro: RegistroDatosService) { 
    debugger;
    this.llenarListaInscritos();
  }

  ngOnInit() {
  }

  llenarListaInscritos(){
    this.registro.obtenerListasInscritos().subscribe(res=>{
      this.listaInscripciones = new Array();
      for(var key in res){
        this.listaInscripciones.push(res[key]);
      }
    });
  }

}

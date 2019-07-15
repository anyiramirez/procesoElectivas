import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { visitAll } from '@angular/compiler/src/render3/r3_ast';


@Component({
  selector: 'app-opciones-admin',
  templateUrl: './opciones-admin.component.html',
  styleUrls: ['./opciones-admin.component.css']
})
export class OpcionesAdminComponent implements OnInit {
  @Output() vista: EventEmitter <string> = new EventEmitter <string>();
  mensajeVista: string;
  constructor() {
    this.mensajeVista = null;
  }
  
  cambioVista(vistaSeleccionada: string){
    debugger;
    this.mensajeVista = vistaSeleccionada;
    this.vista.emit(this.mensajeVista);
  }

  ngOnInit() {
  }
  
}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-opciones-admin',
  templateUrl: './opciones-admin.component.html',
  styleUrls: ['./opciones-admin.component.css']
})
export class OpcionesAdminComponent implements OnInit {
  @Input() elegirMenuUser: any;
  @Output() vista: EventEmitter <string> = new EventEmitter <string>();
  mensajeVista: string;
  constructor() {
    this.mensajeVista = null;
  }
  
  cambioVista(vistaSeleccionada: string){
    this.mensajeVista = vistaSeleccionada;
    this.vista.emit(this.mensajeVista);
  }

  ngOnInit() {
  }
  
}

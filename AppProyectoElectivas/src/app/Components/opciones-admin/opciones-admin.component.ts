import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-opciones-admin',
  templateUrl: './opciones-admin.component.html',
  styleUrls: ['./opciones-admin.component.css']
})
export class OpcionesAdminComponent implements OnInit {
  @Output() vista: EventEmitter <string> = new EventEmitter <string>();
  
  constructor() {}
  
  cambioVista(vistaSeleccionada: string){

    this.vista.emit(vistaSeleccionada);
  }

  ngOnInit() {
  }
  
}

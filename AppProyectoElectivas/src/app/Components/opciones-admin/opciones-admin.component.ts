import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'protractor';


@Component({
  selector: 'app-opciones-admin',
  templateUrl: './opciones-admin.component.html',
  styleUrls: ['./opciones-admin.component.css']
})
export class OpcionesAdminComponent implements OnInit {
  @Output()
  vista: EventEmitter = new EventEmitter();
  
  constructor() {}
  
  cambioVista(vistaSeleccionada: string){

    this.vista.emit(vistaSeleccionada);
  }

  ngOnInit() {
  }
  
}

import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes';
import { ListaElectCE } from '../../Interfaces/lista-electce';

@Component({
  selector: 'app-asignacionelectiva',
  templateUrl: './asignacionelectiva.component.html',
  styleUrls: ['./asignacionelectiva.component.css']
})
export class AsignacionelectivaComponent implements OnInit {
  @Input() electivaSeleccionada : number;
  @Output() vistaAntElectivas: EventEmitter <string> = new EventEmitter <string>();
  lista1 = new Array();
  listaa;
  nombreElect;
  
  constructor(private rutaActiva: ActivatedRoute, private registrar:RegistroDatosService) { }
  
  ngOnInit() {
    this.listaa = this.registrar.solElectCE[this.electivaSeleccionada].estudiantes;
    this.nombreElect = this.registrar.solElectCE[this.electivaSeleccionada].nombreElectiva;
    
    for(var i = 0;i < this.listaa.length; i++){
      this.lista1.push(this.listaa[i]);
    }
  }

  vistaListaElectivas(vistaElectivas: string){
    this.vistaAntElectivas.emit(vistaElectivas);
  }
  
}

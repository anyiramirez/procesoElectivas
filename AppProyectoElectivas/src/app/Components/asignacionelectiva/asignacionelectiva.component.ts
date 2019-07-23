import { Component, OnInit, Input} from '@angular/core';
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
  lista1 = new Array();
  listaa;
  nombreElect;
  
  constructor(private rutaActiva: ActivatedRoute, private registrar:RegistroDatosService) { }
  
  ngOnInit() {
    this.listaa = this.registrar.solElectCE[this.electivaSeleccionada].estudiantes;
    this.nombreElect = this.registrar.solElectCE[this.electivaSeleccionada].nombreElectiva;
    
    for(var i = 0;i < this.listaa.length; i++){
      this.lista1.push(this.listaa[i]);
      console.log(this.lista1[i]);
    }
  }
  
}

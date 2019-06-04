import { Component, OnInit} from '@angular/core';
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
  estudiantes = 0;
  lista1 = new Array();
  listaa;
  
  constructor(private rutaActiva: ActivatedRoute, private registrar:RegistroDatosService) { }

  ngOnInit() {
    this.estudiantes = this.rutaActiva.snapshot.params.id;
    this.listaa = this.registrar.solElectCE[this.estudiantes].estudiantes;
    
    for(var i = 0;i < this.listaa.length; i++){
      this.lista1.push(this.listaa[i]);
    }
  }

}

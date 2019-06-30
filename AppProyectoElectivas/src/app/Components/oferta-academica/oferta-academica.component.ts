import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroDatosService} from '../../Services/registro-datos.service';

@Component({
  selector: 'app-oferta-academica',
  templateUrl: './oferta-academica.component.html',
  styleUrls: ['./oferta-academica.component.css']
})
export class OfertaAcademicaComponent implements OnInit {
  ofertaAcademica:any={};
  electivas:any={};
  nombreElectivaCampo;
  anioLectivo;
  periodoAcademicoCampo;
  ofertaCampo;

  constructor(private registrar:RegistroDatosService,private router:Router) { }

  ngOnInit() {
  }
  listarElectivas(){
    this.registrar.obtenerInformacionElectivas().subscribe(res => {
      this.electivas=new Array();
      //this.registrar.electivas= res as Electivas[];
      for(let p in res){
        this.electivas.push(res[p]);
      }
      
    }
    );
    
  }

}

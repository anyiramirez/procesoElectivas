import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { Electivas} from '../../Interfaces/electivas';
import { Oferta} from '../../Interfaces/oferta'

@Component({
  selector: 'app-oferta-academica',
  templateUrl: './oferta-academica.component.html',
  styleUrls: ['./oferta-academica.component.css']
})
export class OfertaAcademicaComponent implements OnInit {
  ofertaAcademica=new Array();
  electivas:any={};
  ofertas:any={};
  objOferta= new Array();
  nombreElectivaCampo;
  anioLectivo;
  periodoAcademicoCampo;
  ofertaCampo;
 
 

  constructor(private registrar:RegistroDatosService,private router:Router) { 
    this.listarElectivas();
  }

  ngOnInit() {
  }
  listarElectivas(){
    this.registrar.obtenerInformacionElectivas().subscribe(res => {
      this.electivas=new Array();
      //this.registrar.electivas= res as Electivas[];
      for(let p in res){
        if(res[p].estado=="Deshabilitar")
        {
        this.electivas.push(res[p]);
        var objetoArray = new Oferta(res[p].nombre,"");
        this.ofertaAcademica.push(objetoArray);
        }
      }
      console.log(res,"tamanio del array guardar: ",this.ofertaAcademica.length);
      
    }
    );
    
  }
 
  
  obtenerElectiva(nombre){
      this.registrar.obtenerDatosNombreElectiva(nombre).subscribe(res=>
      {
        debugger;
        //this.objeto = res;
      
        for(let e in this.electivas){
        if(nombre==this.electivas[e].nombre){
        var objElectiva = new Electivas(this.electivas[e].nombre,this.electivas[e].contenido,this.electivas[e].programa,this.electivas[e].tipo);
        
        debugger;
        var objOfertaReg= new Oferta(this.electivas[e].nombre,this.ofertaAcademica[e].oferta);
        debugger;
        this.ofertaAcademica.push(objOfertaReg);
        
        break;
        }
        }

  
     }
  
    );
    debugger;
 
  
    }
    limpiarModal(){
      this.ofertas.anio= '';
      this.ofertas.periodo = '';
      this.ofertas.dateInicio = '';
      this.ofertas.dateFin = '';
      
    }
    
  registrarOferta(){
    debugger;
    this.registrar.saveOfertaAcademica(this.ofertas,this.ofertaAcademica).subscribe(res => {

      alert(res);
      //this.listarElectivas();
      this.limpiarModal();
      //this.router.navigate(['/GestionElectivas']);
   
    });
  
    }
  
}

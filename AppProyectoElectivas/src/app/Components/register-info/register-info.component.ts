import { Component, OnInit } from '@angular/core';
import { EstInscripcionService } from "../../Services/est-inscripcion.service";
import { ListaPreinscriptosService}  from "../../Services/lista-preinscriptos.service"
import { PreInscripcionPrueba} from '../../Interfaces/pre-inscripcion-prueba';
import { DatosSimca } from '../../Interfaces/datos-simca';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Pipe} from "@angular/core";



//import {switchMap} from 'rxjs/add/operator';



@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css']
})
export class RegisterInfoComponent implements OnInit {
 pageActual:number=1;
 totalRec : number;
  preinscriptos = new Array();
  datosGuardar = new Array();
  inscriptos = this.conlistar;
  porcentaje:any;
  
  PonenteActual : any;
  usuario;
  usuarios = new Array();
  prueba: DatosSimca[];
  
  UsuarioFormControl;
  CreditosAprobadosFormControl ;
  CreditosPensumFormControl;
  PromedioFormControl;
  ElectivasAprobadasFormControl;
  ElectivasCursadasFormControl;
  DebeVerFormControl;
  config: any;
  collection = [];
  
  constructor(private bd:EstInscripcionService, protected listar:ListaPreinscriptosService, private registrar:RegistroDatosService,private route: ActivatedRoute, private router: Router) { 
        //this.consultarUsuarios();
    this.conlistar();
    this.config = {
      currentPage: 1,
      itemsPerPage: 2
};


}
  
  ngOnInit() {
    
  }
  pageChange(newPage: number) {
		this.router.navigate([''], { queryParams: { page: newPage } });
	}
  registrarBD()
  {
    for (let p in this.datosGuardar){
        
      this.datosGuardar[p].PorcentajeCarrera= ((this.datosGuardar[p].CreditosAprobados/this.datosGuardar[p].CreditosPensum)*100).toFixed(4);
      //this.datosGuardar[p].Porcentaje=this.porcentaje;      
    }
    
    this.registrar.saveUsuario(this.datosGuardar).
    subscribe
    (
      res => {
        console.log("respuesta del servidor: ",res);     
        alert('Registro exitoso');
        this.registrar.generarListas().subscribe(res => {
          console.log("Estado de generar: ",res);     
          alert('Generar lista exitoso');
          //------------------
          this.registrar.obtenerElectivasCE().subscribe(res => {
            console.log("ObtenerElectivas: ",res);     
          });
          //-------------------
        },
        err => {
          console.error(err);
          alert("Error en generar listas ");  
        });   
        //  this.router.navigate(['perfil']);
      },
      err =>{
        console.log(this.datosGuardar);  
        console.error(err);
        alert("Error en el registro ");
      }
      )
    }
    consultarUsuarios(){
      
      this.listar.consultarLista().subscribe(
        lista => {
          this.preinscriptos = new Array();
          for(let p in lista){
            this.preinscriptos.push(lista[p]);
          }
          console.log(lista);
          alert('No realizo la consulta de la base de datos');
        } 
        );
        
      }
      conlistar(){
        this.listar.consultarLista().subscribe(res => {
          this.preinscriptos=new Array();
          this.datosGuardar=new Array();
          this.listar.solicitudesEst= res as PreInscripcionPrueba[];
          for(let p in res)
          {
            
            var objDS = new DatosSimca(res[p].Usuario,res[p].creditosAprobados,res[p].creditosPensum,res[p].porcentajeAvance,res[p].promedioCarrera,res[p].electivasAprobadas,res[p].electivasCursando,"0");
            this.datosGuardar.push(objDS);
            this.preinscriptos.push(res[p]);
          }
          
          console.log(res,"tamanio del array guardar: ",this.datosGuardar.length);
          
        }
        
        );
      }
      calcularPorcentaje(){
        for (let p in this.datosGuardar){
          this.datosGuardar[p].PorcentajeCarrera= ((this.datosGuardar[p].CreditosAprobados/this.datosGuardar[p].CreditosPensum)*100).toFixed(4);
          //this.datosGuardar[p].Porcentaje=this.porcentaje;
          
        }
        
      }
      
    
      
    }
    
import { Component, OnInit } from '@angular/core';
import { EstInscripcionService } from "../../Services/est-inscripcion.service";
import { ListaPreinscriptosService}  from "../../Services/lista-preinscriptos.service"
import { PreInscripcionPrueba} from '../../Interfaces/pre-inscripcion-prueba';
import { DatosSimca } from '../../Interfaces/datos-simca';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css']
})
export class RegisterInfoComponent implements OnInit {
  preinscriptos = new Array();
  datosGuardar = new Array();
  inscriptos = this.conlistar;
  porcentaje:any;
  
  PonenteActual : number=1;
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
  
  page = 1;
  pageSize = 4;
  collectionSize = this.preinscriptos.length;
  datos: any={};
  totalItems: number;
  
  
  
  constructor(private bd:EstInscripcionService, protected listar:ListaPreinscriptosService, private registrar:RegistroDatosService) { 
    
    //this.consultarUsuarios();
    this.conlistar();
    
    
  }
  
  ngOnInit() {
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
            
            var objDS = new DatosSimca(res[p].Usuario,"0",res[p].creditosPensum,"0","0","0","0");
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
    
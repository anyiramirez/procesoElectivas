import { Component, OnInit } from '@angular/core';
import { EstInscripcionService } from "../../Services/est-inscripcion.service";
import { ListaPreinscriptosService}  from "../../Services/lista-preinscriptos.service"
import { PreInscripcionPrueba} from '../../Interfaces/pre-inscripcion-prueba';
import { DatosSimca } from '../../Interfaces/datos-simca';
import { RegistroDatosService} from '../../Services/registro-datos.service';

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
  
  CredAp;
  Promedio;
  ElecAp;
  ElecCur;
  varNum : number =5;
  varHide : boolean = true;
  
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
  
  validarCampos(){
    for(let p in this.datosGuardar){
      if(this.datosGuardar[p].CreditosAprobados<0){
        this.datosGuardar[p].CreditosAprobados = (this.datosGuardar[p].CreditosAprobados*(-1));
      }
      if(this.datosGuardar[p].CreditosAprobados> this.datosGuardar[p].CreditosPensum){
        this.datosGuardar[p].CreditosAprobados = this.datosGuardar[p].CreditosPensum;
      }
      if (this.datosGuardar[p].PromedioCarrera < 0){
        this.datosGuardar[p].PromedioCarrera = (this.datosGuardar[p].PromedioCarrera*(-1)).toFixed(3);
      }
      if (this.datosGuardar[p].PromedioCarrera > 5){
        this.datosGuardar[p].PromedioCarrera = this.varNum.toFixed(3);
      }
      for (let i in this.preinscriptos){
        if(i == p){
          if (this.datosGuardar[p].ElectivasAprobadas > this.preinscriptos[i].electivasPrograma){
            this.datosGuardar[p].ElectivasAprobadas = this.preinscriptos[i].electivasPrograma;
          }
          if (this.datosGuardar[p].ElectivasCursadas > this.preinscriptos[i].electivasPrograma){
            this.datosGuardar[p].ElectivasCursadas = this.preinscriptos[i].electivasPrograma;
          }
        }        
      }
      if(this.datosGuardar[p].ElectivasAprobadas < 0 ){
        this.datosGuardar[p].ElectivasAprobadas = (this.datosGuardar[p].ElectivasAprobadas*(-1));
      }
      if(this.datosGuardar[p].ElectivasCursadas < 0 ){
        this.datosGuardar[p].ElectivasCursadas = (this.datosGuardar[p].ElectivasCursadas*(-1));
      }
    }
    debugger;
    this.showSaving();
  }
  
  showSaving(){
    this.varHide = !this.varHide;
    this.imagenGuardar(this.varHide);
  }

  imagenGuardar(hide:boolean){
    if(hide == true){
      document.getElementById('save').style.display='none';
    }else{
      
      document.getElementById('save').style.display='block';
    }
    this.varHide = hide;
  }
  
  registrarBD()
  {
    this.calcularPorcentaje();
    
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
        }
      }
      
    }
    
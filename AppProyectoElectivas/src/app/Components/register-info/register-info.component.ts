import { Component, OnInit, isDevMode} from '@angular/core';
import { EstInscripcionService } from "../../Services/est-inscripcion.service";
import { ListaPreinscriptosService}  from "../../Services/lista-preinscriptos.service"
import { PreInscripcionPrueba} from '../../Interfaces/pre-inscripcion-prueba';
import { DatosSimca } from '../../Interfaces/datos-simca';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ExcelService } from '../../Services/excel.service';
import * as moment from 'moment';
import { interval, timer, fromEvent } from 'rxjs';



@Component({
  selector: 'app-register-info',
  templateUrl: './register-info.component.html',
  styleUrls: ['./register-info.component.css']
})
export class RegisterInfoComponent implements OnInit {
  
  pageActual: number = 1;
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
  pageSize = 5;
  collectionSize = this.preinscriptos.length;
  datos: any={};
  totalItems: number;
  
  file: NgxFileDropEntry[]=[];
  
  constructor(private bd:EstInscripcionService, protected listar:ListaPreinscriptosService, private registrar:RegistroDatosService,private excelService:ExcelService) {
    this.conlistar();
  }
  
  ngOnInit() {
  }
  
  onFileChange(evt: any) {
    this.excelService.importSheet(evt);
    
  }
  
  tamanioMaxDigit(event: any, max: number){
    if(event.target.value.length > max){
      event.preventDefault();
    }
  }
  
  validarCampos(){
    for(let p in this.datosGuardar){
      //Creditos Aprobados
      if(this.datosGuardar[p].CreditosAprobados<0){
        this.datosGuardar[p].CreditosAprobados = (this.datosGuardar[p].CreditosAprobados*(-1));
      }
      if(this.datosGuardar[p].CreditosAprobados == null){
        this.datosGuardar[p].CreditosAprobados = 0;
      }
      var scA = Number(this.datosGuardar[p].CreditosAprobados).toString().length;
      if(scA > 3){
        this.datosGuardar[p].CreditosAprobados = 998;
      }
      //Promedio Carrera
      if (this.datosGuardar[p].PromedioCarrera < 0){
        this.datosGuardar[p].PromedioCarrera = (this.datosGuardar[p].PromedioCarrera*(-1)).toFixed(3);
      }
      if(this.datosGuardar[p].PromedioCarrera == null){
        this.datosGuardar[p].PromedioCarrera = 0;
      }
      if (this.datosGuardar[p].PromedioCarrera > 5){
        this.datosGuardar[p].PromedioCarrera = this.varNum.toFixed(3);
      }
      //Electivas Aprobadas y Cursadas
      for (let i in this.preinscriptos){
        if(i == p){
          //Aprobadas
          if (this.datosGuardar[p].ElectivasAprobadas > this.preinscriptos[i].electivasPrograma){
            this.datosGuardar[p].ElectivasAprobadas = this.preinscriptos[i].electivasPrograma;
          }
          //Cursadas
          if (this.datosGuardar[p].ElectivasCursadas > this.preinscriptos[i].electivasPrograma){
            this.datosGuardar[p].ElectivasCursadas = this.preinscriptos[i].electivasPrograma;
          }
        }
      }
      //Aprobadas
      if(this.datosGuardar[p].ElectivasAprobadas < 0 ){
        this.datosGuardar[p].ElectivasAprobadas = (this.datosGuardar[p].ElectivasAprobadas*(-1));
      }
      //Cursadas
      if(this.datosGuardar[p].ElectivasCursadas < 0 ){
        this.datosGuardar[p].ElectivasCursadas = (this.datosGuardar[p].ElectivasCursadas*(-1));
      }
      //Aprobadas
      if(this.datosGuardar[p].ElectivasAprobadas == null){
        this.datosGuardar[p].ElectivasAprobadas = 0;
      }
      //Cursadas
      if(this.datosGuardar[p].ElectivasCursadas == null){
        this.datosGuardar[p].ElectivasCursadas = 0;
      }
    }
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
  reset;
  saveAutomatic(){
    this.registrarBD();
  }
  
  registrarBD(){
    this.calcularPorcentaje();
    this.registrar.saveUsuario(this.datosGuardar).subscribe(res => {
      console.log("respuesta del servidor: ",res);
      // this.moment().format('llll');
      this.showSaving();
      this.registrar.generarListas().subscribe(res => {
        console.log("Estado de generar: ",res);
        this.registrar.obtenerElectivasCE().subscribe(res => {
          console.log("ObtenerElectivas: ",res);
        });
      }, err => {
        console.error(err);
        alert("Error en generar listas ");
      });
      //  this.router.navigate(['perfil']);
    },err =>{
      console.log(this.datosGuardar);
      console.error(err);
      alert("Error en el registro ");
    })
  }
  consultarUsuarios(){
    this.listar.consultarLista().subscribe(lista => {
      this.preinscriptos = new Array();
      for(let p in lista){
        this.preinscriptos.push(lista[p]);
      }
      console.log(lista);
      alert('No realizo la consulta de la base de datos');
    });
  }
  conlistar(){
    this.listar.consultarLista().subscribe(res => {
      this.preinscriptos=new Array();
      this.datosGuardar=new Array();
      this.listar.solicitudesEst= res as PreInscripcionPrueba[];
      for(let p in res){
        var objDS = new DatosSimca(res[p].Usuario,res[p].creditosAprobados,res[p].creditosPensum,res[p].porcentajeAvance,res[p].promedioCarrera,res[p].electivasAprobadas,res[p].electivasCursando);
        this.datosGuardar.push(objDS);
        this.preinscriptos.push(res[p]);
      }
      console.log(res,"tamanio del array guardar: ",this.datosGuardar.length);    
    });
  }
  calcularPorcentaje(){
    for (let p in this.datosGuardar){
      this.datosGuardar[p].PorcentajeCarrera= ((this.datosGuardar[p].CreditosAprobados/this.datosGuardar[p].CreditosPensum)*100).toFixed(4);
    }
  }
  dropped(files: NgxFileDropEntry[]){
    if (files.length>1){
      alert("Cargue únicamente un documento");
    }else{
      this.verify(files);
    }
  }
  verify(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile && this.isFileAllowed(droppedFile.fileEntry.name)) {
        this.file = files;
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          console.log('isFile :', file.name);
          console.log(droppedFile.relativePath, file);
          this.excelService.importSheet(file);
        });
      } else {
        alert("únicamente se aceptan archivos excel.");
      }
    }
  }
  isFileAllowed(fileName: string) {
    let isFileAllowed = false;
    const allowedFiles = ['.xlsx', '.xls'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (isDevMode()) {
      console.log('extención del archivo : ', extension);
    }
    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }
  
}

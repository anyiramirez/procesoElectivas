import { Injectable, SimpleChange } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatosSimca } from '../Interfaces/datos-simca';
import { PreInscripcionPrueba} from '../Interfaces/pre-inscripcion-prueba';
import { solE_XLSX } from '../Interfaces/solEXLSX';
import { Electivas} from '../Interfaces/electivas';
import { Oferta} from '../Interfaces/oferta'
import { ListaElectCE} from '../Interfaces/lista-electce'//servicio electivas

@Injectable({
  providedIn: 'root'
})
export class RegistroDatosService {
  API_URI = 'http://localhost:3000/api/asigcupos';
  solicitudesEst: PreInscripcionPrueba[];
  electivas:Electivas[];
  solEx: solE_XLSX[];
  solElectCE:  ListaElectCE[];//servicio electivas
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

   saveUsuario(datosEApi: Array<DatosSimca>) {
    console.log("datos a evaluar:",datosEApi);
    return this.http.post(this.API_URI + '/solEst', datosEApi,this.httpOptions);

   }
   saveElectivas(datosElectivas: Array<Electivas>) {
    console.log("datos a guardar:",datosElectivas);
    return this.http.post(this.API_URI + '/registrarElectivas', datosElectivas,this.httpOptions);

   }
   saveOfertaAcademica(anio:string,periodo:string,datosOferta: Array<Oferta>){
    console.log("datos a guardar:",anio,periodo,datosOferta);
    return this.http.post(this.API_URI + '/registrarOfertas'+anio+periodo,datosOferta, this.httpOptions);
   }

  obtenerInformacionElectivas(){
    return this.http.get(this.API_URI + '/listarElectivas');
  }
  obtenerDatosNombreElectiva(id: Electivas){
    return this.http.get(this.API_URI+ '/electivaPorNombre/'+ id );
  }
  generarListas(){
    return this.http.get(this.API_URI);
  }
  editarElectiva(nombreAntiguo:Electivas, datosEditarElectivas: Electivas){
    console.log("datos a guardar:",datosEditarElectivas);
    return this.http.post(this.API_URI + '/editarElectiva/'+ nombreAntiguo, datosEditarElectivas,this.httpOptions);
  }

  registroBd (datos:PreInscripcionPrueba){
     datos.Usuario;
     datos.creditosPensum;
     return this.http.put(`${this.API_URI + '/solEst'}`,datos);

  }
  //Crear servicio de electivas
  obtenerElectivasCE(){
    return this.http.get(this.API_URI + '/electivasCE');
  }
  obtenerListaElectivas(){
    return this.http.get(this.API_URI + '/electivas')

  }

  editarEstado(nombre){
    return this.http.post(this.API_URI + '/habilitarElectiva/' + nombre ,this.httpOptions);
  }

  subirJSON(JSONofXLSX){
    var cont = 0;
    this.solEx = [];
    for(let solicitudE of JSONofXLSX){
      if(cont === 0){
        cont++;
        continue;
      }
      if(solicitudE[0] === "" || solicitudE[0] === undefined){
        break;
      }
      var op1="",op2="",op3="",op4="";
      if(solicitudE[17] != undefined){
        op1 = solicitudE[17];
      }
      if(solicitudE[18] != undefined){
        op2 = solicitudE[18];
      }
      if(solicitudE[19] != undefined){
        op3 = solicitudE[19];
      }
      if(solicitudE[20] != undefined){
        op4 = solicitudE[20];
      }
      var pA=solicitudE[8]+"",pC=solicitudE[9]+"";
      var spA = pA.split(".");
      var sspA = spA[0] + "," + spA[1];

      var sPC = pC.split(".");
      var ssPC ="";
      
      if(sPC.length === 2){
        ssPC = sPC[0] + "," + sPC[1];
      }else{
        ssPC = sPC[0];
      }

      var objSX = new solE_XLSX(solicitudE[3],solicitudE[2],solicitudE[0],solicitudE[4],solicitudE[5],solicitudE[1],solicitudE[13],solicitudE[6],solicitudE[7],solicitudE[11],solicitudE[12],solicitudE[10],op1,op2,op3,op4,sspA,ssPC);

      this.solEx.push(objSX);


    }
    console.log("paso1");
    this.http.post(this.API_URI+"/AsigCuposXLSX", this.solEx, this.httpOptions).subscribe(
      res => {
        console.log("servidor: ",res);
      }, err =>{
        console.error(err);
        alert("Error en el registro ");
      }
    );
    console.log("paso2");

  }


}

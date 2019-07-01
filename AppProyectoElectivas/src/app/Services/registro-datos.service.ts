import { Injectable, SimpleChange } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatosSimca } from '../Interfaces/datos-simca';
import { PreInscripcionPrueba} from '../Interfaces/pre-inscripcion-prueba';
import { Electivas} from '../Interfaces/electivas';
import { ListaElectCE} from '../Interfaces/lista-electce'//servicio electivas

@Injectable({
  providedIn: 'root'
})
export class RegistroDatosService {
  API_URI = 'http://localhost:3000/api/asigcupos';
  solicitudesEst: PreInscripcionPrueba[];
  electivas:Electivas[];
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

  subirJSON(nombre){
    console.log(nombre);
    /*var json_send = {
      "Apellidos":
      "Codigo":
      "HoraSolicitud":
      "Nombres":
      "Programa":
      "Usuario":
      "cantidadSolicitada":
      "creditosAprobados":
      "creditosPensum":
      "electivasAprobadas":
      "electivasCursando":
      "electivasPrograma":
      "opcion1":
      "opcion2":
      "opcion3":
      "opcion4":
      "porcentajeAvance":
      "promedioCarrera":
    }*/
  }

}

import { Injectable, SimpleChange } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatosSimca } from '../Interfaces/datos-simca';
import { PreInscripcionPrueba} from '../Interfaces/pre-inscripcion-prueba'
import { ListaElectCE} from '../Interfaces/lista-electce'//servicio electivas

@Injectable({
  providedIn: 'root'
})
export class RegistroDatosService {
  API_URI = 'http://localhost:3000/api/asigcupos';
  solicitudesEst: PreInscripcionPrueba[];
  solElectCE:  ListaElectCE[];//servicio electivas
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

   saveUsuario(datos: Array<DatosSimca>) {

    return this.http.post(this.API_URI + '/solEst', datos,this.httpOptions);

   }


  generarListas(){
    return this.http.get(this.API_URI);
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

}

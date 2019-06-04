import { Observable } from 'rxjs';
import { PreInscripcionPrueba } from '../Interfaces/pre-inscripcion-prueba';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
providedIn: 'root'
})
export class ListaPreinscriptosService {
solicitudesEst: PreInscripcionPrueba[];
API_URI = 'http://localhost:3000/api/asigcupos';

constructor(private http: HttpClient) { }
consultarLista(){
  return this.http.get(this.API_URI + '/solEst');
} 
consrLista(page:number){
  return this.http.get(this.API_URI + '/solEst');
} 


}
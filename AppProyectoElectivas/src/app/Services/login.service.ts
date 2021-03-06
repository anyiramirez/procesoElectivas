import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuarios } from '../Interfaces/usuarios';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URI = 'http://localhost:3000/auth';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  }
  usuario;
  setUsuario(user:any){
    this.usuario = user;
  }
  getUsuario(){
    return this.usuario;
  }
  constructor(private http: HttpClient) { }


  obtenerDatosUsuario() {
    return this.http.get(this.API_URI + '/user', this.httpOptions);
  }
  cerrarSesion(){
    return this.http.get(this.API_URI + '/logout', this.httpOptions);
  }
  obtenerURLGoogle() {
    return this.http.get(this.API_URI, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Access-Control-Allow-Origin', '*')
    });

  }
}

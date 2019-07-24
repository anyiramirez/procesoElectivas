import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) { }


  obtenerDatosUsuario() {
    return this.http.get(this.API_URI + '/user', this.httpOptions);

  }

  obtenerURLGoogle() {
    return this.http.get(this.API_URI, {
      observe: 'body',
      withCredentials: true,
      headers: new HttpHeaders().append('Access-Control-Allow-Origin', '*')
    });

  }
}

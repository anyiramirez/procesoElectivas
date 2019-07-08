import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  API_URI = 'http://localhost:3000/login';
  constructor(private http: HttpClient) { }


  obtenerDatosUsuario(code: any) {
    return this.http.post(this.API_URI + '/user', code);

  }

  obtenerURLGoogle() {
    return this.http.get(this.API_URI);

  }
}

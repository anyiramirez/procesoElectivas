import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PermisorolGuard implements CanActivate {
  infoLogin: any;
  API_URI = 'http://localhost:3000/auth';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true
  }

  constructor(private servicioLogin: LoginService,private http: HttpClient){ 
  this.datosUsuarios();
  }
  obtenerDatosUsuario() {
    return this.http.get(this.API_URI + '/user', this.httpOptions);

  }
  datosUsuarios(){
    debugger;
    this.obtenerDatosUsuario().subscribe(res => {
      this.infoLogin=res;
    });
  }
  
  canActivate(ruta: any){
    
    switch(ruta.url[0].path){
      case 'Administrador':
        if(this.infoLogin.rol === 'SuperAdmin'){
          return true;
        }
        break;
      case 'VistaCoordinador':
        if(this.infoLogin.rol === 'Coordinador'){
          return true;
        }
        break;
      case 'VistaAdministrativa':
        if(this.infoLogin.rol === 'Administrativo'){
          return true;
        }
        break;
      case 'VistaAdmin':
        if(this.infoLogin.rol === 'Admin'){
          return true;
        }
        break;
    }
    return false;
  }
  
}


  
  
  
  

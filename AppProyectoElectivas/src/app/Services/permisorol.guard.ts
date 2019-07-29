import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PermisorolGuard implements CanActivate {
  infoLogin: any;
  
  constructor(private servicioLogin: LoginService){ 
    this.datosUsuarios();
  }
  
  datosUsuarios(){
    //debugger;
    this.servicioLogin.obtenerDatosUsuario().subscribe(res => {
      this.infoLogin=res;
      this.infoLogin.rol = 'SuperAdmin';
    });
  }
  
  canActivate(ruta: any){
    debugger;
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

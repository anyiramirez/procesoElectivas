import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../Services/login.service';

@Injectable({
  providedIn: 'root'
})
export class PermisorolGuard implements CanActivate {
  infoLogin: any;
  
  constructor(private servicioLogin: LoginService){ 
    this.servicioLogin.obtenerDatosUsuario().subscribe(res=>{
      this.infoLogin = res;
      console.log("pinche santiago");
    });
  }
  
  canActivate(ruta: any){
    console.log("antes" + this.infoLogin);

    this.infoLogin = this.servicioLogin.getUsuario();
    console.log("e" +this.infoLogin);

    console.log("guardian ->", this.servicioLogin.getUsuario(),this.infoLogin.rol);

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







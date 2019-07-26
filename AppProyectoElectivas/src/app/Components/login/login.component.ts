import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LoginService} from '../../Services/login.service';
import { RegistroDatosService } from '../../Services/registro-datos.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  urlGoogle: any;
  usuarios= new Array();
  infoLogin:any;
  rol:string;
  // public href: string = "";

  constructor(private servicioLogin: LoginService, private router: Router,private datos:RegistroDatosService
    ) { 
      this.servicioLogin.obtenerDatosUsuario().subscribe(res => {
        console.log(res);
        this.infoLogin=res;
       });

    }

  ngOnInit() {
    this.datos.obtenerUsuarios().subscribe(res => {
      this.usuarios = new Array();
        for(var key in res){
        this.usuarios.push(res[key]);
      }
  
     }); 
   // this.servicioLogin.obtenerURLGoogle().subscribe(res => {
     // this.urlGoogle = res;
    //});
   
  }

  IniciarSesion() {
   
    //window.location.href = 'http://localhost:3000/auth/google';
    const y = parseInt(((window.screen.height/2)-(800/2)).toString());
    const x = parseInt(((window.screen.width/2)-(800/2)).toString());

    window.open('http://localhost:3000/auth/google',"mywindow","location=1,status=1,scrollbars=1, top=" + y + ",left=" + x + ",width=800,height=800");
    let listener = window.addEventListener('message', (message) => {
      console.log(message.data.user);
      console.log(message.data.success);
      for(var l in this.usuarios){
        debugger;
        if(this.usuarios[l].rol=="SuperAdmin" && this.usuarios[l].Correo==this.infoLogin.correo)
        {
          debugger;
          this.router.navigate(['/Administrador/']);
          break;
        }else if(this.usuarios[l].rol=="Coordinador"&& this.usuarios[l].Correo==this.infoLogin.correo){
          
          this.router.navigate(['/VistaCoordinador/']);
          break;

        }else if(this.usuarios[l].rol=="Administrativo"&& this.usuarios[l].Correo==this.infoLogin.correo){
          
          this.router.navigate(['/VistaAdministrativo/']);
          break;

        }else if(this.usuarios[l].rol=="Admin"&& this.usuarios[l].Correo==this.infoLogin.correo){
          
          this.router.navigate(['/Administrador/']);
          break;

        }else{
          this.router.navigate(['/Inscripcion/']);

        }
      }
     
    });
    
  }


}

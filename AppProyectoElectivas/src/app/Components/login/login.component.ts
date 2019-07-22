import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LoginService} from '../../Services/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  urlGoogle: any;
  // public href: string = "";

  constructor(private servicioLogin: LoginService, private router: Router) { }

  ngOnInit() {
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
    });
    /*this.servicioLogin.obtenerDatosUsuario().subscribe(res => {
      console.log(res);
     });*/
  }


}

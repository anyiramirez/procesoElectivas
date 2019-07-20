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
    window.open('http://localhost:3000/auth/google',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {
      console.log(message.data.user);
    });
    /*this.servicioLogin.obtenerDatosUsuario().subscribe(res => {
      console.log(res);
     });*/
  }


}

import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  usuario: any ={};
  email = new FormControl('', [Validators.required, Validators.email]);
  psswd = new FormControl('', [Validators.required, Validators.minLength(7)]);
  
  constructor() { }
  
  ngOnInit() {
  }
  getErrorPsswd(){
    return this.psswd.hasError('required')? 'Debe ingresar una contraseña':
    this.psswd.getError ? 'La contraseña debe tener mínimo 7 dígitos':
    '';
  }
  getErrorEmail() {
    return this.email.hasError('required') ? 'Debe ingresar un email' :
    this.email.hasError('email') ? 'Email no valido' :
    '';
  }
  IniciarSesion(){
    if(this.email.status == "VALID" && this.psswd.status == "VALID"){
      console.log(this.usuario);
    }
  }
  
  
}

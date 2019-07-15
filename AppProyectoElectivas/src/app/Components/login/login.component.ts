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
    this.servicioLogin.obtenerURLGoogle().subscribe(res => {
      this.urlGoogle = res;
    });
    this.router.navigate([this.router.url]);
    console.log(this.router.url);

  }
 
  IniciarSesion(){
    window.open(this.urlGoogle,"_self");
    this.router.navigate([this.router.url]);
    console.log(this.router.url);
  }


}

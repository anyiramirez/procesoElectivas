import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { LoginService} from '../../Services/login.service';
@Component({
  selector: 'app-principaladmi',
  templateUrl: './principaladmi.component.html',
  styleUrls: ['./principaladmi.component.css']
})
export class PrincipaladmiComponent implements OnInit {
  varVista: any;
  electivaActual: any;
  rolActual:any;
  public routeId = '';
  public href: string = "";
  constructor(private router: Router, private servicioLogin: LoginService) { }

  ngOnInit() {
    this.href = this.router.url;
    var idx = this.href.lastIndexOf("code=");
    var code = this.href.substring(idx + 5).replace("#","");
    var code2 = code.split("&");
  }
  
  recibirVista($event: any){
    this.varVista = $event;
  }
  electivaSeleccionada($event:any){
    this.electivaActual = $event.charAt($event.length-1);
    this.varVista = $event.substring(0,$event.length-1);
  }
  recibirRolUser($event: any){
    this.rolActual = $event;
  }

}



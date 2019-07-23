import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principaladmi',
  templateUrl: './principaladmi.component.html',
  styleUrls: ['./principaladmi.component.css']
})
export class PrincipaladmiComponent implements OnInit {
  varVista: any;
  electivaActual: any;
  public routeId = '';
  public href: string = "";
  constructor(private router: Router) {
  }
  
  ngOnInit() {
    this.href = this.router.url;
  }
  
  recibirVista($event: any){
    this.varVista = $event;
    console.log("evento", $event);
  }
  electivaSeleccionada($event:any){
    debugger;
    this.electivaActual = $event.charAt($event.length-1);
    this.varVista = $event;
    this.varVista = this.varVista.substring(0,this.varVista.length-1);
  }

}

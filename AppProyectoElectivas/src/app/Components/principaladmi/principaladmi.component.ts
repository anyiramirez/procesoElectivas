import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principaladmi',
  templateUrl: './principaladmi.component.html',
  styleUrls: ['./principaladmi.component.css']
})
export class PrincipaladmiComponent implements OnInit {
  componenteElectivas:any;
  varVista: string;
  
  public href: string = "";
  constructor(private router: Router) {
  }
  
  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }
  
  recibirVista($event: string){
    this.varVista = $event;
  }
  mostrarElectiva($event:any){
    this.componenteElectivas = $event;
  }

}

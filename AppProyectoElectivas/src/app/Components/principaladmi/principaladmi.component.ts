import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principaladmi',
  templateUrl: './principaladmi.component.html',
  styleUrls: ['./principaladmi.component.css']
})
export class PrincipaladmiComponent implements OnInit {
  varVista: string;
  public routeId = '';
  public href: string = "";
  constructor(private router: Router) {
  }
  
  ngOnInit() {
    this.href = this.router.url;
  }
  
  recibirVista($event: string){
    this.varVista = $event;
    console.log(this.varVista);
    console.log("evento", $event);
  }

}

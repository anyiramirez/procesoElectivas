import { Component, OnInit } from '@angular/core';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-moduloelectivas',
  templateUrl: './moduloelectivas.component.html',
  styleUrls: ['./moduloelectivas.component.css']
})
export class ModuloelectivasComponent implements OnInit {
  foods: Food[] = [
    {value: 'teorico', viewValue: 'Teórico'},
    {value: 'practico', viewValue: 'Práctico'},
    {value: 'teoPract', viewValue: 'Teorico Práctico'}
  ];
  
  constructor() { }
  ngOnInit() {
  }
  
}

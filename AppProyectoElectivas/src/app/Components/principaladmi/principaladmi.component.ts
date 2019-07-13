import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principaladmi',
  templateUrl: './principaladmi.component.html',
  styleUrls: ['./principaladmi.component.css']
})
export class PrincipaladmiComponent implements OnInit {
  public href: string = "";
  constructor(private router: Router) { }

  ngOnInit() {
    console.log("Holi");
    this.href = this.router.url;
    console.log(this.router.url);
  }

}

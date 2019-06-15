import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PrincipaladmiComponent } from './Components/principaladmi/principaladmi.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Electivas';

  public constructor(public router: Router) {
    this.router.navigateByUrl("Administrador");
  }
}

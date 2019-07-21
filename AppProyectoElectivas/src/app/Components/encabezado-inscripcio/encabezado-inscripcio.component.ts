import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../Services/login.service';

@Component({
  selector: 'app-encabezado-inscripcio',
  templateUrl: './encabezado-inscripcio.component.html',
  styleUrls: ['./encabezado-inscripcio.component.css']
})
export class EncabezadoInscripcioComponent implements OnInit {
  imagenPerfil: string;
  constructor(private servicioLogin: LoginService) { }

  ngOnInit() {
    this.servicioLogin.obtenerDatosUsuario().subscribe(res => {
      console.log(res);
    });
    this.imagenPerfil = "../../../assets/user.jpg";
  }

}

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
  nombrePerfil: string;
  ngOnInit() {
    this.imagenPerfil = "../../../assets/user.jpg";
    this.nombrePerfil = "NN";
    this.servicioLogin.obtenerDatosUsuario().subscribe(res => {
      //var perfil = res;
    //  this.nombrePerfil = perfil.NombreCompleto;
  //    console.log(perfil.foto);
//      this.imagenPerfil = perfil.foto;
    });

  }

}

import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../Services/login.service';
@Component({
  selector: 'app-encabezado-inscripcio',
  templateUrl: './encabezado-inscripcio.component.html',
  styleUrls: ['./encabezado-inscripcio.component.css']
})
export class EncabezadoInscripcioComponent implements OnInit {
  imagenPerfil: string;
  info:any;
  usuario:string;
  rol:string;
  usuarios=new Array();
  cargo:string;
  constructor(private servicioLogin: LoginService) {

   }

  ngOnInit() {
  
    this.servicioLogin.obtenerDatosUsuario().subscribe(res => {
      this.info=res;
      this.imagenPerfil = this.info.foto;
      this.usuario=this.info.correo;
      for(var l in this.usuarios){
        debugger;
        if(this.usuarios[l].Correo==this.info.correo)
        {
         this.cargo= this.usuarios[l].Cargo;
         this.rol= this.usuarios[l].rol;
          break;
        
        }
      }
    });
  }
 

}

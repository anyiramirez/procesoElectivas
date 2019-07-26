import { Component, OnInit } from '@angular/core';
import { LoginService} from '../../Services/login.service';
import { RegistroDatosService } from '../../Services/registro-datos.service'

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  imagenPerfil: string;
  info:any;
  usuario:string;
  nombreCompleto:string;rol:string;
  usuarios=new Array();
  cargo:string;


  constructor(private servicioLogin: LoginService,private datos:RegistroDatosService) { 
    this.datos.obtenerUsuarios().subscribe(res => {
      this.usuarios = new Array();
        for(var key in res){
        this.usuarios.push(res[key]);
      }
  
     }); 
  }

  ngOnInit() {
    this.servicioLogin.obtenerDatosUsuario().subscribe(res => {
      this.info=res;
      this.imagenPerfil = this.info.foto;
      this.usuario=this.info.correo;
      this.nombreCompleto=this.info.NombreCompleto;
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

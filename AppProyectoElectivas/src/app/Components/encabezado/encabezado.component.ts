import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { LoginService} from '../../Services/login.service';
import { RegistroDatosService } from '../../Services/registro-datos.service'

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  @Output() EnviarRol: EventEmitter<any> = new EventEmitter<any>();
  imagenPerfil: string;
  info:any;
  usuario:string;
  nombreCompleto:string;rol:string;
  usuarios=new Array();
  cargo:string;
  
  
  constructor(private servicioLogin: LoginService,private datos:RegistroDatosService) { 
    
  }
  
  ngOnInit() {
    this.servicioLogin.obtenerDatosUsuario().subscribe(res => {
      this.info=res;
      this.imagenPerfil = this.info.foto;
      this.usuario=this.info.correo;
      this.nombreCompleto=this.info.NombreCompleto;
      this.rol = this.info.rol;
      this.EnviarRol.emit(this.info.rol);
     
    });
    
    
  }
  
}

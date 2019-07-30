import { Component, OnInit,Inject } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { Router } from '@angular/router';
import { mensajeErrorOferta } from '../modal-agregar-oferta/modal-agregar-oferta.component';
import {Usuarios} from '../../Interfaces/usuarios';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {mensajeErrorElectiva,mensajeExitoElectiva,mensajeErrorNombreRepetido} from '../modal/modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuariosRegistrados= new Array();
  correo:any;
  objeto:any={};


  constructor(public dialog: MatDialog,private registrar:RegistroDatosService) { 
    this.listarUsuarios();
  }

  ngOnInit() {
  }
  obtenerDatos(correo){
    // this.registrar.obtenerDatosNombreElectiva(nombre).subscribe(res=>{
      //this.objeto = res;
      for(let e in this.usuariosRegistrados){
        if(correo==this.usuariosRegistrados[e].Correo){
          var objUsuario= new Usuarios(this.usuariosRegistrados[e].Nombres,this.usuariosRegistrados[e].Apellidos,this.usuariosRegistrados[e].Correo,this.usuariosRegistrados[e].rol);
          this.correo= objUsuario.Correo;
          this.objeto= objUsuario;
          
        }
      }
    // });
    
  }
  openDialog() {
    const dialogRef = this.dialog.open(modalNuevoUsuario);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    
    });
  }
  openDialogEditar(correo){
    this.obtenerDatos(correo);
    const dialogRef = this.dialog.open(modalCambiarRol,{
      data: {
        
        email:correo,
        usuario:this.objeto,
        antiguo:this.correo
          }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarUsuarios();
    });

  }
  listarUsuarios(){
    this.registrar.obtenerUsuarios().subscribe(res => {
      this.usuariosRegistrados=new Array();
      //this.registrar.electivas= res as Electivas[];
      for(let p in res){
        this.usuariosRegistrados.push(res[p]);
      }
      
    }
    );
    
  }

}
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'modalNuevoUsuario',
  templateUrl: './modalNuevoUsuario.html',
  styleUrls: ['./usuarios.component.css']
})
export class modalNuevoUsuario implements OnInit {
  durationInSeconds = 5;
  nombresCampo;
  apellidosCampo;
  correoCampo;
  cargoCampo;
  rolCampo;
  nombresFormControl;
  apellidosFormControl;
  correoFormControl;
  cargoFormControl;
  usuarios:any={};
  rolFormControl;
  texto: any;
  nuevoTexto: any;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();
  constructor(private _snackBar: MatSnackBar,private registrar:RegistroDatosService,private router:Router,public dialog: MatDialog,public dialogRef: MatDialogRef<modalNuevoUsuario>)
  {

  }
  ngOnInit() {
    this.nombresFormControl= new FormControl('',[
      Validators.required,
      Validators.pattern("[A-Za-z ]+")
    ]);
    this.apellidosFormControl= new FormControl('',[
      Validators.required,
      Validators.pattern("[A-Za-z ]+")
    ]);
      this.rolFormControl= new FormControl('',[
      Validators.required
    ]);
  }
  openSnackBar() {
    this._snackBar.openFromComponent(mensajeExito, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openErrorSnackBar() {
    this._snackBar.openFromComponent(mensajeErrorOferta, {
      duration: this.durationInSeconds * 1000,
    });
  }

  registrarUsuarios(){
    
      if(this.nombresFormControl.hasError('required')){
        this.nombresCampo=true;
      }else if(this.nombresFormControl.hasError('pattern') ){
        
        this.nombresCampo=true;
      }else{
        this.nombresCampo=false;
      }
      if(this.apellidosFormControl.hasError('required')){
        this.apellidosCampo=true;
      }else if(this.apellidosFormControl.hasError('pattern')){
        this.apellidosCampo=true;
      }
      { this.apellidosCampo=false; }
      
       
      if(this.usuarios.rol==='Admin'||this.usuarios.rol==='Sin Rol'||this.usuarios.rol==='Administrativo'||this.usuarios.rol==='Coordinador'){
        this.rolCampo=false;
      }else{ this.rolCampo=true; 
      }
      
      if(!this.nombresCampo && !this.apellidosCampo && !this.rolCampo){
          this.usuarios.Nombres = this.MayusculaPrimera(this.usuarios.Nombres);
          this.usuarios.Apellidos = this.MayusculaPrimera(this.usuarios.Apellidos);
          this.registrar.saveUsuarios(this.usuarios).subscribe(res => {

            this.dialogRef.close();
            this.openSnackBar();
            
          })
     
      }else{
        this.openErrorSnackBar();
       // alert("Error en el registro");
      }
      this.listarUsuarios();
      
    
  }
  MayusculaPrimera(palabra:string){
    this.nuevoTexto = "";
    palabra = palabra.toLowerCase();

    this.texto = palabra.split(' ');
    for(let i in this.texto){
      palabra = this.texto[i];
      palabra = palabra.charAt(0).toUpperCase() + palabra.slice(1) + " ";
      this.nuevoTexto = this.nuevoTexto + palabra;
    }
    this.nuevoTexto = this.nuevoTexto.substring(0, this.nuevoTexto.length-1);
    return this.nuevoTexto;
  }
  listarUsuarios(){

  }
}
@Component({
  selector: 'mensajeEditar',
  templateUrl: './mensajeEditar.html',
  
})
export class mensajeEditar{}
@Component({
  selector: 'mensajeExito',
  templateUrl: './mensajeExito.html',
  
})
export class mensajeExito{}
export interface DialogData {
  
  email: any;
  usuario: any;
  correo:any;
 

}
@Component({
  selector: 'modalCambiarRol',
  templateUrl: './modalCambiarRol.html',
  styleUrls: ['./usuarios.component.css']
})
export class modalCambiarRol implements OnInit {
  durationInSeconds = 5;
  rolCampo;
  usuarios:any={};
  rolFormControl;
  texto: any;
  nuevoTexto: any;

  matcher = new MyErrorStateMatcher();
  constructor(private _snackBar: MatSnackBar,private registrar:RegistroDatosService,public dialog: MatDialog,public dialogRef: MatDialogRef<modalCambiarRol>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
  {
    this.listarUsuarios();
  }
  ngOnInit() {
      this.rolFormControl= new FormControl('',[
      Validators.required
    ]);
  }
  openSnackBar() {
    this._snackBar.openFromComponent(mensajeExito, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openSnackEditarBar() {
    this._snackBar.openFromComponent(mensajeEditar, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openErrorSnackBar() {
    this._snackBar.openFromComponent(mensajeErrorOferta, {
      duration: this.durationInSeconds * 1000,
    });
  }

  editarRol(){
    if(this.data.usuario.rol==='Admin'||this.data.usuario.rol==='Sin Rol'||this.data.usuario.rol==='Administrativo'||this.data.usuario.rol==='Coordinador'){
      this.rolCampo=false;
    }else{ this.rolCampo=true; 
    }
    if(!this.rolCampo){
          
        this.registrar.editarRol(this.data.email,this.data.usuario).subscribe(res => {         
          this.dialogRef.close();
          this.openSnackEditarBar();
          //this.router.navigate(['/GestionElectivas']);
        })
      
    }else{
     this.openErrorSnackBar();
    }
    this.listarUsuarios();
  }
  listarUsuarios(){

  }
}

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { Router } from '@angular/router';
import {MatDialog,MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { mensajeErrorOferta } from '../modal-agregar-oferta/modal-agregar-oferta.component';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuariosRegistrados= new Array();

  constructor(public dialog: MatDialog,private registrar:RegistroDatosService) { 
    this.listarUsuarios();
  }

  ngOnInit() {
  }
  openDialog() {
    debugger;
    const dialogRef = this.dialog.open(modalNuevoUsuario);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    
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
    this.cargoFormControl= new FormControl('',[
      Validators.required
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
    debugger;
    
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
      
      if(this.usuarios.Cargo==='Docente'||this.usuarios.Cargo==='Administrativo'||this.usuarios.Cargo==='Jefe de Departamento'||this.usuarios.Cargo==='Coordinador'){
        this.cargoCampo=false;
      }else{ this.cargoCampo=true; }
      
      if(this.usuarios.rol==='Admin'||this.usuarios.rol==='Sin Rol'||this.usuarios.rol==='Administrativo'||this.usuarios.rol==='Coordinador'){
        this.rolCampo=false;
      }else{ this.rolCampo=true; 
      }
      
      if(!this.nombresCampo && !this.apellidosCampo && !this.cargoCampo && !this.rolCampo){
          this.usuarios.Nombres = this.MayusculaPrimera(this.usuarios.Nombres);
          this.usuarios.Apellidos = this.MayusculaPrimera(this.usuarios.Apellidos);
          debugger;
          this.registrar.saveUsuarios(this.usuarios).subscribe(res => {
            debugger;
            //alert(res);

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
  selector: 'mensajeExito',
  templateUrl: './mensajeExito.html',
  
})
export class mensajeExito{}

import { Component, OnInit ,Inject} from '@angular/core';
import { Electivas} from '../../Interfaces/electivas';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
export interface DialogData {
  
  name: string;
  electiva: any;
  antiguo:any;
  lista:any;

}

@Component({
  selector: 'app-modal-editar-electiva',
  templateUrl: './modal-editar-electiva.component.html',
  styleUrls: ['./modal-editar-electiva.component.css']
})
export class ModalEditarElectivaComponent implements OnInit {
  electivas:any={};
  electivasRegistradas = new Array();
  nombreCampo;
  contenidoCampo;
  departamentoCampo;
  tipoCampo;
  nombreFormControl;
  contenidoFormControl;
  departamentoFormControl;
  tipoFormControl;
  
  
  constructor(private registrar:RegistroDatosService,private router:Router,public dialog: MatDialog,public dialogRef: MatDialogRef<ModalEditarElectivaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData)
  {
    this.listarElectivas();
  }
  ngOnInit() {
    this.nombreFormControl = new FormControl('', [
      Validators.required,
      
    ]);
    this.nombreFormControl = new FormControl('', [
      Validators.pattern("[A-Za-z ]+"),
      
    ]);
    this.contenidoFormControl = new FormControl('', [
      Validators.required,
    ]);
    this.contenidoFormControl = new FormControl('', [
      Validators.pattern("[A-Za-z ]+"),
    ]);
  }
  editarElectivas(){
    
    if(this.nombreFormControl.hasError('required')){
      this.nombreCampo=true;
    }else if(this.nombreFormControl.hasError('pattern') ){
      
      this.nombreCampo=true;
    }else{
      this.nombreCampo=false;
    }
    if(this.contenidoFormControl.hasError('required')){
      this.contenidoCampo=true;
    }else if(this.contenidoFormControl.hasError('pattern')){
      this.contenidoCampo=true;
    }
    { this.contenidoCampo=false; }
    
    if(!this.nombreCampo && !this.contenidoCampo && !this.departamentoCampo && !this.tipoCampo){
    
      if(!this.validarNombreElectivaEdit(this.data.electiva.NombreElectiva)){
       this.electivas.nombre = this.MayusculaPrimera(this.data.electiva.NombreElectiva);
        this.registrar.editarElectiva(this.data.antiguo,this.data.electiva).subscribe(res => {
          
          alert(res);
          this.listarElectivas();
          this.dialogRef.close();
          //this.router.navigate(['/GestionElectivas']);
        })
      }else{
        alert("Error en el registro: Nombre Electiva Existente");
        this.data.electiva.NombreElectiva=this.data.antiguo;
      }
    }else{
      alert("Error en el registro");
    }
    this.listarElectivas();
  }
  
  
  listarElectivas(){
    this.registrar.obtenerInformacionElectivas().subscribe(res => {
      this.electivasRegistradas=new Array();
      //this.registrar.electivas= res as Electivas[];
      for(let p in res){
        this.electivasRegistradas.push(res[p]);
      }
      
    }
    );
    
  }
  validarNombreElectivaEdit(nuevoNombre: any){
    var existe=false; 
    console.log("listado ofertas",this.electivasRegistradas);
    for(let i in this.electivasRegistradas) {
      console.log(this.data.antiguo,nuevoNombre,this.electivasRegistradas[i].nombre);
    
      if ( this.electivasRegistradas[i].nombre==nuevoNombre && this.data.antiguo != nuevoNombre) {
        existe = true;
        console.log(this.data.antiguo,nuevoNombre);
      }
    }
    return existe;
  }
  MayusculaPrimera(palabra:string){
    palabra = palabra.toLowerCase();
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  }
 
  
}

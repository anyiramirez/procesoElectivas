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
  objeto:any={};
  nombreAntiguo:any;
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
    this.departamentoFormControl = new FormControl('', [
      Validators.required,
      
    ]);
    this.tipoFormControl = new FormControl('', [
      Validators.required,
    ]);
  }
  registrarElectivas(){
    
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
    
    if(this.electivas.departamento === 'Electrónica instrumentación y control' ||this.electivas.departamento === 'Sistemas'||this.electivas.departamento === 'Telecomunicaciones'||this.electivas.departamento === 'Telemática'){
      this.departamentoCampo=false;
    }else{ this.departamentoCampo=true; }
    
    if(this.electivas.tipo === 'Teórica' ||this.electivas.tipo === 'Práctica'||this.electivas.tipo === 'Teórico Práctica'){
      this.tipoCampo=false;
    }else{ this.tipoCampo=true; }
    
    if(!this.nombreCampo && !this.contenidoCampo && !this.departamentoCampo && !this.tipoCampo){
      if(!this.validarElectivaUnica(this.electivas.nombre)){
        this.electivas.nombre = this.MayusculaPrimera(this.electivas.nombre);
        this.electivas.estado = 'Habilitar';
        this.registrar.saveElectivas(this.electivas).subscribe(res => {
          alert(res);
          this.listarElectivas();
          this.limpiarModal();
          this.router.navigate(['/GestionElectivas']);
        })
      }else{
        alert("Error en el registro: Nombre Electiva Existente");
      }
    }else{
      alert("Error en el registro");
    }
    this.listarElectivas();
    
  }
  
  editarElectivas(){
    
    //this.getEditarElectivas();
    if(this.nombreFormControl.hasError('required')&&this.nombreFormControl.hasError('pattern')){
      this.nombreCampo=true;
      alert("falta nombre");
    }else{ this.nombreCampo=false; }
    
    
    if(this.contenidoFormControl.hasError('required')){
      this.contenidoCampo=true;
    }else{ this.contenidoCampo=false; }
    
    if(this.data.electiva.Departamento === 'Electrónica instrumentación y control' ||this.data.electiva.Departamento === 'Sistemas'||this.data.electiva.Departamento === 'Telecomunicaciones'||this.data.electiva.Departamento === 'Telemática'){
      this.departamentoCampo=false;
    }else{ this.departamentoCampo=true; }
    
    if(this.data.electiva.TipoElectiva === 'Teórica' ||this.data.electiva.TipoElectiva === 'Práctica'||this.data.electiva.TipoElectiva === 'Teórico Práctica'){
      this.tipoCampo=false;
    }else{ this.tipoCampo=true; }
    
    if(!this.nombreCampo && !this.contenidoCampo && !this.departamentoCampo && !this.tipoCampo){
      debugger;
      if(!this.validarElectivaUnica(this.data.electiva.NombreElectiva)){
        debugger;
        this.registrar.editarElectiva(this.data.antiguo,this.data.electiva).subscribe(res => {
          
          alert(res);
          this.listarElectivas();
          this.limpiarModal();
          //this.router.navigate(['/GestionElectivas']);
        })
      }else{
        alert("Error en el registro: Nombre Electiva Existente");
      }
    }else{
      alert("Error en el registro");
    }
    this.listarElectivas();
  }
  
  limpiarModal(){
    this.electivas.nombre= '';
    this.electivas.contenido = '';
    this.electivas.tipo = '';
    this.electivas.departamento = '';
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
  // obtenerElectiva(nombre){
  //   this.registrar.obtenerDatosNombreElectiva(nombre).subscribe(res=>{
  //     //this.objeto = res;
  //     for(let e in this.data.lista){
  //       if(nombre==this.data.lista[e].nombre){
  //         var objElectiva = new Electivas(this.data.lista[e][e].nombre,this.data.lista[e].contenido,this.electivasRegistradas[e].departamento,this.electivasRegistradas[e].tipo);
  //         this.nombreAntiguo= objElectiva.NombreElectiva;
  //        this.objeto= objElectiva;
          
          
  //       }
  //     }
  //     //this.objeto=res;
  //   });

  // }
  ActualizarEstado(nombre){
    
    this.registrar.editarEstado(nombre).subscribe(res => {
      if(res === "funciono"){
        this.listarElectivas();
      }
    });
  }
  validarElectivaUnica(nuevaElectiva: any){
    var existe=false; 
    for(let i in this.electivasRegistradas) {
      if ( this.electivasRegistradas[i].nombre==nuevaElectiva) {
        existe = true;
      }
    }
    return existe;
  }
  
  MayusculaPrimera(palabra:string){
    palabra = palabra.toLowerCase();
    return palabra.charAt(0).toUpperCase() + palabra.slice(1);
  }
 
  
}

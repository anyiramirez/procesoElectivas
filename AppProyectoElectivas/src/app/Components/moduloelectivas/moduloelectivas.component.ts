import { Component, OnInit,Inject } from '@angular/core';
import { Electivas} from '../../Interfaces/electivas';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { ModalEditarElectivaComponent} from '../modal-editar-electiva/modal-editar-electiva.component'


@Component({
  selector: 'app-moduloelectivas',
  templateUrl: './moduloelectivas.component.html',
  styleUrls: ['./moduloelectivas.component.css']
})

export class ModuloelectivasComponent{
  electivas:any={};
  objeto:any={};
  nombreAntiguo:any;
  electivasRegistradas = new Array();

  
  constructor(private registrar:RegistroDatosService,private router:Router,public dialog: MatDialog)
  {
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
  obtenerElectiva(nombre){
    // this.registrar.obtenerDatosNombreElectiva(nombre).subscribe(res=>{
      //this.objeto = res;
      for(let e in this.electivasRegistradas){
        if(nombre==this.electivasRegistradas[e].nombre){
          var objElectiva = new Electivas(this.electivasRegistradas[e].nombre,this.electivasRegistradas[e].contenido,this.electivasRegistradas[e].departamento,this.electivasRegistradas[e].tipo);
          this.nombreAntiguo= objElectiva.NombreElectiva;
          this.objeto= objElectiva;
          
        }
      }
    // });
    
  }
  ActualizarEstado(nombre){
    
    this.registrar.editarEstado(nombre).subscribe(res => {
      if(res === "funciono"){
        this.listarElectivas();
      }
    });
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(ModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.listarElectivas();
    });
  }
  openDialogEditar(nameElectiva){
    this.obtenerElectiva(nameElectiva);
    const dialogRef = this.dialog.open(ModalEditarElectivaComponent,{
      data: {
        
        name:nameElectiva,
        electiva:this.objeto,
        antiguo:this.nombreAntiguo
          }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.listarElectivas();
    });

  }

  
}

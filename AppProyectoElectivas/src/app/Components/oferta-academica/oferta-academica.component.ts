import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RegistroDatosService} from '../../Services/registro-datos.service';
import { Electivas} from '../../Interfaces/electivas';
import { Oferta} from '../../Interfaces/oferta'
import {FormControl, Validators} from '@angular/forms';
import { DatosOferta } from '../../Interfaces/datos-oferta';
import { ModalAgregarOfertaComponent } from '../modal-agregar-oferta/modal-agregar-oferta.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { analyzeAndValidateNgModules } from '@angular/compiler';
export interface DialogData {
  oferta: any;
  name: string;
  
}

@Component({
  selector: 'app-oferta-academica',
  templateUrl: './oferta-academica.component.html',
  styleUrls: ['./oferta-academica.component.css']
})
export class OfertaAcademicaComponent implements OnInit {
  contador:number;
  estados = new Array();
  cantidades= new Array();
  ElectivasOfertaActual= new Array();
  nombreOfertaACtual;
  obtenerOfertas = new Array();
  
  constructor(private registrar:RegistroDatosService,private router:Router,public dialog: MatDialog) {
    this.listarOfertas();
  }
  
  ngOnInit() {
  }
  
  listarOfertas(){
    this.registrar.obtenerOfertas().subscribe(res => {
      this.obtenerOfertas= new Array();
      this.registrar.electivas= res as Electivas[];
      var band=0;
      for(let p in res){ 
        var contador = res[p].electivasOfertadas.length;
        // this.cantidad[band]=contador; {{cantidad[indice]}}
        var estado = this.estadoOferta(res[p].fechaInicio,res[p].fechaFin);
        this.cantidades[band]=contador;
        this.estados[band]=estado;
        
        this.obtenerOfertas.push(res[p]); 
        band++; 
      }
      
    });
  }
  
  detalleOferta(id: number){
    this.ElectivasOfertaActual=this.obtenerOfertas[id].electivasOfertadas;
    this.nombreOfertaACtual=this.obtenerOfertas[id].anio+"/"+this.obtenerOfertas[id].periodo; 
  }
    
  estadoOferta(fechaInicio:any,fechaFin:any){
    var fecha = new Date(); 
    var f1= new Date(fechaInicio);
    var f2= new Date(fechaFin);
    fecha.setHours(0,0,0,0);
    if(fecha < f1){
      return "Pendiente"
    }
    if (fecha > f2){
      return "Finalizado"
    }
    else{
      return "En curso"
    }
  }
  openDialog() {
    const dialogRef = this.dialog.open(ModalAgregarOfertaComponent);
    
    dialogRef.afterClosed().subscribe(result => {  
      this.listarOfertas();
    
    });
  }
  
  openDialogVer(i:number):void {
    
    const dialogRef = this.dialog.open(modalVer,{
      
      data: {
        oferta:this.ElectivasOfertaActual=this.obtenerOfertas[i].electivasOfertadas,
        name: this.nombreOfertaACtual=this.obtenerOfertas[i].anio+"/"+this.obtenerOfertas[i].periodo
      }
      
    });
    
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  
}
@Component({
  selector: 'modalVer',
  templateUrl: 'modalVer.html',
})
export class modalVer implements OnInit {
  public versions: any[] = [];
  public versionIndex: number = 0;
  constructor(
    public dialogRef: MatDialogRef<modalVer>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
    
    onNoClick(): void {
      this.dialogRef.close();
    }
    
    ngOnInit(){
    }
  }
  
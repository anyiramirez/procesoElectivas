import { Injectable } from '@angular/core';
import { RegistroDatosService} from './registro-datos.service';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { MensajesComponent } from './mensajes/mensajes.component';
import {MatSnackBar} from '@angular/material/snack-bar';




const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  op: any;
  durationInSeconds=5;
  constructor(private _snackBar: MatSnackBar,private registrar:RegistroDatosService) { }
  openMensaje() {
    this._snackBar.openFromComponent(MensajesComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }
  
  importSheet(evt: any){
    /* wire up file reader */
    
    const reader: FileReader = new FileReader();
    
    
    reader.onload = (e: any) => {
      /* read workbook */
      var splitted;
      var nombre=evt.name;
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
      
      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      splitted = nombre.split(".", 1);
      nombre=splitted[0]; 
      splitted = nombre.split("-", 2);
      nombre=splitted[0];
      console.log(nombre);
      /* save data */
      this.op = (XLSX.utils.sheet_to_json(ws, {header: 1}));
      this.registrar.subirJSON(this.op,nombre);
      this.openMensaje();
   
    };
    
    reader.readAsBinaryString(evt);
    
    
  }
}



import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule} from 'ngx-pagination';
//Angular material
import { MatInputModule} from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule,MatNativeDateModule} from '@angular/material';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import {MatDialogModule} from "@angular/material";
import { AlertsModule } from 'angular-alert-module';
import {MatDialog} from '@angular/material/dialog';

import { MatTabsModule} from '@angular/material/tabs';
import { NgxFileDropModule } from 'ngx-file-drop';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBarModule} from '@angular/material/snack-bar';


import { RegisterInfoComponent } from './Components/register-info/register-info.component';
import { OpcionesAdminComponent} from './Components/opciones-admin/opciones-admin.component';
import { EncabezadoComponent } from './Components/encabezado/encabezado.component';
import { PrincipaladmiComponent } from './Components/principaladmi/principaladmi.component';
import { ListasasignacionComponent } from './Components/listasasignacion/listasasignacion.component';
import { AsignacionelectivaComponent } from './Components/asignacionelectiva/asignacionelectiva.component';
import { ModuloelectivasComponent } from './Components/moduloelectivas/moduloelectivas.component';
import { OfertaAcademicaComponent, modalVer } from './Components/oferta-academica/oferta-academica.component';
import { InscripcionComponent, mensajeErroInscripcion, mensajeExitoInscripcion } from './Components/inscripcion/inscripcion.component';
import { EncabezadoInscripcioComponent } from './Components/encabezado-inscripcio/encabezado-inscripcio.component';
import { LoginComponent } from './Components/login/login.component';
import { ModalComponent, mensajeErrorElectiva, mensajeErrorNombreRepetido, mensajeExitoElectiva } from './Components/modal/modal.component';
import { ModalEditarElectivaComponent } from './Components/modal-editar-electiva/modal-editar-electiva.component';
import { ModalAgregarOfertaComponent, mensajeExitoOferta, mensajeErroRepetido, mensajeErrorOferta } from './Components/modal-agregar-oferta/modal-agregar-oferta.component';


import { UsuariosComponent, modalNuevoUsuario, mensajeExito} from './Components/usuarios/usuarios.component';
import { VistaAdminComponent } from './Components/vista-admin/vista-admin.component';
import { VistaCoordinadorComponent } from './Components/vista-coordinador/vista-coordinador.component';
import { VistaAdministrativoComponent } from './Components/vista-administrativo/vista-administrativo.component';
import { combineLatest } from 'rxjs';

const Rutas: Routes = [
  {path: 'Administrador', component: PrincipaladmiComponent},
  {path: 'InformacionEstudiantes', component: RegisterInfoComponent },
  {path: 'ListasAsignadas', component: ListasasignacionComponent},
  {path: 'AsignacionElectiva/:id', component: AsignacionelectivaComponent},
  {path: 'GestionElectivas', component: ModuloelectivasComponent },
  {path: 'OfertaAcademica', component: OfertaAcademicaComponent},
  {path: 'Inscripcion', component:InscripcionComponent},
  {path: 'Usuarios',component:UsuariosComponent},
  {path: 'VistaAdmin', component:VistaAdminComponent},
  {path: 'VistaCoordinador',component:VistaCoordinadorComponent},
  {path: 'VistaAdministrativa',component:VistaAdministrativoComponent},

  {path: '', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterInfoComponent,
    OpcionesAdminComponent,
    EncabezadoComponent,
    PrincipaladmiComponent,
    ListasasignacionComponent,
    AsignacionelectivaComponent,
    ModuloelectivasComponent,
    OfertaAcademicaComponent,
    InscripcionComponent,
    LoginComponent,
    EncabezadoInscripcioComponent,
    ModalComponent,
    ModalEditarElectivaComponent,
    ModalAgregarOfertaComponent,
    modalVer,
    modalNuevoUsuario,
    mensajeExito,
    mensajeExitoOferta,
    mensajeErroRepetido,
    mensajeErrorElectiva,
    mensajeErrorNombreRepetido,
    mensajeExitoElectiva,
    mensajeErrorOferta,
    mensajeErroInscripcion,
    mensajeExitoInscripcion,
    UsuariosComponent,
    VistaAdminComponent,
    VistaCoordinadorComponent,
    VistaAdministrativoComponent
  ],
  imports: [
    AlertsModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(Rutas),
    ReactiveFormsModule,
    MatDialogModule,
    NgxPaginationModule,
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    MatInputModule,
    MatCheckboxModule,
    NoopAnimationsModule,
    MatRadioModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatSelectModule,
    NgxFileDropModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_dcEHRh3Lwh4aSLqw-B581hRShWHdbWI'
    })
  ],
  providers: [  ],
  
  bootstrap: [AppComponent],

  entryComponents: [
    ModalComponent,
    OfertaAcademicaComponent,
    ModalEditarElectivaComponent,
    ModalAgregarOfertaComponent,
    modalVer,
    modalNuevoUsuario,
    mensajeExito,
    mensajeExitoOferta,
    mensajeErroRepetido,
    mensajeErrorOferta,
    mensajeErrorElectiva,
    mensajeErrorNombreRepetido,
    mensajeExitoElectiva,
    mensajeErroInscripcion,
    mensajeExitoInscripcion
]

})
export class AppModule { }

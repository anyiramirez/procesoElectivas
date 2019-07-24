import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
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

import { MatTabsModule} from '@angular/material/tabs';
import { NgxFileDropModule } from 'ngx-file-drop';
import {CustExtBrowserXhr} from './Components/login/cust-ext-browser-xhr';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserXhr } from '@angular/http';

import { RegisterInfoComponent } from './Components/register-info/register-info.component';
import { OpcionesAdminComponent} from './Components/opciones-admin/opciones-admin.component';
import { EncabezadoComponent } from './Components/encabezado/encabezado.component';
import { PrincipaladmiComponent } from './Components/principaladmi/principaladmi.component';
import { ListasasignacionComponent } from './Components/listasasignacion/listasasignacion.component';
import { AsignacionelectivaComponent } from './Components/asignacionelectiva/asignacionelectiva.component';
import { ModuloelectivasComponent } from './Components/moduloelectivas/moduloelectivas.component';
import { OfertaAcademicaComponent } from './Components/oferta-academica/oferta-academica.component';
import { InscripcionComponent } from './Components/inscripcion/inscripcion.component';
import { EncabezadoInscripcioComponent } from './Components/encabezado-inscripcio/encabezado-inscripcio.component';
import { LoginComponent } from './Components/login/login.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

const Rutas: Routes = [
  {path: 'Administrador', component: PrincipaladmiComponent},
  {path: 'InformacionEstudiantes', component: RegisterInfoComponent },
  {path: 'ListasAsignadas', component: ListasasignacionComponent},
  {path: 'AsignacionElectiva/:id', component: AsignacionelectivaComponent},
  {path: 'GestionElectivas', component: ModuloelectivasComponent },
  {path: 'OfertaAcademica', component: OfertaAcademicaComponent},
  {path: 'Inscripcion', component:InscripcionComponent},
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
    EncabezadoInscripcioComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(Rutas),
    ReactiveFormsModule,
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
  bootstrap: [AppComponent]
})
export class AppModule { }

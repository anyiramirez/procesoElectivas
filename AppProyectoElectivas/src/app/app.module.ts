import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule} from 'ngx-pagination';

import { environment} from '../environments/environment';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { from } from 'rxjs';

import { LoginComponent } from './Components/login/login.component';
import { RegisterInfoComponent } from './Components/register-info/register-info.component';
import { OpcionesAdminComponent} from './Components/opciones-admin/opciones-admin.component';
import { EncabezadoComponent } from './Components/encabezado/encabezado.component';
import { PrincipaladmiComponent } from './Components/principaladmi/principaladmi.component';
import { ListasasignacionComponent } from './Components/listasasignacion/listasasignacion.component';
import { AsignacionelectivaComponent } from './Components/asignacionelectiva/asignacionelectiva.component';

const Rutas: Routes = [  
  {path: 'Administrador', component: PrincipaladmiComponent},
  {path: 'InformacionEstudiantes', component: RegisterInfoComponent },
  {path: 'ListasAsignadas', component: ListasasignacionComponent},
  {path: 'AsignacionElectiva/:id', component: AsignacionelectivaComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterInfoComponent,
    OpcionesAdminComponent,
    EncabezadoComponent,
    PrincipaladmiComponent,
    ListasasignacionComponent,
    AsignacionelectivaComponent
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
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD_dcEHRh3Lwh4aSLqw-B581hRShWHdbWI'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { ClienteComponent } from './pages/cliente/cliente.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { NuevoComponent } from './pages/login/nuevo/nuevo.component';
import { Not404Component } from './pages/not404/not404.component';
import { Not403Component } from './pages/not403/not403.component';
import { GuardService } from './_service/guard.service';
import { LoginComponent } from './pages/login/login.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { VentaComponent } from './pages/venta/venta.component';
import { ComidaComponent } from './pages/comida/comida.component';
import { PeliculaEdicionComponent } from './pages/pelicula/pelicula-edicion/pelicula-edicion.component';
import { GeneroComponent } from './pages/genero/genero.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';

const routes: Routes = [
  { path: 'genero', component: GeneroComponent, canActivate: [GuardService] },
  { path: 'comida', component: ComidaComponent, canActivate: [GuardService] },
  { path: 'venta', component: VentaComponent, canActivate: [GuardService] },
  { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService] },
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
  {
    path: 'pelicula', component: PeliculaComponent, children: [
      // pelicula/edicion
      // pelicula/nuevo
      { path: 'nuevo', component: PeliculaEdicionComponent },
      { path: 'edicion/:id', component: PeliculaEdicionComponent }
    ], canActivate: [GuardService]
  },
  { path: 'cliente', component: ClienteComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'login', component: LoginComponent },
  { path: 'nuevo-usuario', component: NuevoComponent },
  { path: 'not-403', component: Not403Component },
  { path: 'not-404', component: Not404Component },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'not-404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

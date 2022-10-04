import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteAgregarComponent } from './components/cliente/cliente-agregar/cliente-agregar.component';
import { ClienteDetallesComponent } from './components/cliente/cliente-detalles/cliente-detalles.component';
import { ClienteEditarComponent } from './components/cliente/cliente-editar/cliente-editar.component';
import { ClienteListaComponent } from './components/cliente/cliente-lista/cliente-lista.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: LayoutComponent, children: [
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'clientes', component: ClienteListaComponent},
    {path: 'clientes/agregar', component: ClienteAgregarComponent},
    {path: 'clientes/:id/editar', component: ClienteEditarComponent},
    {path: 'clientes/:id/detalles', component: ClienteDetallesComponent},
    {path: '**', redirectTo: 'dashboard'}
  ]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

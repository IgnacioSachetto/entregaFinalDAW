import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NuevoEspacioComponent } from './nuevo-espacio/nuevo-espacio.component';
import { ModificarEspacioComponent } from './modificar-espacio/modificar-espacio.component';

import { NuevaReservaComponent } from './nueva-reserva/nueva-reserva.component';
import { ModificarReservaComponent } from './modificar-reserva/modificar-reserva.component';
import { ModificarReservanteComponent } from './modificar-reservante/modificar-reservante.component';
import { NuevoReservanteComponent } from './nuevo-reservante/nuevo-reservante.component';

const routes: Routes = [
  { path: 'nuevo-espacio', component: NuevoEspacioComponent },
  { path: 'modificar-espacio', component: ModificarEspacioComponent },
  { path: 'nueva-reserva', component: NuevaReservaComponent },
  { path: 'modificar-reserva', component: ModificarReservaComponent },
  { path: 'nuevo-reservante', component: NuevoReservanteComponent },
  { path: 'modificar-reservante', component: ModificarReservanteComponent }

];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

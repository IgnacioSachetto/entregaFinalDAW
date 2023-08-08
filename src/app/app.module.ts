import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NuevoEspacioComponent } from './nuevo-espacio/nuevo-espacio.component';
import { NuevoReservanteComponent } from './nuevo-reservante/nuevo-reservante.component';
import { ModificarEspacioComponent } from './modificar-espacio/modificar-espacio.component';
import { ModificarReservanteComponent } from './modificar-reservante/modificar-reservante.component';

import { ModificarReservaComponent } from './modificar-reserva/modificar-reserva.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NuevoEspacioComponent,
    NuevoReservanteComponent,
    ModificarEspacioComponent,
    ModificarReservanteComponent,
    ModificarReservaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

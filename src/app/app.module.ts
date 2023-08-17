import { DatePipe, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ModificarEspacioComponent } from './modificar-espacio/modificar-espacio.component';
import { ModificarReservaComponent } from './modificar-reserva/modificar-reserva.component';
import { ModificarReservanteComponent } from './modificar-reservante/modificar-reservante.component';
import { NuevaReservaComponent } from './nueva-reserva/nueva-reserva.component';
import { NuevoEspacioComponent } from './nuevo-espacio/nuevo-espacio.component';
import { NuevoReservanteComponent } from './nuevo-reservante/nuevo-reservante.component';






registerLocaleData(localeEs);

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
    NuevaReservaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,


  ],
  providers: [DatePipe,  { provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }

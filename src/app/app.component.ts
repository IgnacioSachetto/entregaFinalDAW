import { Component } from '@angular/core';
import { UsuariosService } from './service/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private servicioUsuario: UsuariosService, private router: Router) {
  }

  titulo = 'Mi primera App 2023';
  edad = 10;
  nombres = [];
  mostrarComponenteNuevoEspacio: boolean = false;





  redirigirANuevoEspacio() {
    this.router.navigate(['nuevo-espacio']);
  }

  redirigirAListadoDeEspacios() {
    this.router.navigate(['modificar-espacio']);
  }



  redirigirANuevoUsuario() {
    this.router.navigate(['nuevo-reservante']);
  }

  redirigirAListadoDeReservantes(){
    this.router.navigate(['modificar-reservante']);

  }

  redirigirAListadoDeReserva(){
    this.router.navigate(['modificar-reserva']);

  }



  redirigirANuevaReserva(){
    this.router.navigate(['nueva-reserva']);

  }

}

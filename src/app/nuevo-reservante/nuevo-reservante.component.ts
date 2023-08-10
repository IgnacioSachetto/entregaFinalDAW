import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-nuevo-reservante',
  templateUrl: './nuevo-reservante.component.html',
  styleUrls: ['./nuevo-reservante.component.css']
})
export class NuevoReservanteComponent implements OnInit {

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
  }

  guardarReservante() {
    const nombreInput = (document.getElementById('nombre') as HTMLInputElement);
    const apellidoInput = (document.getElementById('apellido') as HTMLInputElement);
    const legajoInput = (document.getElementById('legajo') as HTMLInputElement);
    const dniInput = (document.getElementById('dni') as HTMLInputElement);
    const emailInput = (document.getElementById('email') as HTMLInputElement);
    const telefonoInput = (document.getElementById('telefono') as HTMLInputElement);

    const nombre = nombreInput.value;
    const apellido = apellidoInput.value;
    const legajo = legajoInput.value;
    const dni = dniInput.value;
    const email = emailInput.value;
    const telefono = telefonoInput.value;

    const reservante = {
      nombre: nombre,
      apellido: apellido,
      legajo: legajo,
      dni: dni,
      email: email,
      telefono: telefono
    };

    // Llama al método agregarUsuario() del servicio para guardar el nuevo usuario
    this.usuariosService.agregarUsuario(reservante).subscribe(
      (data) => {
        console.log('Usuario guardado correctamente:', data);
        // Restablece los valores de los campos a cadenas vacías después de guardar
        nombreInput.value = '';
        apellidoInput.value = '';
        legajoInput.value = '';
        dniInput.value = '';
        emailInput.value = '';
        telefonoInput.value = '';
      },
      (error) => {
        console.error('Error al guardar el usuario:', error);
      }
    );
  }

}

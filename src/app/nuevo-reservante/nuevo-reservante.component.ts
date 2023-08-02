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
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const apellido = (document.getElementById('apellido') as HTMLInputElement).value;
    const legajo = (document.getElementById('legajo') as HTMLInputElement).value;
    const dni = (document.getElementById('dni') as HTMLInputElement).value;
    const email = (document.getElementById('email') as HTMLInputElement).value;
    const telefono = (document.getElementById('telefono') as HTMLInputElement).value;

    // Crea el objeto de usuario con los datos ingresados en el formulario
    const nuevoUsuario = {
      nombre: nombre,
      apellido: apellido,
      legajo: legajo,
      dni: dni,
      email: email,
      telefono: telefono
    };

    // Llama al método agregarUsuario() del servicio para guardar el nuevo usuario
    this.usuariosService.agregarUsuario(nuevoUsuario).subscribe(
      (data) => {
        console.log('Usuario guardado correctamente:', data);
      },
      (error) => {
        console.error('Error al guardar el usuario:', error);
      }
    );
  }
}

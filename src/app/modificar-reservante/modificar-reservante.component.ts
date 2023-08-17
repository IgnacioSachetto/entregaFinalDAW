import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ReservantesService } from '../service/reservantes.service';

@Component({
  selector: 'app-modificar-reservante',
  templateUrl: './modificar-reservante.component.html',
  styleUrls: ['./modificar-reservante.component.css']
})
export class ModificarReservanteComponent implements OnInit {
  reservantes: any[] = [];
  modoEditar: boolean = false;
  indiceEditando: number = -1;
  reservanteEditando: any = {};

  constructor(private reservantesService: ReservantesService) { }

  ngOnInit(): void {
    this.obtenerReservantes();
  }

  // Cargar la lista de reservantes
  obtenerReservantes() {
    this.reservantesService.getReservantes().subscribe(
      (data) => {
        this.reservantes = data;
      },
      (error) => {
        console.error('Error al obtener la lista de reservantes:', error);
      }
    );
  }

  // Buscar por legajo
  buscarPorLegajo() {
    const legajoInput = (document.getElementById('filtroLegajo') as HTMLInputElement);
    const legajo = legajoInput.value;

    if (legajo.trim() !== '') {
      this.reservantesService.buscarReservantePorLegajo(legajo).subscribe(
        (data) => {
          this.reservantes = data;
          legajoInput.value = '';
        },
        (error) => {
          console.error('Error al obtener el usuario por legajo:', error);
        }
      );
    }
  }

  // Buscar por DNI
  buscarPorDNI() {
    const dniInput = (document.getElementById('filtroDNI') as HTMLInputElement);
    const dni = dniInput.value;

    if (dni.trim() !== '') {
      this.reservantesService.buscarReservantePorDni(dni).subscribe(
        (data) => {
          this.reservantes = data;
          dniInput.value = '';
        },
        (error) => {
          console.error('Error al obtener el usuario por DNI:', error);
        }
      );
    }
  }

  // Editar usuario
  editarUsuario(i: number) {
    this.modoEditar = true;
    this.indiceEditando = i;
    this.reservanteEditando = { ...this.reservantes[i] };
  }

  // Guardar usuario
  guardarUsuario() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se actualizarán los datos del usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservantesService.modificarReservante(this.reservanteEditando).subscribe(
          (data) => {
            Swal.fire({
              title: 'Usuario Actualizado',
              text: 'Los datos del usuario se han actualizado correctamente',
              icon: 'success'
            });

            console.log('Usuario actualizado correctamente:', data);
            this.modoEditar = false;
            this.indiceEditando = -1;
            this.reservanteEditando = {};
            this.obtenerReservantes();
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al actualizar el usuario',
              icon: 'error'
            });

            console.error('Error al actualizar el usuario:', error);
          }
        );
      }
    });
  }

  // Eliminar usuario
  eliminarUsuario(reservante: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminará el usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservantesService.eliminarUsuario(reservante.id).subscribe(
          (data) => {
            Swal.fire({
              title: 'Usuario Eliminado',
              text: 'El usuario se ha eliminado correctamente',
              icon: 'success'
            });

            console.log('Usuario eliminado correctamente:', data);

            const index = this.reservantes.findIndex(r => r.id === reservante.id);
            if (index !== -1) {
              this.reservantes.splice(index, 1);
            }

            this.modoEditar = false;
            this.indiceEditando = -1;
            this.reservanteEditando = {};
            this.obtenerReservantes();
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al eliminar el usuario',
              icon: 'error'
            });

            console.error('Error al eliminar el usuario:', error);
          }
        );
      }
    });
  }

  // Cancelar edición
  cancelarEdicion() {
    this.modoEditar = false;
    this.indiceEditando = -1;
    this.reservanteEditando = {};
  }
}

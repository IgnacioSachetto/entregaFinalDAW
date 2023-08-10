import { Component, OnInit } from '@angular/core';
import { ReservantesService } from '../service/reservantes.service';

@Component({
  selector: 'app-modificar-reservante',
  templateUrl: './modificar-reservante.component.html',
  styleUrls: ['./modificar-reservante.component.css']
})
export class ModificarReservanteComponent implements OnInit {
  reservantes: any[] = [];
  modoEditar: boolean = false;
  indiceEditando: number = -1; // Agregamos la variable para el índice del reservante que estamos editando
  reservanteEditando: any = {};

  constructor(private reservantesService: ReservantesService) { }

  ngOnInit(): void {
    this.obtenerReservantes();
  }

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

  buscarPorLegajo() {
    const legajoInput = (document.getElementById('filtroLegajo') as HTMLInputElement);
    const legajo = legajoInput.value;

    if (legajo.trim() !== '') {
      this.reservantesService.buscarReservantePorLegajo(legajo).subscribe(
        (data) => {
          this.reservantes = data; // Actualiza la lista de reservantes con los datos encontrados
           legajoInput.value = '';
        },
        (error) => {
          console.error('Error al obtener el usuario por legajo:', error);
        }
      );
    }
  }


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

  editarUsuario(i: number) {
    this.modoEditar = true;
    this.indiceEditando = i; // Establecemos el índice del reservante que estamos editando
    this.reservanteEditando = { ...this.reservantes[i] }; // Usamos los datos del reservante actual
  }

  guardarUsuario() {
    this.reservantesService.modificarReservante(this.reservanteEditando).subscribe(
      (data) => {
        console.log('Usuario actualizado correctamente:', data);
        this.modoEditar = false;
        this.indiceEditando = -1; // Reseteamos el índice
        this.reservanteEditando = {};
        this.obtenerReservantes(); // Recargamos los datos
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }


  eliminarUsuario(reservante: any) {
    this.reservantesService.eliminarUsuario(reservante.id).subscribe(
      (data) => {
        console.log('Usuario eliminado correctamente:', data);

        // Remover el reservante eliminado de la lista local
        const index = this.reservantes.findIndex(r => r.id === reservante.id);
        if (index !== -1) {
          this.reservantes.splice(index, 1);
        }

        // Restablecer los valores y recargar los datos
        this.modoEditar = false;
        this.indiceEditando = -1;
        this.reservanteEditando = {};
        this.obtenerReservantes();
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }


  cancelarEdicion() {
    this.modoEditar = false;
    this.indiceEditando = -1; // Reseteamos el índice
    this.reservanteEditando = {};
  }
}

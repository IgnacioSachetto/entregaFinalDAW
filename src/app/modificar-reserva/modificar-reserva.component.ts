import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EspaciosService } from '../service/espacios.service';
import { ReservantesService } from '../service/reservantes.service';
import { ReservasService } from '../service/reservas.service';

@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.css']
})
export class ModificarReservaComponent implements OnInit {
  reservas: any[] = [];
  espacios: any[] = [];
  reservantes: any[] = [];
  filtroEspacio: string = '';
  filtroReservante: string = '';
  modoEditar: boolean = false;
  indiceEditando: number = -1; // Agregamos la variable para el índice del reservante que estamos editando
  reservaEditando: any = {};

  constructor(private reservasService: ReservasService, private espaciosService: EspaciosService, private reservantesService: ReservantesService) { }

  ngOnInit(): void {
    this.buscarReservas();
    this.cargarEspacios();
    this.cargarReservantes();

  }

  buscarReservas() {
    this.reservasService.getReservas().subscribe(
      (data) => {
        console.log(data);
        this.reservas = data;
      },
      (error) => {
        console.error('Error al buscar las reservas:', error);
      }
    );
  }

  buscarPorReservante() {
    const reservanteInput = (document.getElementById('filtroReservante') as HTMLInputElement);
    const reservante = reservanteInput.value;

    if (reservante.trim() !== '') {
      this.reservasService.getReservaByReservante(reservante).subscribe(
        (data) => {
          this.reservas = data; // Actualiza la lista de reservas con los datos encontrados
          reservanteInput.value = '';
        },
        (error) => {
          console.error('Error al obtener la reserva por reservante:', error);
        }
      );
    }
  }


  buscarPorEspacio() {
    const espacioInput = (document.getElementById('filtroEspacio') as HTMLInputElement);
    const espacio = espacioInput.value;

    if (espacio.trim() !== '') {
      this.reservasService.getReservaByEspacio(espacio).subscribe(
        (data) => {
          this.reservas = data; // Actualiza la lista de reservantes con los datos encontrados
          espacioInput.value = '';
        },
        (error) => {
          console.error('Error al obtener la reserva por espacio:', error);
        }
      );
    }
  }

  cargarEspacios() {
    this.espaciosService.getEspacios().subscribe(
      (data) => {
        this.espacios = data;
      },
      (error) => {
        console.error('Error al cargar la lista de espacios:', error);
      }
    );
  }

  cargarReservantes() {
    this.reservantesService.getReservantes().subscribe(
      (data) => {
        console.log(data);
        this.reservantes = data;
      },
      (error) => {
        console.error('Error al cargar la lista de espacios:', error);
      }
    );
  }


  editarReserva(i: number) {
    this.modoEditar = true;
    this.indiceEditando = i;
    this.reservaEditando = { ...this.reservas[i] };
    this.reservaEditando.fechaReserva = this.formatDate(this.reservas[i].fechaReserva);
    this.reservaEditando.fechaFinReserva = this.formatDate(this.reservas[i].fechaFinReserva);
  }

  formatDate(date: string): string {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 16); // Formato yyyy-MM-ddTHH:mm
  }



  guardarReserva() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se actualizará la reserva',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservasService.actualizarReserva(this.reservaEditando).subscribe(
          (data) => {
            console.log('Reserva actualizada correctamente:', data);
            this.modoEditar = false;
            this.indiceEditando = -1; // Reseteamos el índice
            this.reservaEditando = {};
            this.buscarReservas(); // Recargamos los datos
          },
          (error) => {
            console.error('Error al actualizar la reserva:', error);
            Swal.fire('Error', 'Ha ocurrido un error al actualizar la reserva', 'error');
          }
        );
      }
    });
  }

  eliminarReserva(reserva: any) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservasService.eliminarReserva(reserva.id).subscribe(
          (data) => {
            console.log('Reserva eliminada correctamente:', data);
            // Volvemos a obtener la lista de reservas para refrescar la tabla
            this.buscarReservas();
          },
          (error) => {
            console.error('Error al eliminar la reserva:', error);
            Swal.fire('Error', 'No se pudo eliminar la reserva', 'error');
          }
        );
      }
    });
  }

  cancelarEdicion() {
    this.modoEditar = false;
    this.indiceEditando = -1; // Reseteamos el índice
    this.reservaEditando = {};
  }
}

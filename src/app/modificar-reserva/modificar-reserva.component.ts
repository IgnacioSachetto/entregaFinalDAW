import { Component, OnInit } from '@angular/core';
import { ReservasService } from '../service/reservas.service';

@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.css']
})
export class ModificarReservaComponent implements OnInit {
  reservas: any[] = [];
  filtroEspacio: string = '';
  filtroReservante: string = '';

  constructor(private reservasService: ReservasService) { }

  ngOnInit(): void {
    this.buscarReservas();
  }

  buscarReservas() {
    this.reservasService.getReservas().subscribe(
      (data) => {
        this.reservas = data;
      },
      (error) => {
        console.error('Error al buscar las reservas:', error);
      }
    );
  }

  editarReserva(reserva: any) {
    reserva.modoEditar = true;
    reserva.reservaEditando = { ...reserva };
  }

  guardarReserva(reserva: any) {
    this.reservasService.actualizarReserva(reserva).subscribe(
      (data) => {
        console.log('Reserva actualizada correctamente:', data);
        reserva.modoEditar = false;
        reserva.reservaEditando = {}; // Reiniciamos la reservaEditando
      },
      (error) => {
        console.error('Error al actualizar la reserva:', error);
      }
    );
  }

  eliminarReserva(reserva: any) {
    this.reservasService.eliminarReserva(reserva.id).subscribe(
      (data) => {
        console.log('Reserva eliminada correctamente:', data);
        // Volvemos a obtener la lista de reservas para refrescar la tabla
        this.buscarReservas();
      },
      (error) => {
        console.error('Error al eliminar la reserva:', error);
      }
    );
  }

  cancelarEdicion(reserva: any) {
    reserva.modoEditar = false;
    reserva.reservaEditando = {}; // Reiniciamos la reservaEditando
  }
}

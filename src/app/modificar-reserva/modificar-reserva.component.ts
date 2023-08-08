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

  modificarReserva(id: number) {
    const reserva = this.reservas.find(r => r.id === id);
    if (reserva) {
      // Implementa la lógica para modificar la reserva por su ID
      // Por ejemplo, podrías abrir un modal con los detalles de la reserva y permitir al usuario editarlos
      console.log('Modificando reserva:', reserva);
    }
  }

  eliminarReserva(id: number) {
    const reservaIndex = this.reservas.findIndex(r => r.id === id);
    if (reservaIndex !== -1) {
      // Implementa la lógica para eliminar la reserva por su ID
      this.reservasService.eliminarReserva(id).subscribe(
        () => {
          console.log('Reserva eliminada correctamente');
          // Elimina la reserva de la lista de reservas local
          this.reservas.splice(reservaIndex, 1);
        },
        (error) => {
          console.error('Error al eliminar la reserva:', error);
        }
      );
    }
  }
}

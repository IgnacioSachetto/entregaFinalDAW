import { Component, OnInit } from '@angular/core';
import { EspaciosService } from '../service/espacios.service';
import { ReservasService } from '../service/reservas.service';
import { ReservantesService } from '../service/reservantes.service';

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {
  espacios: any[] = [];
  reservantes: any[] = [];

  constructor(
    private espaciosService: EspaciosService,
    private reservantesService: ReservantesService,
    private reservasService: ReservasService
  ) { }

  ngOnInit(): void {
    this.cargarEspacios();
    this.cargarReservantes();
  }

  cargarEspacios() {
    this.espaciosService.getEspacios().subscribe(
      (data) => {
        this.espacios = data;
      },
      (error) => {
        console.error('Error al cargar los espacios:', error);
      }
    );
  }

  cargarReservantes() {
    this.reservantesService.getReservantes().subscribe(
      (data) => {
        this.reservantes = data;
      },
      (error) => {
        console.error('Error al cargar los reservantes:', error);
      }
    );
  }

  registrarReserva() {
    const fechaInicio = (document.getElementById('FechaInicio') as HTMLInputElement).value;
    const fechaFin = (document.getElementById('FechaFin') as HTMLInputElement).value;
    const motivo = (document.getElementById('motivo') as HTMLInputElement).value;
    const capacidadRequerida = parseInt((document.getElementById('capRequerida') as HTMLInputElement).value, 10);
    const espacioSeleccionado = (document.getElementById('Espacio') as HTMLSelectElement).value;
    const reservanteSeleccionado = (document.getElementById('Reservante') as HTMLSelectElement).value;

    const nuevaReserva = {
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      motivo: motivo,
      capacidadRequerida: capacidadRequerida,
      espacio: espacioSeleccionado,
      reservante: reservanteSeleccionado
    };

    this.reservasService.registrarReserva(nuevaReserva).subscribe(
      (data) => {
        console.log('Reserva registrada correctamente:', data);
      },
      (error) => {
        console.error('Error al registrar la reserva:', error);
      }
    );
  }
}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { EspaciosService } from '../service/espacios.service';
import { ReservantesService } from '../service/reservantes.service';
import { ReservasService } from '../service/reservas.service';

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent implements OnInit {
  espacios: any[] = [];
  reservantes: any[] = [];
  espacioSeleccionado: number;
  reservanteSeleccionado: number;
  fechaInicio: string;
  fechaFin: string;
  motivo: string;
  capacidadRequerida: number;

  constructor(
    private espaciosService: EspaciosService,
    private reservantesService: ReservantesService,
    private reservasService: ReservasService,
    private datePipe: DatePipe,
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
    const nuevaReserva = {
      fechaReserva: this.datePipe.transform(this.fechaInicio, 'yyyy-MM-ddTHH:mm:ss'),
      fechaAltaReserva: this.datePipe.transform(this.fechaInicio, 'yyyy-MM-ddTHH:mm:ss'),
      fechaFinReserva: this.datePipe.transform(this.fechaFin, 'yyyy-MM-ddTHH:mm:ss'),
      motivoReserva: this.motivo,
      capacidadRequerida: this.capacidadRequerida,
      espacioFisico: { id: this.espacioSeleccionado },
      reservante: { id: this.reservanteSeleccionado }
    };

    console.log(nuevaReserva);
    this.reservasService.registrarReserva(nuevaReserva).subscribe(
      (data) => {
        console.log('Reserva registrada correctamente:', data);
        Swal.fire('Éxito', 'Reserva registrada correctamente', 'success');
        this.resetearCampos();
      },
      (error) => {
        console.error('Error al registrar la reserva:', error);
        Swal.fire('Error', 'Error al registrar la reserva: Ya existe una reserva en ese horario', 'error');
      }
    );
  }

  // Método para restablecer los campos del formulario
  resetearCampos() {
    this.espacioSeleccionado = null;
    this.reservanteSeleccionado = null;
    this.fechaInicio = '';
    this.fechaFin = '';
    this.motivo = '';
    this.capacidadRequerida = null;
  }
}

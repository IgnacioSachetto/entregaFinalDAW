import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AlasService } from '../service/alas.service';
import { EspaciosService } from '../service/espacios.service';

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  styleUrls: ['./nuevo-espacio.component.css']
})
export class NuevoEspacioComponent implements OnInit {
  nombre: string;
  capacidad: number;
  alas: any[]; // Lista de opciones de ala desde el backend
  recursos: string[]; // Lista de opciones de recurso desde el backend
  alaSeleccionada: number;

  constructor(private espaciosService: EspaciosService, private alasService: AlasService) {}

  ngOnInit(): void {
    this.cargarAlas();
  }

  guardarEspacio() {
    const nuevoEspacio = {
      nombre: this.nombre,
      capacidad: this.capacidad,
      ala: { id: this.alaSeleccionada },
      recursos: this.recursos
    };

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se guardará el nuevo espacio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Guardar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Llama al método agregarUsuario() del servicio para guardar el nuevo usuario
        this.espaciosService.agregarEspacio(nuevoEspacio).subscribe(
          (data) => {
            // Mostrar mensaje de éxito
            Swal.fire({
              title: 'Espacio Guardado',
              text: 'El espacio se ha guardado correctamente',
              icon: 'success'
            });
            this.resetearCampos();
          },
          (error) => {
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al guardar el espacio',
              icon: 'error'
            });
          }
        );
      }
    });
  }

  cargarAlas() {
    this.alasService.obtenerAlas().subscribe(
      (data) => {
        this.alas = data;
      },
      (error) => {
        console.error('Error al cargar las opciones de ala:', error);
      }
    );
  }

  resetearCampos() {
    this.nombre = '';
    this.capacidad = null;
    this.alaSeleccionada = null;
    this.recursos = [];
  }
}

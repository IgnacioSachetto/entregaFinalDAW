import { Component } from '@angular/core';
import { AlasService } from '../service/alas.service';
import { EspaciosService } from '../service/espacios.service'; // Asumiendo que tienes un servicio llamado EspaciosService

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  styleUrls: ['./nuevo-espacio.component.css']
})
export class NuevoEspacioComponent {

  nombre: string;
  capacidad: number;
  ala: string;
  recurso: string;
  alas: any[]; // Lista de opciones de ala desde el backend
  recursos: string[]; // Lista de opciones de recurso desde el backend
  alaSeleccionada: number; // Puedes cambiar el tipo según el tipo de ID en tu modelo



  constructor(private espaciosService: EspaciosService, private alasService: AlasService) { }

  ngOnInit(): void {
    this.cargarAlas();
    /*this.cargarRecursos();*/
  }

  guardarEspacio() {
    const nuevoEspacio = {
      nombre: this.nombre,
      capacidad: this.capacidad,
      ala: { id: this.alaSeleccionada }, // Objeto JSON con el ID del ala
      recursos: this.recursos


    };

    console.log(nuevoEspacio);
    this.espaciosService.agregarEspacio(nuevoEspacio).subscribe(
      (data) => {

        console.log('Espacio guardado correctamente:', data);
      },
      (error) => {
        console.error('Error al guardar el espacio:', error);
      }
    );
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

  cargarRecursos() {
    // Llamar a tu servicio para cargar las opciones de recurso desde el backend
    this.espaciosService.obtenerRecursos().subscribe(
      (data) => {
        this.recursos = data;
      },
      (error) => {
        console.error('Error al cargar las opciones de recurso:', error);
      }
    );
  }
}

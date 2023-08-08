import { Component } from '@angular/core';
import { EspaciosService } from '../service/espacios.service'; // Asumiendo que tienes un servicio llamado EspaciosService

@Component({
  selector: 'app-nuevo-espacio',
  templateUrl: './nuevo-espacio.component.html',
  styleUrls: ['./nuevo-espacio.component.css']
})
export class NuevoEspacioComponent {

  nombre: string;
  capacidadMaxima: number;
  ala: string;
  recurso: string;
  alas: string[]; // Lista de opciones de ala desde el backend
  recursos: string[]; // Lista de opciones de recurso desde el backend

  constructor(private espaciosService: EspaciosService) { }

  ngOnInit(): void {
    this.cargarAlas();
    this.cargarRecursos();
  }

  guardarEspacio() {
    const nuevoEspacio = {
      nombre: this.nombre,
      capacidadMaxima: this.capacidadMaxima,
      ala: this.ala,
      recurso: this.recurso
    };

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
    // Llamar a tu servicio para cargar las opciones de ala desde el backend
    this.espaciosService.obtenerAlas().subscribe(
      (data) => {
        this.alas = data; // Asignar la respuesta del backend a la lista de alas
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
        this.recursos = data; // Asignar la respuesta del backend a la lista de recursos
      },
      (error) => {
        console.error('Error al cargar las opciones de recurso:', error);
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { EspaciosService } from '../service/espacios.service'; // Asegúrate de importar el servicio correcto

@Component({
  selector: 'app-modificar-espacio',
  templateUrl: './modificar-espacio.component.html',
  styleUrls: ['./modificar-espacio.component.css']
})
export class ModificarEspacioComponent implements OnInit {
  espacios: any[] = []; // Cambiar el tipo de dato si es diferente
  filtroAla: string = '';
  filtroCapacidad: number | string = ''; // Cambiar a tipo "number | string"

  constructor(private espaciosService: EspaciosService) { }

  ngOnInit(): void {
    this.buscarPorAla();
  }

  buscarPorAla() {
    this.espaciosService.getEspaciosByAla(this.filtroAla).subscribe(
      (data) => {
        this.espacios = data; // Asegúrate de que el servicio retorne los datos correctamente
      },
      (error) => {
        console.error('Error al cargar los espacios:', error);
      }
    );
  }

  buscarPorCapacidad() {
    this.espaciosService.getEspaciosByCapacidad(Number(this.filtroCapacidad)).subscribe(
      (data) => {
        this.espacios = data; // Asegúrate de que el servicio retorne los datos correctamente
      },
      (error) => {
        console.error('Error al cargar los espacios:', error);
      }
    );
  }

  modificarEspacio(id: number) {
    // Implementa la lógica para modificar el espacio por su ID
    console.log('Modificar espacio con ID:', id);
  }

  eliminarEspacio(id: number) {
    // Implementa la lógica para eliminar el espacio por su ID
    console.log('Eliminar espacio con ID:', id);
  }
}

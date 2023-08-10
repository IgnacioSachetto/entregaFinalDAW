import { Component, OnInit } from '@angular/core';
import { EspaciosService } from '../service/espacios.service';

@Component({
  selector: 'app-modificar-espacio',
  templateUrl: './modificar-espacio.component.html',
  styleUrls: ['./modificar-espacio.component.css']
})
export class ModificarEspacioComponent implements OnInit {
  espacios: any[] = []; // Change the data type if different
  filtroAla: string = '';
  filtroCapacidad: number | string = ''; // Change to type "number | string"

  constructor(private espaciosService: EspaciosService) { }

  ngOnInit(): void {
    this.buscarPorAla();
  }

  buscarPorAla() {
    this.espaciosService.getEspaciosByAla(this.filtroAla).subscribe(
      (data) => {
        this.espacios = data; // Make sure the service returns data correctly
      },
      (error) => {
        console.error('Error al cargar los espacios:', error);
      }
    );
  }

  buscarPorCapacidad() {
    this.espaciosService.getEspaciosByCapacidad(Number(this.filtroCapacidad)).subscribe(
      (data) => {
        this.espacios = data; // Make sure the service returns data correctly
      },
      (error) => {
        console.error('Error al cargar los espacios:', error);
      }
    );
  }

  editarEspacio(espacio: any) {
    espacio.modoEditar = true;
    espacio.espacioEditando = { ...espacio };
  }

  guardarEspacio(espacio: any) {
    this.espaciosService.actualizarEspacio(espacio).subscribe(
      (data) => {
        console.log('Espacio actualizado correctamente:', data);
        espacio.modoEditar = false;
        espacio.espacioEditando = {}; // Reiniciamos el espacioEditando
      },
      (error) => {
        console.error('Error al actualizar el espacio:', error);
      }
    );
  }

  eliminarEspacio(id: number) {
    this.espaciosService.eliminarEspacio(id).subscribe(
      (data) => {
        console.log('Espacio eliminado correctamente:', data);
        // Volvemos a obtener la lista de espacios para refrescar la tabla
        this.buscarPorAla();
      },
      (error) => {
        console.error('Error al eliminar el espacio:', error);
      }
    );
  }

  cancelarEdicionEspacio(espacio: any) {
    espacio.modoEditar = false;
    espacio.espacioEditando = {}; // Reiniciamos el espacioEditando
  }
}

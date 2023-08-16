import { Component, OnInit } from '@angular/core';
import { EspaciosService } from '../service/espacios.service';

@Component({
  selector: 'app-modificar-espacio',
  templateUrl: './modificar-espacio.component.html',
  styleUrls: ['./modificar-espacio.component.css']
})
export class ModificarEspacioComponent implements OnInit {
  espacios: any[] = [];
  filtroAla: string = '';
  filtroCapacidad: number | string = '';
  indiceEditandoEspacio: number = -1;
  modoEditar: boolean = false;
  espacioEditando: any = {};

  constructor(private espaciosService: EspaciosService) { }

  ngOnInit(): void {
    this.obtenerEspacios();
  }

  obtenerEspacios() {
    this.espaciosService.getEspacios().subscribe(
      (data) => {
        this.espacios = data;
      },
      (error) => {
        console.error('Error al obtener la lista de espacios:', error);
      }
    );
  }

  buscarPorAla() {
    const alaInput = (document.getElementById('filtroAla') as HTMLInputElement);
    const nombreAla = alaInput.value;

    if (nombreAla.trim() !== '') {
      this.espaciosService.getEspaciosByAla(nombreAla).subscribe(
        (data) => {
          this.espacios = data; // Actualiza la lista de espacios con los datos encontrados
          alaInput.value = '';
        },
        (error) => {
          console.error('Error al cargar los espacios por ala:', error);
        }
      );
    }
  }


  buscarPorCapacidad() {
    const capacidadInput = (document.getElementById('filtroCapacidad') as HTMLInputElement);
    const capacidad = capacidadInput.value;

    if (capacidad.trim() !== '') {
      this.espaciosService.getEspaciosByCapacidad(Number(capacidad)).subscribe(
        (data) => {
          this.espacios = data;
          capacidadInput.value = '';
        },
        (error) => {
          console.error('Error al cargar los espacios por capacidad:', error);
        }
      );
    }
  }


  editarEspacio(i: number) {
    this.modoEditar = true;
    this.indiceEditandoEspacio = i;
    this.espacioEditando = { ...this.espacios[i] };
  }

  guardarEspacio() {
    this.espaciosService.modificarEspacio(this.espacioEditando).subscribe(
      (data) => {
        console.log('Espacio actualizado correctamente:', data);
        this.modoEditar = false;
        this.indiceEditandoEspacio = -1;
        this.espacioEditando = {};
        this.obtenerEspacios();
      },
      (error) => {
        console.error('Error al actualizar el espacio:', error);
      }
    );
  }

  eliminarEspacio(espacio: any) {
    this.espaciosService.eliminarEspacio(espacio.id).subscribe(
      (data) => {
        console.log('Espacio eliminado correctamente:', data);
        const index = this.espacios.findIndex(e => e.id === espacio.id);
        if (index !== -1) {
          this.espacios.splice(index, 1);
        }
        this.modoEditar = false;
        this.espacioEditando = {};
        this.indiceEditandoEspacio = -1;
      },
      (error) => {
        console.error('Error al eliminar el espacio:', error);
      }
    );
  }

  cancelarEdicionEspacio() {
    this.modoEditar = false;
    this.espacioEditando = {};
    this.indiceEditandoEspacio = -1;
  }
}

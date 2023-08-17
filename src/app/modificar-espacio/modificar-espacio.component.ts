import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
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

  // Cargar la lista de espacios
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

  // Buscar espacios por ala
  buscarPorAla() {
    if (this.filtroAla.trim() !== '') {
      this.espaciosService.getEspaciosByAla(this.filtroAla).subscribe(
        (data) => {
          this.espacios = data;
          this.filtroAla = '';
        },
        (error) => {
          console.error('Error al cargar los espacios por ala:', error);
        }
      );
    }
  }

  // Buscar espacios por capacidad
  buscarPorCapacidad() {
    if (this.filtroCapacidad !== '') {
      this.espaciosService.getEspaciosByCapacidad(Number(this.filtroCapacidad)).subscribe(
        (data) => {
          this.espacios = data;
          this.filtroCapacidad = '';
        },
        (error) => {
          console.error('Error al cargar los espacios por capacidad:', error);
        }
      );
    }
  }

  // Editar un espacio
  editarEspacio(i: number) {
    this.modoEditar = true;
    this.indiceEditandoEspacio = i;
    this.espacioEditando = { ...this.espacios[i] };
  }

  // Guardar los cambios de un espacio editado
  guardarEspacio() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se actualizará el espacio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, Actualizar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
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
    });
  }
  // Eliminar un espacio
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

  // Cancelar la edición de un espacio
  cancelarEdicionEspacio() {
    this.modoEditar = false;
    this.espacioEditando = {};
    this.indiceEditandoEspacio = -1;
  }
}

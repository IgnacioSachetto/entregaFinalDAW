import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../service/usuarios.service';

@Component({
  selector: 'app-modificar-reservante',
  templateUrl: './modificar-reservante.component.html',
  styleUrls: ['./modificar-reservante.component.css']
})
export class ModificarReservanteComponent implements OnInit {
  usuarios: any[] = []; // Aquí almacenaremos los usuarios que obtengamos del backend
  modoEditar: boolean = false; // Variable para controlar si estamos en modo edición o no
  usuarioEditando: any = {}; // Aquí almacenaremos el usuario que estamos editando

  constructor(private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios:', error);
      }
    );
  }

  buscarPorLegajo() {
    const legajo = (document.getElementById('filtroLegajo') as HTMLInputElement).value;
    const legajoNumero = parseInt(legajo, 10); // Convertir legajo a número
    this.usuariosService.getUsuarioPorLegajo(legajoNumero).subscribe(
      (data) => {
        this.usuarios = [data];
      },
      (error) => {
        console.error('Error al obtener el usuario por legajo:', error);
      }
    );
  }

buscarPorDNI() {
  const dni = (document.getElementById('filtroDNI') as HTMLInputElement).value;
  this.usuariosService.getUsuarioPorDNI(parseInt(dni, 10)).subscribe(
    (data) => {
      this.usuarios = [data];
    },
    (error) => {
      console.error('Error al obtener el usuario por DNI:', error);
    }
  );
}


  editarUsuario(usuario: any) {
    this.modoEditar = true;
    // Hacemos una copia del usuario para no modificar el original hasta guardar los cambios
    this.usuarioEditando = { ...usuario };
  }

  guardarUsuario(usuario: any) {
    this.usuariosService.actualizarUsuario(usuario).subscribe(
      (data) => {
        console.log('Usuario actualizado correctamente:', data);
        this.modoEditar = false;
        this.usuarioEditando = {}; // Reiniciamos el usuarioEditando
      },
      (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    );
  }

  eliminarUsuario(usuario: any) {
    this.usuariosService.eliminarUsuario(usuario.id).subscribe(
      (data) => {
        console.log('Usuario eliminado correctamente:', data);
        // Volvemos a obtener la lista de usuarios para refrescar la tabla
        this.obtenerUsuarios();
      },
      (error) => {
        console.error('Error al eliminar el usuario:', error);
      }
    );
  }

  cancelarEdicion() {
    this.modoEditar = false;
    this.usuarioEditando = {}; // Reiniciamos el usuarioEditando
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    private urlBase: string = 'http://localhost:8080/Usuario'; // Cambiar por la URL del backend

    constructor(private http: HttpClient) { }

    // Obtener todos los usuarios
    getUsuarios(): Observable<any[]> {
        return this.http.get<any[]>(this.urlBase);
    }

    // Agregar un nuevo usuario
    agregarUsuario(usuario: any): Observable<any> {
        return this.http.post<any>(this.urlBase+"/guardar", usuario);
    }

    // Obtener un usuario por su id
    getUsuarioPorId(id: number): Observable<any> {
        return this.http.get<any>(`${this.urlBase}/${id}`);
    }

    // Obtener un usuario por su legajo
    getUsuarioPorLegajo(legajo: number): Observable<any> {
        return this.http.get<any>(`${this.urlBase}/${legajo}`);
    }

    // Obtener un usuario por su DNI
    getUsuarioPorDNI(dni: number): Observable<any> {
        return this.http.get<any>(`${this.urlBase}/${dni}`);
    }

    // Actualizar un usuario
    actualizarUsuario(usuario: any): Observable<any> {
        return this.http.put<any>(this.urlBase, usuario);
    }

    // Eliminar un usuario por su ID
    eliminarUsuario(id: number): Observable<any> {
        return this.http.delete<any>(`${this.urlBase}/${id}`);
    }

}

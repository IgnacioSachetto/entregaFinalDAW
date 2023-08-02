import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})
export class EspaciosService {
    private urlBase: string = 'http://localhost:8080/espacios'; // Cambiar por la URL del backend

    constructor(private http: HttpClient) { }

    // Obtener todos los espacios
    getEspacios(): Observable<any[]> {
        return this.http.get<any[]>(this.urlBase);
    }

    // Agregar un nuevo espacio
    agregarEspacio(espacio: any): Observable<any> {
        return this.http.post<any>(this.urlBase, espacio);
    }

    // Modificar un espacio existente
    modificarEspacio(espacio: any): Observable<any> {
        return this.http.put<any>(this.urlBase, espacio);
    }

    // Eliminar un espacio por ID
    eliminarEspacio(id: number): Observable<any> {
        return this.http.delete<any>(`${this.urlBase}/${id}`);
    }

    // Obtener espacios por ala
    getEspacioByAla(nombreAla: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.urlBase}/buscarPorAla?nombreAla=${nombreAla}`);
    }

    // Obtener espacios por capacidad
    getEspacioByCapacidad(capacidad: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.urlBase}/buscarPorCapacidad?capacidad=${capacidad}`);
    }
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class EspaciosService {
  private urlBase: string = 'http://localhost:5433/EspacioFisico';

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
  actualizarEspacio(espacio: any): Observable<any> {
    return this.http.put<any>(this.urlBase, espacio);
  }

  // Eliminar un espacio por ID
  eliminarEspacio(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/${id}`);
  }

  // Obtener espacios por ala
  getEspaciosByAla(nombreAla: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBase}/buscarPorAla?nombreAla=${nombreAla}`);
  }

  // Obtener espacios por capacidad
  getEspaciosByCapacidad(capacidad: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBase}/buscarPorCapacidad?capacidad=${capacidad}`);
  }

  // Obtener las opciones de ala desde el backend
  obtenerAlas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlBase}/alas`);
  }

  // Obtener las opciones de recurso desde el backend
  obtenerRecursos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlBase}/recursos`);
  }
}

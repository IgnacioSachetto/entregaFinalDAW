import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspaciosService {
  private urlBase: string = `${environment.apiBaseUrl}/EspacioFisico`;

  constructor(private http: HttpClient) { }

  // Obtener todos los espacios
  getEspacios(): Observable<any[]> {
    return this.http.get<any[]>(this.urlBase+"/searchAll");
  }

  // Agregar un nuevo espacio
  agregarEspacio(espacio: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/guardar`, espacio);
  }

  // Modificar un espacio existente
  modificarEspacio(espacio: any): Observable<any> {
    console.log(espacio.ala.id);
    return this.http.put<any>(this.urlBase+"/actualizar", espacio);
  }

  // Eliminar un espacio por ID
  eliminarEspacio(id: number): Observable<any> {
    const url = `${this.urlBase}/delete?id=${id}`;
    console.log('URL para eliminar:', url); // Agrega esta línea
    return this.http.delete<any>(url);
  }

  // Obtener espacios por ala
  getEspaciosByAla(nombreAla: string): Observable<any[]> {
    console.log(`${this.urlBase}/search?ala=${nombreAla}`)
    return this.http.get<any>(`${this.urlBase}/search?nombre=${nombreAla}`);
  }

  // Obtener espacios por capacidad
  getEspaciosByCapacidad(capacidad: number): Observable<any> {
    const url = `${this.urlBase}/search?capacidad=${capacidad}`;
    console.log('URL para eliminar:', url); // Agrega esta línea
    return this.http.get<any>(`${this.urlBase}/search?capacidad=${capacidad}`);
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

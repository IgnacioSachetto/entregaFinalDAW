import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservantesService {
  private urlBase: string = 'http://localhost:8080/Usuario'; // Cambiar por la URL del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los reservantes
  getReservantes(): Observable<any[]> {
    return this.http.get<any[]>(this.urlBase+"/searchAll");
  }

  // Agregar un nuevo reservante
  agregarReservante(reservante: any): Observable<any> {
    return this.http.post<any>(this.urlBase, reservante);
  }

  // Modificar un reservante existente
  modificarReservante(reservante: any): Observable<any> {
    return this.http.put<any>(this.urlBase+"/actualizar", reservante);
  }

  // Eliminar un reservante por ID
  eliminarUsuario(id: number): Observable<any> {
    const url = `${this.urlBase}/delete?id=${id}`;
    console.log('URL para eliminar:', url); // Agrega esta línea
    return this.http.delete<any>(url);
  }

  // Buscar un reservante por su legajo
  buscarReservantePorLegajo(legajo: string): Observable<any> {
    const url = `${this.urlBase}/search?legajo=${legajo}`;
    console.log('URL para eliminar:', url); // Agrega esta línea
    return this.http.get<any>(`${this.urlBase}/search?legajo=${legajo}`);
  }

  // Buscar un reservante por su DNI
  buscarReservantePorDni(dni: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/search?dni=${dni}`);
  }
}

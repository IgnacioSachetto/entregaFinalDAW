import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservantesService {
  private urlBase: string = 'http://localhost:8080/reservantes'; // Cambiar por la URL del backend

  constructor(private http: HttpClient) { }

  // Obtener todos los reservantes
  getReservantes(): Observable<any[]> {
    return this.http.get<any[]>(this.urlBase);
  }

  // Agregar un nuevo reservante
  agregarReservante(reservante: any): Observable<any> {
    return this.http.post<any>(this.urlBase, reservante);
  }

  // Modificar un reservante existente
  modificarReservante(reservante: any): Observable<any> {
    return this.http.put<any>(this.urlBase, reservante);
  }

  // Eliminar un reservante por ID
  eliminarReservante(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/${id}`);
  }

  // Buscar un reservante por su legajo
  buscarReservantePorLegajo(legajo: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/buscarPorLegajo?legajo=${legajo}`);
  }

  // Buscar un reservante por su DNI
  buscarReservantePorDni(dni: string): Observable<any> {
    return this.http.get<any>(`${this.urlBase}/buscarPorDni?dni=${dni}`);
  }
}

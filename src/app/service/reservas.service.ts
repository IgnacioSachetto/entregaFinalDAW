import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private urlBase: string = 'http://localhost:5433/Reserva'; // Cambiar por la URL del backend

  constructor(private http: HttpClient) { }

  // Obtener todas las reservas
  getReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.urlBase);
  }

  // Agregar una nueva reserva
  registrarReserva(reserva: any): Observable<any> {
    return this.http.post<any>(this.urlBase, reserva);
  }

  // Modificar una reserva existente
  actualizarReserva(reserva: any): Observable<any> {
    return this.http.put<any>(this.urlBase, reserva);
  }

  // Eliminar una reserva por ID
  eliminarReserva(id: number): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/${id}`);
  }

  // Obtener reservas por nombre de reservante
  getReservaByReservante(nombreReservante: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBase}/buscarPorReservante?nombreReservante=${nombreReservante}`);
  }

  // Obtener reservas por espacio
  getReservaByEspacio(nombreEspacio: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.urlBase}/buscarPorEspacio?nombreEspacio=${nombreEspacio}`);
  }
}

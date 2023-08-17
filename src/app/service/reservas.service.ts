import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private urlBase: string = 'http://localhost:8080/Reserva'; // Cambiar por la URL del backend

  constructor(private http: HttpClient) { }

  // Obtener todas las reservas
  getReservas(): Observable<any[]> {
    return this.http.get<any[]>(this.urlBase+"/searchAll");
  }

  // Agregar una nueva reserva
  registrarReserva(reserva: any): Observable<any> {
    return this.http.post<any>(`${this.urlBase}/guardar`, reserva);
  }

  // Modificar una reserva existente
  actualizarReserva(reserva: any): Observable<any> {
    return this.http.put<any>(this.urlBase+"/actualizar", reserva);
  }

  // Eliminar una reserva por ID
  eliminarReserva(id: number): Observable<any> {
    const url = `${this.urlBase}/delete?id=${id}`;
    return this.http.delete<any>(url);
  }
  getReservaByReservante(reservante: any): Observable<any[]> {
    const queryParams = {
      id: reservante.id,
      nombre: reservante.nombre,
      apellido: reservante.apellido,
      legajo: reservante.legajo,
      dni: reservante.dni,
      telefono: reservante.telefono,
      email: reservante.email
    };

    console.log(`${this.urlBase}/search?reservante=${JSON.stringify(queryParams)}`);
    return this.http.get<any[]>(`${this.urlBase}/search?reservante=${encodeURIComponent(JSON.stringify(queryParams))}`);
  }

  getReservaByEspacio(espacio: any): Observable<any[]> {
    console.log(`${this.urlBase}/search?espacio=${JSON.stringify(espacio)}`);
    return this.http.get<any[]>(`${this.urlBase}/search?espacio=${encodeURIComponent(JSON.stringify(espacio))}`);
  }

}

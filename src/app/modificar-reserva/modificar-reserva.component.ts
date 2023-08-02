import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-modificar-reserva',
  templateUrl: './modificar-reserva.component.html',
  styleUrls: ['./modificar-reserva.component.css']
})
export class ModificarReservaComponent /*implements OnInit*/ {

  /*reservas: any[] = []; // Cambia 'any' por el tipo de dato correcto para las reservas

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Hacer la llamada HTTP para obtener la lista de reservas
    this.obtenerReservas();
  }

  obtenerReservas() {
    this.http.get<any[]>('localhost:4000/reservas').subscribe(
      (data) => {
        this.reservas = data;
      },
      (error) => {
        console.error('Error al obtener la lista de reservas:', error);
      }
    );
  }*/
}
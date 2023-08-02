import { Component } from '@angular/core';

import { OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-nueva-reserva',
  templateUrl: './nueva-reserva.component.html',
  styleUrls: ['./nueva-reserva.component.css']
})
export class NuevaReservaComponent /*implements OnInit*/ {


 /*  espacios: string[] = [];
  reservantes: string[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.obtenerEspacios();
    this.obtenerReservantes();
  }

  obtenerEspacios() {
    this.http.get<string[]>('localhost/espacios/ (GET ALL) ').subscribe(
      (data) => {
        this.espacios = data;
      },
      (error) => {
        console.error('Error al obtener la lista de espacios:', error);
      }
    );
  }

  obtenerReservantes() {
    this.http.get<string[]>('localhost/reservantes/ (GET ALL)').subscribe(
      (data) => {
        this.reservantes = data;
      },
      (error) => {
        console.error('Error al obtener la lista de reservantes:', error);
      }
    );
  }*/
}
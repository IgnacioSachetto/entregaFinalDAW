import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AlasService {
  private urlBase: string = 'http://localhost:8080/Ala';

  constructor(private http: HttpClient) { }

  obtenerAlas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlBase}/searchAll`);
  }

}

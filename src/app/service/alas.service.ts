import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlasService {
  private urlBase: string = `${environment.apiBaseUrl}/Ala`;

  constructor(private http: HttpClient) { }

  obtenerAlas(): Observable<string[]> {
    return this.http.get<string[]>(`${this.urlBase}/searchAll`);
  }

}

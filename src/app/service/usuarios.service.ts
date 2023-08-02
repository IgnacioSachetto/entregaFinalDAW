import  { HttpClient } from '@angular/common/http';
import  { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UsuariosService {
    private urlAPI: string = 'http://reqres.in/api';

    constructor(private http: HttpClient) { }

    getDatos(){
        return this.http.get(this.urlAPI + '/users');
    }
}
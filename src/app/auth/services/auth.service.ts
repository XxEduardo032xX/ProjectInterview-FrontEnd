import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private seguridadUrl = 'http://localhost:3002/api/token';
  private clientesUrl = 'http://localhost:3001/api/clientes';

  constructor(private http: HttpClient) { }

  //* Obtener token de seguridad
  generarToken(): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.seguridadUrl, {});
  }

  //* Enviar datos del cliente al backend
  registrarCliente(data: any): Observable<any> {
    return this.http.post<any>(this.clientesUrl, data);
  }
  

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from '../../../Environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrlGetTokenSecurity = environments.getTokenSecurity;
  private baseUrlRegisterClient = environments.registerClient;
  private baseUrlSaveToken = environments.registerClient;
  private baseUrlGeValidateToken = environments.validateToken;

  constructor(private http: HttpClient) { }


  generateTokenOnly(): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.baseUrlGetTokenSecurity}`, {});
  }

  saveToken(token: string): Observable<any> {
    return this.http.post(`${this.baseUrlSaveToken}`, { token });
  }

  registerClient(clienteData: any) {
    const url = this.baseUrlRegisterClient;
    return this.http.post<{ mensaje: string; id: number }>(`${url}`, clienteData);
  }


  validateToken(token: string) {
    const url = this.baseUrlGeValidateToken;
    return this.http.post<{ valido: boolean }>(`${url}`, { token });
  }
  
  // generateToken() {
  //     const url = this.baseUrlGetTokenSecurity;
  //     return this.http.post<{ token: string }>(`${url}`, {});
  // }

}

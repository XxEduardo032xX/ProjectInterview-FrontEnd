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
  private baseUrlGeValidateToken = environments.validateToken;

  constructor(private http: HttpClient) { }

  generateToken() {
    const url = this.baseUrlGetTokenSecurity;
    return this.http.post<{ token: string }>(`${url}`, {});
  }

  registerClient(clienteData: any) {
    const url = this.baseUrlRegisterClient;
    return this.http.post<{ mensaje: string; id: number }>(`${url}`, clienteData);
  }


  //*Opcional - Para pruebas
  validateToken(token: string) {
    const url = this.baseUrlGeValidateToken;
    return this.http.post<{ valido: boolean }>(`${url}`, { token });
  }

  


}

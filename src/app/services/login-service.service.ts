import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private loginUrl = "http://localhost:5000/auth/login";
  private registerUrl = "http://localhost:5000/auth/register";
  private userUrl = "http://localhost:5000/auth/user";
  
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(this.loginUrl, body, { headers })
      .pipe(
        tap(response => {
          if (response && response.authentication_token) {
            localStorage.setItem('authToken', response.authentication_token);
            localStorage.setItem('refreshToken', response.refresh_token);
          }
        })
      );
  }

  findUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.userUrl}/${userId}`);
  }

  register(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { username, password };

    return this.http.post<any>(this.registerUrl, body, { headers });
  }

  changePassword(userId: string, currentPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`http://localhost:5000/auth/change-password/${userId}`, {
      currentPassword,
      newPassword
    });
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }
}

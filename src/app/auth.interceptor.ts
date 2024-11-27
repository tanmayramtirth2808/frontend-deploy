import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError, switchMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshingToken: boolean = false;
  private refreshTokenSubject: any = null;
  private refreshTokenUrl = 'http://localhost:5000/refresh-token';

  constructor(private http: HttpClient) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authReq = this.addToken(request);

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && !request.url.includes('/refresh-token')) {
          return this.handle401Error(request, next);
        } else {
          return throwError(() => new Error('Something went wrong; please try again later.'));
        }
      })
    );
  }

  private addToken(request: HttpRequest<unknown>): HttpRequest<unknown> {
    const token = localStorage.getItem('authToken');
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token || ''}`
      }
    });
  }

  private handle401Error(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.refreshingToken) {
      return this.refreshTokenSubject.pipe(
        switchMap(() => next.handle(this.addToken(request)))
      );
    } else {
      this.refreshingToken = true;
      this.refreshTokenSubject = new Observable(observer => {
        const token = localStorage.getItem('authToken');
        this.http.post<{ newToken: string }>(this.refreshTokenUrl, { token }).subscribe({
          next: (response) => {
            localStorage.setItem('authToken', response.newToken);
            this.refreshingToken = false;
            this.refreshTokenSubject = null;
            observer.next();
            observer.complete();
          },
          error: (error) => {
            console.error('Error refreshing token:', error);
            this.refreshingToken = false;
            this.refreshTokenSubject = null;
            observer.error(error);
          }
        });
      });

      return this.refreshTokenSubject.pipe(
        switchMap(() => next.handle(this.addToken(request)))
      );
    }
  }
}

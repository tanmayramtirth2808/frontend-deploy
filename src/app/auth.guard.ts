import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      const userRole = decodedToken.role;

      if (route.data['roles'] && route.data['roles'].indexOf(userRole) === -1) {
        
          Swal.fire({
            icon: 'warning',
            title: 'Unauthorized',
            text: 'You are not authorized to view this URL',
          }).then(() => {
            if (userRole === 'admin') {
              this.router.navigate(['/books']);
            } else if (userRole === 'user') {
              this.router.navigate(['/reviews']);
            } else {
              this.router.navigate(['/login']);
            }
          });
      
        return false;
      }      
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}

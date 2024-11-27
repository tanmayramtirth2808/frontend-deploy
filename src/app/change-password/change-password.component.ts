import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import { jwtDecode } from 'jwt-decode'; 
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private loginService: LoginServiceService, private router: Router, private titleService: Title) { }
  
  ngOnInit(): void {
    this.titleService.setTitle('Change Password');
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      Swal.fire('Error', 'New passwords do not match', 'error');
      return;
    }

    const userId = this.getUserIdFromToken();

    if (userId) {
      this.loginService.changePassword(userId, this.currentPassword, this.newPassword)
        .subscribe({
          next: () => { 
            Swal.fire('Success', 'Password changed successfully', 'success').then(() => {
              this.router.navigate(['/']);
            });
          },
          error: (error) => {
            Swal.fire('Error', 'Error changing password', 'error');
            console.error('Error:', error);
          }
        });
    } else {
      Swal.fire('Error', 'Unable to retrieve user ID', 'error');
    }
  }  

  getUserIdFromToken(): string | null {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        return decodedToken.userId || null;
      } catch (e) {
        console.error('Error decoding token:', e);
        return null;
      }
    }
    return null;
  }
}

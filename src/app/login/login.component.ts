import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  showPassword: boolean = false;

  errorMessage: string | null = null;

  constructor(private titleService: Title, private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login');
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLogin(): void {
    if (this.username && this.password) {
      this.loginService.login(this.username, this.password).subscribe({
        next: response => {
          console.log("Login Successful", response);
          const userRole = response.role;

          if(userRole === 'admin') {
            this.router.navigate(['/books']);
          } else if(userRole === 'user') {
            this.router.navigate(['/reviews']);
          }
          this.errorMessage = null;
        },
        error: error => {
          console.log('Login failed', error);
          this.errorMessage = 'Invalid username or password';
        },
        complete: () => {
          console.log('Login request completed');
        }
      });
    } else {
      console.log('Username and password are required');
    }
  }
}

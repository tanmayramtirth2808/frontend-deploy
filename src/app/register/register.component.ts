import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginServiceService } from '../services/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string | null = null;

  constructor(private titleService: Title, private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
    this.titleService.setTitle('Create Account');
  }

  doRegister(): void {
    if (this.password === this.confirmPassword) {
      this.loginService.register(this.username, this.password).subscribe({
        next: response => {
          this.router.navigate(['/login']);
          this.errorMessage = null;
          console.log('Registration successful', response);
        },
        error: error => {
           this.errorMessage = 'Registration failed. Please try again.';
          console.log('Registration failed', error);
        }
      });
    } else {
      this.errorMessage = 'Passwords do not match'; 
    }
  }
  

}

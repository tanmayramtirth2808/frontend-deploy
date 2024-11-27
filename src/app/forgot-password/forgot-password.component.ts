import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  username: string = '';
  showAlert: boolean = false;

  constructor(private router: Router, private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('Forgot Password');
  }

  onSubmit(): void {
    this.showAlert = true;
  }

  redirectToLogin(): void {
    this.showAlert = false;
    this.router.navigate(['/login']);
  }

}

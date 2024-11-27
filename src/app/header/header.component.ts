import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userImage: string | null = null;
  defaultImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAAg8HAABAAAB6ElEQVR42mJ0rX3f4wAEU4PrjGDfoFvgC5PFO4fXAEMRmIQSK4FIAkzRzQIlQh6T7L7GEyoI6VGF4TkF4T3hHb8s4hJomSDtPNTogF/oARyPU0QlYmUBm2+K7TPDAvoAKZ4APQgJUmFA0YFskCW0pXAaY6P4C9ZyBwNg4kDg3A2BbcH0FXyEZTxIuDQPSdFSXt7oS7AfiLBCYofHz9H4QW+JEAiTQQJwoZ6DLBkMQWuBR5Ql8qQlwKXq8iHRgA4BIQy8A1KlKAF5FJIVmEBs8qEQfIAu6EO2GUuJoZ1L7iPIjATkFJOJ8lJcA5TMIpmRZkXZrJPB7mMGj9QDhH9ysTs1PaK1j/gK5B/JgCd/9F1r9AGJcM4rhtOksAAAAAElFTkSuQmCC';

  constructor(private loginService: LoginServiceService, private router: Router) {}
  
  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.userId;
        
        if (userId) {
          this.loginService.findUser(userId).subscribe(user => {
            if (user.data && user.data.image) {
              this.userImage = `data:image/jpeg;base64,${user.data.image}`;
            } else {
              this.userImage = null;
            }
          });
        }

      } catch (e) {
        console.error('Error decoding token:', e);
      }
    }
  }
  
  updateProfilePicture(): void {
    this.router.navigate(['/update-profile-picture']);
  }

  changePassword(): void {
    this.router.navigate(['/change-password']);
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/']);
  }
}

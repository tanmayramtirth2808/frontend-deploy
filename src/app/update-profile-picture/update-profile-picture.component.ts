import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { jwtDecode } from 'jwt-decode';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-profile-picture',
  templateUrl: './update-profile-picture.component.html',
  styleUrls: ['./update-profile-picture.component.css']
})
export class UpdateProfilePictureComponent implements OnInit{

  selectedFile: File | null = null;

  constructor(private http: HttpClient, private titleService: Title) { }
  
  ngOnInit(): void {
    this.titleService.setTitle('Update Profile Picture');
  }

  

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);


      const token = localStorage.getItem('authToken');
      let userId = '';

      if (token) {
        const decodedToken: any = jwtDecode(token);
        userId = decodedToken.userId; 
      }

      const url = `http://localhost:5000/auth/upload-image/${userId}`;

      this.http.post(url, formData)
        .subscribe({
          next: (response) => {
            console.log('Profile picture updated successfully', response);
          },
          error: (error) => {
            console.error('Error updating profile picture', error);
          }
        });
    }
  }
}

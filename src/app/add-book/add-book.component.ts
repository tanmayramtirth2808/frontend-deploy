import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookServiceService } from '../services/book-service.service';
import { Title } from '@angular/platform-browser';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: { title: string; description: string; image?: File } = { title: '', description: '' };
  imageUrl: string | ArrayBuffer | null = '';
  zoomLevel: number = 1;

  constructor(private bookService: BookServiceService, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Add New Book');
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.book.image = file;

      const reader = new FileReader();
      reader.onload = e => this.imageUrl = reader.result;
      reader.readAsDataURL(file);
    }
  }

  openModal(): void {
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal')!);
    imageModal.show();
  }

  zoomIn(): void {
    this.zoomLevel += 0.1;
    const zoomedImage = document.getElementById('zoomedImage')!;
    zoomedImage.style.transform = `scale(${this.zoomLevel})`;
  }

  zoomOut(): void {
    if (this.zoomLevel > 1) {
      this.zoomLevel -= 0.1;
      const zoomedImage = document.getElementById('zoomedImage')!;
      zoomedImage.style.transform = `scale(${this.zoomLevel})`;
    }
  }

  onSubmit(): void {
    if (this.book.title && this.book.description && this.book.image) {
      this.bookService.addBook({
        title: this.book.title,
        description: this.book.description,
        image: this.book.image
      }).subscribe({
        next: response => {
          console.log('Book added successfully:', response);
          this.router.navigate(['/books']);
        },
        error: error => {
          console.error('Error adding book:', error);
        }
      });
    } else {
      console.error('Please fill out all fields and select an image.');
    }
  }

  goBack(): void {
    this.router.navigate(['/books']);
  }
}

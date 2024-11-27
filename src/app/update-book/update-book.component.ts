import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookServiceService } from '../services/book-service.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css'],
})
export class UpdateBookComponent implements OnInit {
  bookId!: string;
  title: string = '';
  description: string = '';
  image: File | null = null;
  imageUrl: string | ArrayBuffer | null = '';
  zoomLevel: number = 1;

  constructor(
    private route: ActivatedRoute,
    private bookService: BookServiceService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.bookId = this.route.snapshot.paramMap.get('id')!;
    this.titleService.setTitle('Update Book');
    this.loadBook();
  }

  loadBook(): void {
    this.bookService.getOneBook(this.bookId).subscribe({
      next: (book) => {
        this.title = book.title;
        this.description = book.description;
        this.imageUrl = `http://localhost:5000/${book.imagePath}`;
      },
      error: (error) => {
        console.error('Error fetching book details:', error);
      },
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    this.image = file || null;

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => (this.imageUrl = reader.result as string | ArrayBuffer);
      reader.readAsDataURL(file);
    }
  }

  openImageModal(): void {
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
    if (!this.title || !this.description) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'Please fill in all fields.',
      });
      return;
    }

    const bookData = {
      title: this.title,
      description: this.description,
      image: this.image,
    };

    this.bookService.updateBook(this.bookId, bookData).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Book updated successfully',
        }).then(() => {
          this.router.navigate(['/books']);
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error in updating the book',
        });
      },
    });
  }
}

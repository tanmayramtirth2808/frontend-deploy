import { Component } from '@angular/core';
import { BookServiceService } from '../services/book-service.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {

  books: { _id: string; title: string; description: string; imagePath: string; imageUrl?: string }[] = [];

  page: number = 1;
  
  constructor(
    private bookService: BookServiceService, 
    private router: Router,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Book List');
    this.loadBooks();
  }

  loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: response => {
        console.log('API response:', response.data); 
        this.books = response.data;
      },
      error: error => {
        console.error('Error fetching books:', error);
      },
      complete: () => {
        console.log('Books fetch complete');
      }
    });
  }

  viewReviews(book: { _id: string }) {
    this.router.navigate(['/view-reviews', book._id]);
  }

  addReview(book: { _id: string }) {
    this.router.navigate(['/add-review', book._id]);
  }
}

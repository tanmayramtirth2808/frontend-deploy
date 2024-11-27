import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../services/book-service.service';
import { ReviewServiceService } from '../services/review-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginServiceService } from '../services/login-service.service';
import { jwtDecode } from 'jwt-decode';  
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.css']
})
export class ViewReviewsComponent implements OnInit {

  book: { _id: string; title: string; description: string; imagePath: string } | undefined;
  reviews: any[] = [];
  currentUsername: string | null = null;  
  hasUserReviewed: boolean = false; 

  constructor(
    private bookService: BookServiceService,
    private reviewService: ReviewServiceService,
    private loginService: LoginServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.currentUsername = decodedToken.username;
    }

    this.route.paramMap.subscribe(params => {
      const bookId = params.get('id');
      if (bookId) {
        this.fetchBookDetails(bookId);
        this.fetchReviews(bookId);
      }
    });

    this.titleService.setTitle('Book Reviews');
  }

  fetchBookDetails(bookId: string): void {
    this.bookService.getOneBook(bookId).subscribe({
      next: response => {
        this.book = {
          ...response,
          imagePath: `http://localhost:5000/${response.imagePath}`
        };
      },
      error: error => {
        console.error('Error fetching book:', error);
      }
    });
  }

  fetchReviews(bookId: string): void {
    this.reviewService.getReviewByBookId(bookId).subscribe({
      next: response => {
        if (response.data) {
          this.reviews = Array.isArray(response.data) ? response.data : [response.data];
          this.reviews.forEach(review => {
            this.loginService.findUser(review.userId).subscribe({
              next: userResponse => {
                review.username = userResponse.data.username;
                if (this.currentUsername === review.username) {
                  this.hasUserReviewed = true; 
                }
              },
              error: error => {
                console.error('Error fetching user:', error);
              }
            });
          });
        }
      },
      error: error => {
        console.error('Error fetching reviews:', error);
      }
    });
  }

  addReview(): void {
    if (this.book && !this.hasUserReviewed) {  
      this.router.navigate([`/add-review`, this.book._id]);
    }
  }

  editReview(reviewId: string): void {
    this.router.navigate([`/update-review`, reviewId], { queryParams: { bookId: this.book?._id } });
  }

  deleteReview(reviewId: string): void {
    this.reviewService.deleteReview(reviewId).subscribe({
      next: response => {
        console.log('Review deleted:', response);
        this.reviews = this.reviews.filter(review => review._id !== reviewId);
        this.hasUserReviewed = false;  
      },
      error: error => {
        console.error('Error deleting review:', error);
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/reviews']);
  }

  isUserReview(review: any): boolean {
    return this.currentUsername == review.username;
  }
}

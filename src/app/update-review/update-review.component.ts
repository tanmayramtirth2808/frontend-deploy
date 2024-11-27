import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewServiceService } from '../services/review-service.service';
import { jwtDecode } from 'jwt-decode';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-update-review',
  templateUrl: './update-review.component.html',
  styleUrls: ['./update-review.component.css']
})
export class UpdateReviewComponent implements OnInit {
  content: string = '';
  reviewId: string | null = null;
  bookId: string | null = null;
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewServiceService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.reviewId = params.get('id');
      this.bookId = this.route.snapshot.queryParamMap.get('bookId'); 
    });

    this.extractUserIdFromToken();

    if (this.reviewId) {
      this.reviewService.getReviewById(this.reviewId).subscribe({
        next: response => {
          this.content = response.content;
        },
        error: error => {
          console.error('Error loading review:', error);
        }
      });
    }

    this.titleService.setTitle('Update Review');
  }

  extractUserIdFromToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.userId;
    }
  }

  updateReview(): void {
    if (this.reviewId && this.content && this.userId) {
      this.reviewService.updateReview(this.reviewId, this.content, this.userId).subscribe({
        next: response => {
          console.log('Review updated:', response);
          this.goBack();
        },
        error: error => {
          console.error('Error updating review:', error);
        }
      });
    }
  }

  goBack(): void {
    if (this.bookId) {
      this.router.navigate(['/view-reviews', this.bookId]); 
    } else {
      this.router.navigate(['/reviews']);
    }
  }
}

import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewServiceService } from '../services/review-service.service';
import { jwtDecode } from 'jwt-decode';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent {
  content: string = '';
  bookId: string | null = null;
  userId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private reviewService: ReviewServiceService,
    private titleService: Title
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.bookId = params.get('id');

      this.titleService.setTitle('Add Review');
    });

    this.extractUserIdFromToken();
  }

  extractUserIdFromToken(): void {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken.userId;
    }
  }

  submitReview(): void {
    if (this.bookId && this.content && this.userId) {
      this.reviewService.createReview(this.bookId, this.content, this.userId).subscribe({
        next: response => {
          console.log('Review created:', response);
          this.goBack();
        },
        error: error => {
          console.error('Error creating review:', error);
        }
      });
    }
  }

  goBack(): void {
    if (this.bookId) {
      this.router.navigate([`/view-reviews`, this.bookId]);
    } else {
      this.router.navigate(['/reviews']);
    }
  }
}

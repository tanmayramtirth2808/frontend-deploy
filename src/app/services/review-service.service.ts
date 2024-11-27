import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewServiceService {

  findReviewUrl = "http://localhost:5000/reviews/book";

  reviewsUrl = "http://localhost:5000/reviews";

  constructor(private http: HttpClient) { }

  getReviewByBookId(bookId: string): Observable<any>
  {
    return this.http.get(`${this.findReviewUrl}/${bookId}`);

  }

  getReviewById(reviewId: string): Observable<any> {
    return this.http.get(`${this.reviewsUrl}/${reviewId}`);
  }  

  createReview(bookId: string, content: string, userId: string): Observable<any> {
    const body = { bookId, content, userId };
    return this.http.post(`${this.reviewsUrl}`, body);
  }


  updateReview(reviewId: string, content: string, userId: string): Observable<any>
  {
    return this.http.put(`${this.reviewsUrl}/${reviewId}`, { content });
  }

  deleteReview(reviewId: string): Observable<any>
  {
    return this.http.delete(`${this.reviewsUrl}/${reviewId}`);
  }
}

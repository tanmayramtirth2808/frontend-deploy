import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../services/book-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {
  book: { _id: string; title: string; description: string; imagePath: string } | undefined;
  
  constructor(private bookService: BookServiceService, private route: ActivatedRoute, private router: Router, private titleService: Title) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const bookId = params.get('id');
      if (bookId) {
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
    });

    this.titleService.setTitle('Book Details');
  }

  goBack(): void {
    this.router.navigate(['/books']);
  }
}

import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../services/book-service.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: { _id: string; title: string; description: string; imagePath: string; imageUrl?: string; selected?: boolean }[] = [];
  searchTerm: string = '';
  noResults: boolean = false;
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

  searchBooks(): void {
    if (this.searchTerm.trim() === '') {
      this.loadBooks();
      return;
    }
  
    this.bookService.getBookByTitle(this.searchTerm).subscribe({
      next: books => {
        this.books = books;
        this.noResults = books.length === 0;
      },
      error: error => {
        console.error('Error searching books:', error);
      }
    });
  }

  addBook() {
    this.router.navigate(['/add-book']);
  }

  addBookByFromControl()
  {
    this.router.navigate(['/new-add-book']);
  }

  viewBook(book: { _id: string }) {
    this.router.navigate(['/view-book', book._id]);
  }

  editBook(book: { _id: string }) {
    this.router.navigate(['/update-book', book._id]);
  }

  deleteBook(bookId: string) {
    console.log('Deleting book with id:', bookId);
    this.bookService.deleteBook(bookId).subscribe({
      next: () => {
        console.log('Book deleted successfully');
        this.loadBooks();
      },
      error: error => {
        console.error('Error deleting book:', error);
      }
    });
  }

  deleteSelectedBooks(): void {
    const selectedBooks = this.books.filter(book => book.selected);

    if (selectedBooks.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No books selected for deletion.'
      }).then(()=> {
        return;
      })
    }

    if (confirm(`Are you sure you want to delete ${selectedBooks.length} book(s)?`)) {
      selectedBooks.forEach(book => {
        this.bookService.deleteBook(book._id).subscribe({
          next: () => {
            console.log(`Book with id ${book._id} deleted successfully`);
            this.loadBooks(); 
          },
          error: error => {
            console.error(`Error deleting book with id ${book._id}:`, error);
          }
        });
      });
    }
  }

  toogleSelectAll(event: any): void {
    const isChecked = event.target.checked;
    this.books.forEach(book => (book.selected = isChecked));
  }

  isAllSelected(): boolean {
    return this.books.length > 0 && this.books.every(book => book.selected);
  }

  get selectedBooks(): { _id: string; title: string; description: string; imagePath: string; imageUrl?: string; selected?: boolean }[] {
    return this.books.filter(book => book.selected);
  }

  viewChart(): void
  {
      this.router.navigate(['/charts']);
  }

  viewGraph2(): void
  {
      this.router.navigate(['/graph']);
  }
}

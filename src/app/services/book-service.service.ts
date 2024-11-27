import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  booksUrl = "http://localhost:5000/books";

  constructor(private http: HttpClient) { }

  getBooks(): Observable<{ data: { _id: string; title: string; description: string; imagePath: string; imageUrl?: string }[] }> {
    return this.http.get<{ data: { _id: string; title: string; description: string; imagePath: string; imageUrl?: string }[] }>(this.booksUrl).pipe(
      map(response => {
        return {
          ...response,
          data: response.data.map(book => {
            book.imageUrl = `http://localhost:5000/${book.imagePath}`;
            return book;
          })
        };
      })
    );
  }
  
  getOneBook(bookId: string): Observable<{ description: string; imagePath: string; title: string; _id: string }> {
    return this.http.get<{ data: { description: string; imagePath: string; title: string; _id: string } }>(`${this.booksUrl}/${bookId}`).pipe(
      map(response => response.data) 
    );
  }  

  addBook(bookData: { title: string; description: string; image: File}): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('title', bookData.title);
    formData.append('description', bookData.description);
    formData.append('image', bookData.image);

    return this.http.post<any>(this.booksUrl, formData);
  }

  updateBook(bookId: string, bookData: { title?: string; description?: string; image?: File | null }): Observable<any> {
    const formData: FormData = new FormData();

    if (bookData.title) {
      formData.append('title', bookData.title);
    }
    if (bookData.description) {
      formData.append('description', bookData.description);
    }
    if (bookData.image) {
      formData.append('image', bookData.image);
    }

    return this.http.put<any>(`${this.booksUrl}/${bookId}`, formData);
  }


  deleteBook(bookId: string): Observable<void> {
    return this.http.delete<void>(`${this.booksUrl}/${bookId}`);
  }

  getBookByTitle(title: string): Observable<{ _id: string; title: string; description: string; imagePath: string; imageUrl?: string }[]> {
    return this.http.get<{ data: { _id: string; title: string; description: string; imagePath: string }[] }>(`${this.booksUrl}/title/${title}`).pipe(
      map(response => response.data.map(book => ({
        ...book,
        imageUrl: `http://localhost:5000/${book.imagePath}`
      }))),
      catchError(error => {
        console.error('Error fetching books by title:', error);
        return of([]);
      })
    );
  }
  
  

}

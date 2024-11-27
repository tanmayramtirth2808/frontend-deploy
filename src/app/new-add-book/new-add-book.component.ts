import { Component, OnInit } from '@angular/core';
import { BookServiceService } from '../services/book-service.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import * as bootstrap from 'bootstrap';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-new-add-book',
  templateUrl: './new-add-book.component.html',
  styleUrls: ['./new-add-book.component.css']
})
export class NewAddBookComponent implements OnInit {
  bookForm: FormGroup;
  imageUrls: (string | ArrayBuffer | null)[] = [];
  zoomLevels: number[] = [];

  constructor(
    private fb: FormBuilder,
    private bookService: BookServiceService,
    private router: Router,
    private titleService: Title
  ) {
    this.bookForm = this.fb.group({
      books: this.fb.array([])
    });
    this.addBook();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Add New Book');
  }

  get books(): FormArray
  {
    return this.bookForm.get('books') as FormArray;
  }
  
  addBook(): void 
  {
    const bookGroup = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: [null, Validators.required]
    });
    this.books.push(bookGroup);
    this.imageUrls.push('');
    this.zoomLevels.push(1);
  }

  removeBook(index: number): void {
    if(this.books.length > 1 )
    {
      this.books.removeAt(index);
      this.imageUrls.splice(index, 1);
      this.zoomLevels.splice(index, 1);
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Error in Performing Operation',
        text: 'You should have at least one book form.',
        confirmButtonText: 'Ok'
      })
    }
  }

  onFileChange(event: any, index: number): void {
    const file = event.target.files[0];
    if (file) {
      this.books.at(index).patchValue({
        image: file
      });
      this.books.at(index).get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = e => this.imageUrls[index] = reader.result;
      reader.readAsDataURL(file);
    }
  }

  openModal(index: number): void {
    const imageModal = new bootstrap.Modal(document.getElementById('imageModal')!);
    imageModal.show();
  }

  zoomIn(index: number): void {
    this.zoomLevels[index] += 0.1;
    const zoomedImage = document.getElementById('zoomedImage')!;
    zoomedImage.style.transform = `scale(${this.zoomLevels[index]})`;
  }

  zoomOut(index: number): void {
    if (this.zoomLevels[index] > 1) {
      this.zoomLevels[index] -= 0.1;
      const zoomedImage = document.getElementById(`zoomedImage${index}`)!;
      zoomedImage.style.transform = `scale(${this.zoomLevels[index]})`;
    }
  }

  onSubmit(): void {
    if (this.bookForm.valid) {
      this.books.controls.forEach((bookGroup, index) => {
        const bookData = {
          title: bookGroup.get('title')?.value,
          description: bookGroup.get('description')?.value,
          image: bookGroup.get('image')?.value
        };
  
        this.bookService.addBook(bookData).subscribe({
          next: response => {
            console.log('Book added successfully:', response);
            if (index === this.books.controls.length - 1) {
              this.router.navigate(['/books']); 
            }
          },
          error: error => {
            console.error('Error adding book:', error);
          }
        });
      });
    } else {
      this.bookForm.markAllAsTouched();
      console.error('Please fill out all fields and select an image.');
    }
  }  

  goBack(): void {
    this.router.navigate(['/books']);
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit {

  bookForm: FormGroup;
  imageIsUploading = false;
  imageUrl: string;

  constructor(private formBuilder: FormBuilder,
    private bookService: BooksService,
    private router: Router) { }

  ngOnInit(): void {
    this.initBookForm();
    this.bookService.getBooks();
  }

  private initBookForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  onSubmit() {
    const bookFormValue = this.bookForm.value;
    const book = new Book(bookFormValue['title'], bookFormValue['author']);
    book.imageUrl = this.imageUrl && this.imageUrl !== '' ? this.imageUrl : null;

    this.bookService.createBook(book);
    this.router.navigate(['/books']);
  }

  private uploadImage(image: File) {
    this.imageIsUploading = true;
    this.bookService.uploadImage(image).then(
      (fileUrl: string) => {
        this.imageUrl = fileUrl;
      }
    );
    this.imageIsUploading = false;
  }

  onUploadImage(event) {
    this.uploadImage(event.target.files[0])
  }

}

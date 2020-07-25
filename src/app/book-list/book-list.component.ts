import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  bookSubscription: Subscription;

  constructor(private bookService: BooksService,
    private router: Router) { }

  ngOnInit(): void {
    this.bookSubscription = this.bookService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );

    this.bookService.getBooks();
  }

  ngOnDestroy(): void {
    this.bookSubscription.unsubscribe();
  }

  onRemoveBook(book) {
    this.bookService.removeBook(book);
  }

  onViewBook(id: number) {
    this.router.navigate(['/books', id]);
  }

}

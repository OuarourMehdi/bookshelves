import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.model';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  book: Book;

  constructor(private bookService: BooksService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.bookService.getBook(+this.activatedRoute.snapshot.paramMap.get('id')).then(
      (book: Book) => {
        this.book = book;
      }
    );
  }

}

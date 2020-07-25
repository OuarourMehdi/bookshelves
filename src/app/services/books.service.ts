import { Book } from '../models/book.model'
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

const booksDatabaseRef = '/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private books: Book[] = [];
  booksSubject = new Subject<Book[]>(); 

  constructor() { }

  emitBooksSubject() {
    this.booksSubject.next(this.books.slice());
  }

  private saveBooks() {
    firebase.database().ref(booksDatabaseRef).set(this.books);
    this.emitBooksSubject();
  }

  getBooks() {
    firebase.database().ref(booksDatabaseRef).on(
      'value',
      (dataSnapshot) => {
        this.books = dataSnapshot.val() ? dataSnapshot.val() : [];
        this.emitBooksSubject();
      }
    )
  }

  getBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref(booksDatabaseRef + '/' + id).once('value')
        .then(
          (value) => {
            resolve(value.val());
          }, 
          (error) => {
            reject(error);
          }
        );
      }
    ) 
  }

  createBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooks();
  }

  removeBook(bookToRemove: Book) {
    if(bookToRemove.imageUrl) {
      firebase.storage().refFromURL(bookToRemove.imageUrl).delete().then(
        () => {
          console.log('Image ' + bookToRemove.imageUrl + ' supprimée !')
        }
      );
    }
    const bookToRemoveIndex = this.books.findIndex(
      (book) => {
        return book === bookToRemove;
      }
    );

    this.books.splice(bookToRemoveIndex, 1);
    this.saveBooks();
  }

  uploadImage(image: File) {
    return new Promise(
      (resolve, reject) => {
        const filePath = 'images/' + Date.now().toString() + '-' + image.name;
        const reference = firebase.storage().ref()
        .child(filePath);

        reference.put(image).on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('chargement en cours de l\'image ' + filePath + ' ...');
          },
          (error) => {
            console.error('Erreur de chargement de l\'image ' + filePath);
            reject();
          },
          () => {
            console.log('Fin chargement de l\'image ' + filePath);
            reference.getDownloadURL().then(
              (downloadUrl: string) => {
                resolve(downloadUrl);
              }
            );
          }
        )
      }
    );
  }
}

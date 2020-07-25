import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BookListComponent } from './book-list/book-list.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BookFormComponent } from './book-list/book-form/book-form.component';
import { BookComponent } from './book-list/book/book.component';

const routes: Routes = [
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'books', component: BookListComponent, canActivate: [AuthGuardService] },
  { path: 'books/new', component: BookFormComponent, canActivate: [AuthGuardService] },
  { path: 'books/:id', component: BookComponent, canActivate: [AuthGuardService] },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', redirectTo: 'books' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean;
  authenticatedUserEmail: string;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user: firebase.User) => {
        if(user) {
          this.isAuthenticated = true;
          this.authenticatedUserEmail = user.email;
        } else {
          this.isAuthenticated = false;
        }
      }
    );
  }

  onSignout() {
    this.authService.signOut();
    this.isAuthenticated = false;
    this.authenticatedUserEmail = null;
    this.router.navigate(['/auth/signin'])
  }

}

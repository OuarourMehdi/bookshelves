import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    var firebaseConfig = {
      apiKey: "AIzaSyAOnxQt40Uk_sHBrwy1nOKJl2zVCRDamvc",
      authDomain: "mou-angular-training.firebaseapp.com",
      databaseURL: "https://mou-angular-training.firebaseio.com",
      projectId: "mou-angular-training",
      storageBucket: "mou-angular-training.appspot.com",
      messagingSenderId: "571170127055",
      appId: "1:571170127055:web:8037b671795884910b8bba"
    };
    firebase.initializeApp(firebaseConfig);
  }
}

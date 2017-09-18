import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  users: FirebaseListObservable<any[]>;
  private theAppId: any;
  constructor(db: AngularFireDatabase) {
    this.users = db.list('/users');
  }
  ngOnInit() {
    this.theAppId = 488046014870137;
  }
}

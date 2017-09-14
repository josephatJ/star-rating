import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import {AuthService} from '../providers/auth.service';
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  public val: any;
  user: Observable<firebase.User>;
  public rateAverage: any;
  public rateAverage1: any;
  public rateAverage2: any;
  public rateAverage3: any;
  public rateAverage4: any;
  public rateAverage5: any;
  public totalRatings: any;
  public totalRatings1: any;
  public totalRatings2: any;
  public totalRatings3: any;
  public totalRatings4: any;
  public totalRatings5: any;
  users: FirebaseListObservable<any[]>;
  ratings: FirebaseListObservable<any[]>;
  private userDisplayName: string;
  public userEmail: string;
  private isLoggedIn: boolean;
  constructor(db: AngularFireDatabase, public afAuth: AngularFireAuth, public authService: AuthService) {
    this.user = afAuth.authState;
    this.users = db.list('/users');
    this.ratings = db.list('/ratings');
    this.ratings.subscribe(rating => {
      let total = 0; let sum5 = 0; let sum4 = 0; let sum3 = 0; let sum2 = 0; let sum1 = 0;
      let total1 = 0; let total2 = 0; let total3 = 0; let total4 = 0; let total5 = 0;
      rating.forEach(function (rating) {
        if (rating.rateValue === 5) {
          sum5 += rating.rateValue;
          total5++;
          console.log('Total 5 ' + total5);
        } else if (rating.rateValue === 4) {
          sum4 += rating.rateValue;
          total4++;
          console.log('Total 4 ' + total4);
        }else if (rating.rateValue === 3) {
          sum3 += rating.rateValue;
          total3++;
          console.log('Total 3 ' + total3 + sum3);
        }else if (rating.rateValue === 2) {
          sum2 += rating.rateValue;
          total2++;
          console.log('Total 2 ' + total2);
        }else if (rating.rateValue === 1) {
          sum1 += rating.rateValue;
          total1++;
          console.log('Total 1 ' + total1);
        }
        total += rating.rateValue;
      });
      console.log(total);
      if (rating.length > 0) {
        this.rateAverage = (total / rating.length).toFixed(1);
      } else {
        this.rateAverage = 0;
      }
      if (total1 === 0) {
        this.rateAverage1 = (sum1 / total1).toFixed(1);
      } else {
        this.rateAverage1 = 0;
      }
      if (total2 === 0) {
        this.rateAverage2 = (sum2 / total2).toFixed(1);
      } else {
        this.rateAverage2 = 0;
      }
      if (total3 === 0) {
        this.rateAverage3 = (sum3 / total3).toFixed(1);
      } else {
        this.rateAverage3 = 0;
      }
      if (total4 === 0) {
        this.rateAverage4 = (sum4 / total4).toFixed(1);
      } else {
        this.rateAverage4 = 0;
      }
      if (total5 === 0) {
        this.rateAverage5 = (sum5 / total5).toFixed(1);
      } else {
        this.rateAverage5 = 0;
      }
      this.totalRatings = rating.length;
      this.totalRatings1 = total1;
      this.totalRatings2 = total2;
      this.totalRatings3 = total3;
      this.totalRatings4 = total4;
      this.totalRatings5 = total5;
    });
    console.log();
    // this.authService.af.auth.subscribe(
    //   (auth) => {
    //     if (auth === null){
    //       this.isLoggedIn = false;
    //     } else {
    //       this.isLoggedIn = true;
    //       this.userDisplayName = auth.google.displayName;
    //       this.userEmail = auth.google.email;
    //     }
    //   }
    // );
  }
  ngOnInit() {
    this.authService.af.auth.onAuthStateChanged((user) => {
      if (user != null) {
        // User is logged in, use the user object for its info.
        this.isLoggedIn = true;
        this.userDisplayName = user.displayName;
        this.userEmail = user.email;
        // etc.
      } else {
        // User is not logged in, redirect to where you need to.
      }
    });
  }
  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

 getStarValue(val, email) {
   this.ratings.push({ email: email, rateValue: val });
 }
}

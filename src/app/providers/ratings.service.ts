import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Injectable()
export class RatingsService {

  constructor(public db: AngularFireDatabase) { }

}

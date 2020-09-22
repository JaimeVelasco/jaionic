import { Component, OnInit } from '@angular/core';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/database';

import { Observable } from 'rxjs';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { startWith, tap } from 'rxjs/operators';
import { trace } from '@angular/fire/performance';
import { PhotoService } from '../services/photo.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public readonly testObjectValue$: Observable<any>;

  imageListRef: AngularFireList<any>;
  imageRef: AngularFireObject<any>;

  items: Observable<any[]>;

  constructor(
    state: TransferState,
    database: AngularFireDatabase,
    public photoService: PhotoService
  ) {
    // this.items = database.list('users').valueChanges();
    const doc = database.object('users');
    const key = makeStateKey(doc.query.toString());
    const existing = state.get(key, undefined);
    this.testObjectValue$ = doc
      .valueChanges()
      .pipe(
        trace('database'),
        existing ? startWith(existing) : tap((it) => state.set(key, it))
      );
  }
  ngOnInit(): void {}
}

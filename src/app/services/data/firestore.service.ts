import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import 'firebase/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { firestore } from 'firebase/app';
import { base64StringToBlob } from 'blob-util';
import { promise } from 'protractor';
import { Data } from '../../models/data.interface';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { finalize, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  downloadURL: Observable<string>;

  constructor(
    public fire: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getUserData(uid: string) {
    return this.fire.collection(`users`).doc(uid).get();
  }

  async saveImage(image: any, userUid: string) {
    const userRef = this.fire.collection('users').doc(userUid);
    const blob = base64StringToBlob(image, 'image/png');
    const filePath = `${userUid}/${new Date().getTime()}_${Math.random()
      .toString(36)
      .substring(2, 8)}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, blob);

    userRef.update({
      images: firestore.FieldValue.arrayUnion('image'),
    });

    await task;
    this.downloadURL = await fileRef.getDownloadURL().toPromise();

    return this.downloadURL;
  }

  // // method to retrieve download url
  // private async getUrl(snap: firebase.storage.UploadTaskSnapshot) {
  //   const url = await snap.ref.getDownloadURL();
  //   this.url = url;
  // }

  read_users() {
    return this.fire.collection('users').snapshotChanges();
  }
}

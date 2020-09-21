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

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(
    public fire: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  getUserData(uid: string) {
    return this.fire.collection(`users`).doc(uid).get();
  }

  saveImage(image: any, userUid: string) {
    const filePath = `users/${userUid}/images`;
    const userRef = this.fire.collection('users').doc(userUid);
    console.log(image);
    const blob = base64StringToBlob(image, 'image/png');
    this.storage
      .upload(
        `${userUid}/${new Date().getTime()}_${Math.random()
          .toString(36)
          .substring(2, 8)}`,
        blob
      )
      .then((data) => {
        console.log('dsdsdsd', data);
      });

    userRef.update({
      images: firestore.FieldValue.arrayUnion('image'),
    });
    // return this.fire.collection('users/').add(image);
  }

  read_users() {
    return this.fire.collection('users').snapshotChanges();
  }
}

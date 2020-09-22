import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { FirestoreService } from '../services/data/firestore.service';
import { Observable, of, Subscription } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';
import { GoogleVisionService } from '../services/google-vision.service';
import { promise } from 'protractor';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  userList: {};
  userList2: {};
  downloadURL: Observable<string>;
  uploadPercent: Observable<number>;

  constructor(
    public photoService: PhotoService,
    public fire: FirestoreService,
    public gVision: GoogleVisionService
  ) {}

  ngOnInit() {
    this.fire.read_users().subscribe((data) => {
      this.userList = data.map((e) => {
        return {
          uid: e.payload.doc.id,
          name: e.payload.doc.data()['name'],
          images: e.payload.doc.data()['images'],
        };
      });
    });
    const user = JSON.parse(localStorage.getItem('user'));

    // this.fire.getUserData(user.uid).subscribe((res) => {
    //   console.log(res.data());
    // });
  }

  takePicture() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.photoService.takePicture().then((pic) => {
      this.fire.saveImage(pic, user.uid).then((data) => {
        this.downloadURL = data;
      });

      // this.gVision
      //   .googleVisionAPI(pic, 'OBJECT_LOCALIZATION')
      //   .subscribe((res) => {
      //     console.log(res);
      //   });
    });
  }
}

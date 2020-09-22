import { Injectable } from '@angular/core';
import {
  Plugins,
  CameraResultType,
  Capacitor,
  FilesystemDirectory,
  CameraPhoto,
  CameraSource,
} from '@capacitor/core';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: Photo[] = [];

  constructor() {}

  selectedPicture: string;

  public async takePicture() {
    // Take a photo
    try {
      const capturedPhoto = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        height: 200,
        width: 100,
        preserveAspectRatio: false,
      });
      this.selectedPicture = capturedPhoto.base64String;

      this.photos.unshift({
        filepath: 'soon...',
        webviewPath: capturedPhoto.webPath,
      });

      return this.selectedPicture;
    } catch (error) {
      console.error(error);
    }
  }

  private async savePicture(cameraPhoto: CameraPhoto) {}
}

export interface Photo {
  filepath: string;
  webviewPath: string;
}

import { Injectable } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
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
      return this.selectedPicture;
    } catch (error) {
      console.error(error);
    }
  }
}

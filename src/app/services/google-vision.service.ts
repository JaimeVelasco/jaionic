import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/map';
// import { map } from 'rxjs/operators';
import { googleCloudVisionAPI } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleVisionService {
  constructor(public http: HttpClient) {}
  // Setting up to detect objects in an image
  googleVisionAPI(base64Image: string, APIType: string) {
    const body = {
      requests: [
        {
          image: {
            content: base64Image,
          },
          features: [
            {
              type: APIType,
              maxResults: 10,
            },
          ],
        },
      ],
    };
    return this.http.post(
      'https://vision.googleapis.com/v1/images:annotate?key=' +
        googleCloudVisionAPI.googleCloudVisionAPIKey,
      body
    );
  }
}

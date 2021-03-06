// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCe5yklqPRjHrVzdDCqdVoMn4zqHnzoVN4',
    authDomain: 'jaionic.firebaseapp.com',
    databaseURL: 'https://jaionic.firebaseio.com',
    projectId: 'jaionic',
    storageBucket: 'jaionic.appspot.com',
    messagingSenderId: '1072087032593',
    appId: '1:1072087032593:web:f20f0d5c2fe0abdbc662b0',
    measurementId: 'G-HXNS05X3XK',
  },
};

export const googleCloudVisionAPI = {
  googleCloudVisionAPIKey: 'AIzaSyAK0byFyBS3CKWyhRq15TaIb80Wd-0Km9k',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

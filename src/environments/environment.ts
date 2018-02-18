// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDnoRK_8Z4rMGqhu10e1YYWrHN3sLJ9Mkk',
    authDomain: 'recall-e9b7c.firebaseapp.com',
    databaseURL: 'https://recall-e9b7c.firebaseio.com',
    projectId: 'recall-e9b7c',
    storageBucket: 'recall-e9b7c.appspot.com',
    messagingSenderId: '988844239697'
  },
  // api: 'https://us-central1-sefware-pos.cloudfunctions.net'
};

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
      apiKey: 'AIzaSyCf46yPJOxs_HJwbm8tG4XX5oMK2hJW5mc',
      authDomain: 'dressapp-fa71f.firebaseapp.com',
      databaseURL: 'https://dressapp-fa71f.firebaseio.com',
      projectId: 'dressapp-fa71f',
      storageBucket: 'dressapp-fa71f.appspot.com',
      messagingSenderId: '113252469733'
    }
};

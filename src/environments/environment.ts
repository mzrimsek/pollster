import { Environment } from './';

export const environment: Environment = {
  production: false,
  urls: {},
  firebase: {
    apiKey: 'AIzaSyCT3B7Lp2-0KkqdoI-uWhiehKyzUiGwUlA',
    authDomain: 'pollster-dev.firebaseapp.com',
    databaseURL: 'https://pollster-dev.firebaseio.com',
    projectId: 'pollster-dev',
    storageBucket: 'pollster-dev.appspot.com',
    messagingSenderId: '631483428601'
  },
  uuid: {
    domain: 'https://pollster-dev.firebaseapp.com/',
    namespace: 'c50e4aff-525c-4ce7-b96f-64445846da3a'
  }
};

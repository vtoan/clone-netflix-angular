import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/firestore';
const firebaseConfig = {
  apiKey: 'AIzaSyC0EuHAGrrhFd6W5YaeFOTLebWWV-1Tq9M',
  authDomain: 'netflixclone-74384.firebaseapp.com',
  projectId: 'netflixclone-74384',
  storageBucket: 'netflixclone-74384.appspot.com',
  messagingSenderId: '622055443938',
  appId: '1:622055443938:web:7092509834d20a8dcb7dbb',
};

@Injectable({
  providedIn: 'root',
})
export class ConnectDbService {
  constructor() {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
  getInstnace(): any {
    return firebase.firestore();
  }
}

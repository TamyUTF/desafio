import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';

import { HomePage } from '../pages/home/home';

const config = {
  apiKey: "AIzaSyA3SRnxWLF6eC_QYD9HvCEb9RrpgWvNzjs",
  authDomain: "desafio-forlogic-e4e86.firebaseapp.com",
  databaseURL: "https://desafio-forlogic-e4e86.firebaseio.com",
  projectId: "desafio-forlogic-e4e86",
  storageBucket: "desafio-forlogic-e4e86.appspot.com",
  messagingSenderId: "1078172270901"

}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}


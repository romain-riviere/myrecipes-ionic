import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    let config = {
      apiKey: "AIzaSyBeL-7001MryljXushJt-9QbL7y6oqz5kY",
      authDomain: "myrecipes-a8ab4.firebaseapp.com",
      databaseURL: "https://myrecipes-a8ab4.firebaseio.com",
      projectId: "myrecipes-a8ab4",
      storageBucket: "myrecipes-a8ab4.appspot.com",
      messagingSenderId: "553024915467"
    };
    firebase.initializeApp(config);

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}


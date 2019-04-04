import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { FIREBASE_CONFIG } from '../config/firebase.config'
import { RecipesPage } from '../pages/recipes/recipes';
import { AuthPage } from '../pages/auth/auth';
import { FavoritesPage } from '../pages/favorites/favorites';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  recipesPage: any = RecipesPage;
  favoritesPage: any = FavoritesPage;
  authPage: any = AuthPage;
  isAuth: boolean = false;

  @ViewChild('content') content: NavController;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl: MenuController,
  ) {

    let config = FIREBASE_CONFIG;
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
          this.content.push(AuthPage);
        }
      }
    );

    platform.ready().then(() => {
      if (platform.is('android')) {
        statusBar.styleBlackOpaque();
      } else {
        statusBar.styleDefault();
      }
      splashScreen.hide();
    });
  }

  onNavigate(page: any, data?: {}) {
    this.content.setRoot(page, data ? data : null);
    this.dismissMenu();
  }

  onDisconnect() {
    firebase.auth().signOut();
    this.dismissMenu();
  }

  onConnect() {
    this.content.push(AuthPage);
    this.dismissMenu();
  }

  dismissMenu() {
    this.menuCtrl.close();
  }
}


import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ToastHelper } from '../helpers/toast.helper';
import { RecipesPage } from '../pages/recipes/recipes';
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { RecipesService } from '../services/recipes.service';
import { SingleRecipePage } from '../pages/recipes/single-recipe/single-recipe';
import { AuthPage } from '../pages/auth/auth';
import { AuthService } from '../services/auth.service';
import { FavoriteRecipesService } from '../services/favorite-recipes.service';
import { BrowserHelper } from '../helpers/browser.helper';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FavoritesPage } from '../pages/favorites/favorites';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    RecipesPage,
    SingleRecipePage,
    FavoritesPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthPage,
    RecipesPage,
    SingleRecipePage,
    FavoritesPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    InAppBrowser,
    RecipesService,
    AuthService,
    FavoriteRecipesService,
    ToastHelper,
    BrowserHelper,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

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

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    RecipesPage,
    SingleRecipePage,
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
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpClient,
    RecipesService,
    AuthService,
    FavoriteRecipesService,
    ToastHelper,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }

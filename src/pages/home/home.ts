import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { RecipesPage } from '../recipes/recipes';
import { AuthPage } from '../auth/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  homeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.homeForm = this.formBuilder.group({
      recipeSearch: ['', Validators.required]
    })
  }

  onSubmitForm() {
    this.navCtrl.setRoot(RecipesPage, { recipeSearch: this.homeForm.get('recipeSearch').value });
  }

  onGoToAuth() {
    this.navCtrl.push(AuthPage);
  }

  onDisconnect() {
    this.authService.signOut();
  }
}

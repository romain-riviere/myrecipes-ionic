import { Component, OnInit } from '@angular/core';
import { NavParams, InfiniteScroll, NavController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { RecipesService } from '../../services/recipes.service';
import { ToastHelper } from '../../helpers/toast.helper';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SingleRecipePage } from './single-recipe/single-recipe';
import { FavoriteRecipesService } from '../../services/favorite-recipes.service';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit {

  recipesLoading: Boolean = true;
  recipes: any[];
  recipesSubscription: Subscription;
  recipeSearchForm: FormGroup;
  favoriteRecipes: any[] = [];
  favoriteRecipesSubscription: Subscription;

  constructor(
    private navParams: NavParams,
    private toastHelper: ToastHelper,
    private recipesService: RecipesService,
    private favoriteRecipesService: FavoriteRecipesService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.initForm();
    this.recipeSearchForm.controls['recipeSearch'].setValue(this.navParams.get('recipeSearch'));
    this.recipesSubscription = this.recipesService.recipes$.subscribe(
      (recipes: any[]) => {
        this.recipes = recipes
      }
    )
    this.recipesService.emitRecipes();
    this.onLoadRecipes();
    this.favoriteRecipesSubscription = this.favoriteRecipesService.favoriteRecipes$.subscribe(
      (favoriteRecipes: any[]) => {
        this.favoriteRecipes = favoriteRecipes
      }
    )
    this.favoriteRecipesService.emitFavoriteRecipes();
    this.onLoadFavoriteRecipes();
  }

  onLoadFavoriteRecipes() {
    this.favoriteRecipesService.getFavoriteRecipes();
  }

  initForm() {
    this.recipeSearchForm = this.formBuilder.group({
      recipeSearch: ['', Validators.required]
    })
  }

  onSubmitForm() {
    this.onLoadRecipes();
  }

  onLoadRecipes() {
    this.recipesLoading = true;
    this.recipesService.getRecipes(this.recipeSearchForm.get('recipeSearch').value)
      .then(
        () => {
          this.recipesLoading = false;
        })
      .catch((error) => {
        this.toastHelper.presentErrorToast(error)
      });
  }

  doInfinite(infiniteScroll: InfiniteScroll): Promise<any> {
    return this.recipesService.getMore()
      .then(
        (hasMoreRecipes: boolean) => {
          infiniteScroll.enable(hasMoreRecipes);
          infiniteScroll.complete();
        }
      );
  }

  onClickRecipe(index: number) {
    this.navCtrl.push(SingleRecipePage, { index: index });
  }

  onClickFavorite(recipe: any) {
    if (this.favoriteRecipes.indexOf({ id: recipe.uri, label: recipe.label }) !== -1) {
      this.favoriteRecipesService.deleteFavoriteRecipe(recipe);
    } else {
      this.favoriteRecipesService.addFavoriteRecipe(recipe);
    }
    this.recipesService.updateFavorites();
  }
}

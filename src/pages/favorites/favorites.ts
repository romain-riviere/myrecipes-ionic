import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, MenuController, Searchbar, LoadingController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ToastHelper } from '../../helpers/toast.helper';
import { FavoriteRecipesService } from '../../services/favorite-recipes.service';
import { SingleRecipePage } from '../recipes/single-recipe/single-recipe';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage implements OnInit {
  recipesLoading: boolean;
  recipeSearch: string;
  favoriteRecipes: any[] = [];
  filteredFavoriteRecipes: any[] = [];
  favoriteRecipesSubscription: Subscription;
  showSearchBar: boolean = false;

  @ViewChild('searchbar') searchbar: Searchbar;

  constructor(
    private toastHelper: ToastHelper,
    private menuCtrl: MenuController,
    private favoriteRecipesService: FavoriteRecipesService,
    private recipesService: RecipesService,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.favoriteRecipesSubscription = this.favoriteRecipesService.favoriteRecipes$.subscribe(
      (favoriteRecipes: any[]) => {
        this.favoriteRecipes = favoriteRecipes
        this.filteredFavoriteRecipes = favoriteRecipes;
      }
    )
    this.favoriteRecipesService.emitFavoriteRecipes();
    this.onLoadFavoriteRecipes();
    this.searchbar.ionBlur.subscribe(() => {
      this.showSearchBar = false;
    })
  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  onToggleSearchBar() {
    this.showSearchBar = true;
    this.searchbar.setFocus();
  }

  onLoadFavoriteRecipes() {
    this.recipesLoading = true;
    this.favoriteRecipesService.getFavoriteRecipes()
      .then(
        () => {
          this.recipesLoading = false;
        })
      .catch((error) => {
        this.recipesLoading = false;
        this.toastHelper.presentErrorToast(error)
      });
  }

  onSubmitSearch() {
    this.filteredFavoriteRecipes = this.favoriteRecipes.filter(
      (recipe) => {
        return recipe.label.toLowerCase().indexOf(this.recipeSearch.toLowerCase()) > -1
      }
    )
  }

  onClickRecipe(index: number) {
    const loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();
    this.recipesService.getRecipeFromUri(this.filteredFavoriteRecipes[index].uri).then(
      (recipe) => {
        this.navCtrl.push(SingleRecipePage, { recipe: { recipe: recipe, isFavorite: true } });
        loader.dismiss();
      },
      (error) => {
        loader.setContent('Error retreiving the recipe');
        loader.setDuration(2000);
        this.toastHelper.presentErrorToast(error);
      }
    )
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { NavParams, InfiniteScroll, NavController, MenuController, Searchbar } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { RecipesService } from '../../services/recipes.service';
import { ToastHelper } from '../../helpers/toast.helper';
import { SingleRecipePage } from './single-recipe/single-recipe';
import { FavoriteRecipesService } from '../../services/favorite-recipes.service';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage implements OnInit {
  recipesLoading: boolean;
  recipes: any[] = [];
  recipesSubscription: Subscription;
  recipeSearch: string;
  favoriteRecipes: any[] = [];
  favoriteRecipesSubscription: Subscription;
  showSearchBar: boolean = false;

  @ViewChild('searchbar') searchbar: Searchbar;

  constructor(
    private navParams: NavParams,
    private toastHelper: ToastHelper,
    private menuCtrl: MenuController,
    private recipesService: RecipesService,
    private favoriteRecipesService: FavoriteRecipesService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.recipeSearch = this.navParams.get('recipeSearch');
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
    this.favoriteRecipesService.getFavoriteRecipes();
  }

  onSubmitSearch() {
    this.onToggleSearchBar();
    this.onLoadRecipes();
  }

  onLoadRecipes() {
    if (this.recipeSearch && this.recipeSearch.length > 0) {
      this.recipesLoading = true;
      this.recipesService.getRecipes(this.recipeSearch)
        .then(
          () => {
            this.recipesLoading = false;
          })
        .catch((error) => {
          this.recipesLoading = false;
          this.toastHelper.presentErrorToast(error)
        });
    }
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
}

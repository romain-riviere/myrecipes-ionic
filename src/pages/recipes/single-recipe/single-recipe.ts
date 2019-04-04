import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../services/recipes.service';
import { NavParams, MenuController } from 'ionic-angular';
import { FavoriteRecipesService } from '../../../services/favorite-recipes.service';
import { BrowserHelper } from '../../../helpers/browser.helper';

@Component({
    selector: 'page-single-recipe',
    templateUrl: 'single-recipe.html',
})
export class SingleRecipePage implements OnInit {
    index: number;
    uri: string;
    recipe: any;

    constructor(
        private navParams: NavParams,
        private menuCtrl: MenuController,
        private recipesService: RecipesService,
        private favoriteRecipesService: FavoriteRecipesService,
        private browserHelper: BrowserHelper,
    ) { }

    ngOnInit() {
        this.index = this.navParams.get('index');
        this.recipe = this.navParams.get('recipe');
        if (this.index !== undefined) this.recipe = this.recipesService.recipes[this.index];
    }

    onToggleMenu() {
        this.menuCtrl.open();
    }

    openUrl(url: string) {
        this.browserHelper.openUrl(url);
    }

    onToggleFavorite() {
        if (this.recipe.isFavorite) {
            this.recipe.isFavorite = false;
            this.favoriteRecipesService.deleteFavoriteRecipe(this.recipe);
        } else {
            this.recipe.isFavorite = true;
            this.favoriteRecipesService.addFavoriteRecipe(this.recipe);
        }
        this.recipesService.updateFavorites();
    }
}

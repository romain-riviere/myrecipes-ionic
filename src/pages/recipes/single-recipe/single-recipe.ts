import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../services/recipes.service';
import { NavParams } from 'ionic-angular';

@Component({
    selector: 'page-single-recipe',
    templateUrl: 'single-recipe.html',
})
export class SingleRecipePage implements OnInit {
    index: number;
    recipe: any;

    constructor(
        private navParams: NavParams,
        private recipesService: RecipesService
    ) { }

    ngOnInit() {
        this.index = this.navParams.get('index');
        this.recipe = this.recipesService.recipes[this.index].recipe;
    }
}

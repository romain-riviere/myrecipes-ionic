import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EDAMAM_CONFIG } from '../config/edamam.config';
import { Subscription } from 'rxjs/Subscription';
import { FavoriteRecipesService } from './favorite-recipes.service';

@Injectable()
export class RecipesService {
    recipes$ = new Subject<any[]>();
    recipes: any[] = [];
    lastIndex: number;
    lastSearch: string;
    favoriteRecipes: any[] = [];
    favoriteRecipesSubscription: Subscription;

    constructor(
        private http: HttpClient,
        private favoriteRecipesService: FavoriteRecipesService,
    ) {

        this.favoriteRecipesSubscription = this.favoriteRecipesService.favoriteRecipes$.subscribe(
            (favoriteRecipes: any[]) => {
                this.favoriteRecipes = favoriteRecipes
            }
        )
        this.favoriteRecipesService.emitFavoriteRecipes();
        this.favoriteRecipesService.getFavoriteRecipes();
    }

    emitRecipes() {
        this.recipes$.next(this.recipes);
    }

    getRecipes(recipeSearch: string) {
        return new Promise((resolve, reject) => {
            this.http
                .get(EDAMAM_CONFIG.baseUrl + 'search?q=' + recipeSearch + '&app_id=' + EDAMAM_CONFIG.app_id + '&app_key=' + EDAMAM_CONFIG.apiKey + '&to=' + 20)
                .subscribe(
                    (data: any) => {
                        this.recipes = data.hits;
                        this.updateFavorites();
                        this.lastIndex = data.to;
                        this.lastSearch = recipeSearch;
                        this.emitRecipes();
                        resolve(data.more);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }

    getMore() {
        return new Promise((resolve, reject) => {
            this.http
                .get(EDAMAM_CONFIG.baseUrl + 'search?q=' + this.lastSearch + '&app_id=' + EDAMAM_CONFIG.app_id + '&app_key=' + EDAMAM_CONFIG.apiKey + '&from=' + (this.lastIndex + 1) + '&to=' + (this.lastIndex + 20))
                .subscribe(
                    (data: any) => {
                        data.hits.forEach(recipe => {
                            this.recipes.push(recipe);
                        });
                        this.updateFavorites();
                        this.lastIndex = data.to;
                        this.emitRecipes();
                        resolve(data.more);
                    },
                    error => {
                        reject(error);
                    }
                );
        });
    }

    updateFavorites() {
        this.favoriteRecipesService.getFavoriteRecipes().then(
            () => {
                this.recipes.map(
                    (recipe) => {
                        const match = this.favoriteRecipes.find(
                            (favRecipe) => {
                                return recipe.recipe.uri === favRecipe.id
                            }
                        )
                        if (match !== undefined) {
                            recipe.isFavorite = true;
                        } else {
                            recipe.isFavorite = false;
                        }
                        return recipe;
                    }
                );
                this.emitRecipes();
            }
        );
    }
}
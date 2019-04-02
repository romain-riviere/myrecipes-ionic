import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class FavoriteRecipesService {
    favoriteRecipes$ = new Subject<any[]>();
    favoriteRecipes: any[] = [];

    emitFavoriteRecipes() {
        this.favoriteRecipes$.next(this.favoriteRecipes);
    }

    saveFavoriteRecipes() {
        return new Promise((resolve, reject) => {
            const uid = firebase.auth().currentUser.uid;
            firebase.database().ref('favorite-recipes/' + uid).set(this.favoriteRecipes).then(
                (data) => {
                    resolve(data);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    getFavoriteRecipes() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser !== null) {
                const uid = firebase.auth().currentUser.uid;
                firebase.database().ref('favorite-recipes/' + uid).once('value').then(
                    (data) => {
                        if (data.val() !== null) {
                            this.favoriteRecipes = data.val();
                        } else {
                            this.favoriteRecipes = [];
                        }
                        this.emitFavoriteRecipes();
                        resolve('Données récupérées avec succès !');
                    }, (error) => {
                        reject(error);
                    }
                );
            } else {
                reject('DISCONNECTED');
            }
        })
    }

    addFavoriteRecipe(recipe: any) {
        var favoriteRecipe = {
            id: recipe.recipe.uri,
            label: recipe.recipe.label
        }
        this.favoriteRecipes.push(favoriteRecipe);
        this.emitFavoriteRecipes();
        this.saveFavoriteRecipes();
    }

    deleteFavoriteRecipe(recipe: any) {
        var favoriteRecipe = {
            id: recipe.recipe.uri,
            label: recipe.recipe.label
        }
        const indexToRemove = this.favoriteRecipes.indexOf(favoriteRecipe);
        this.favoriteRecipes.splice(indexToRemove, 1);
        this.emitFavoriteRecipes();
        this.saveFavoriteRecipes();
    }
}
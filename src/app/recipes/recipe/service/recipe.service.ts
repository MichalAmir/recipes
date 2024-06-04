import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Recipe } from '../model/recipe.model';
  
@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = 'https://localhost:7127/api/Recipe';

  constructor(private httpClient: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.httpClient.get<Recipe[]>(this.baseUrl)
      .pipe(
        catchError(error => {
          console.error('Error fetching recipes:', error);
          return throwError('Something went wrong while fetching recipes. Please try again later.');
        })
      );
  }
  getCounter(): Observable<number> {
    return this.httpClient.get<number>(`${this.baseUrl}/counter`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching counter:`, error);
          return throwError('Something went wrong while fetching the counter. Please try again later.');
        })
      );
  }

  getRecipeById(id: String): Observable<Recipe> {
    return this.httpClient.get<Recipe>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error fetching recipe with ID ${id}:`, error);
          return throwError('Something went wrong while fetching the recipe. Please try again later.');
        })
      );
  }

  
addRecipe(recipe: Recipe): Observable<boolean> {
    return this.httpClient.post<boolean>(this.baseUrl, recipe)
      .pipe(
        catchError(error => {
          console.error('Error adding recipe:', error);
          return throwError('Something went wrong while adding the recipe. Please try again later.');
        })
      );
  }

  

  updateRecipe(id: number, recipe: Recipe): Observable<boolean> {
    return this.httpClient.put<boolean>(`${this.baseUrl}/${id}`, recipe)
    .pipe(
        catchError(error => {
          console.error(`Error updating recipe with ID ${id}:`, error);
          return throwError('Something went wrong while updating the recipe. Please try again later.');
        })
      );
  }

  deleteRecipe(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.baseUrl}/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Error deleting recipe with ID ${id}:`, error);
          return throwError('Something went wrong while deleting the recipe. Please try again later.');
        })
      );
  }
}

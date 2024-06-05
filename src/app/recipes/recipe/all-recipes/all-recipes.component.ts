import { Component } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { Router } from '@angular/router';
import { Recipe } from '../model/recipe.model';
import { SmallRecipeComponent } from '../small-recipe/small-recipe.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-all-recipes',
  standalone: true,
  imports: [SmallRecipeComponent,CommonModule],
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})

export class AllRecipesComponent {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe((data) => {
      this.recipes = data;
      this.filteredRecipes = this.recipes;
    });
  }

  filterRecipes(query: string): void {
    this.filteredRecipes = this.recipes.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(query.toLowerCase())
    );
  }
}
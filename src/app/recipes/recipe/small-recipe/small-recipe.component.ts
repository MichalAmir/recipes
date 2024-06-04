import { Component, Input } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Ingredient } from '../model/Ingredient.model';

import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
})
export class SmallRecipeComponent {
  
  @Input() recipe!: Recipe;

  constructor(private router: Router) { }

  navigateToDetails(recipe: Recipe){
    this.router.navigate(['/recipeDetails', { recipe: JSON.stringify(recipe) }]);
  }
}


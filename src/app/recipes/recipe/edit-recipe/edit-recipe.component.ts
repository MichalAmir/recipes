import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipe.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports:[FormsModule,CommonModule],
  selector: 'app-edit-recipe',
  standalone: true,
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  recipe: Recipe = {} as Recipe;
  recipeCode!: number;
  editedRecipe: Recipe = {} as Recipe;
  recipeEdit: Recipe = {} as Recipe;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    const recipeString = this.route.snapshot.paramMap.get('recipe');
    if (recipeString) {
      this.recipe = JSON.parse(recipeString);
      
      this.editedRecipe = { ...this.recipe };
    } else {
      console.log("There is an error: Recipe data not found in route parameters");
    }
  }

  onCancel(): void {
    this.router.navigate(['/allRecipes']);
  }

  onSaveChanges(): void {
    this.recipeEdit = { ...this.editedRecipe };

    if (this.recipe.recipeCode !== undefined) {
      this.recipeCode = this.recipe.recipeCode;
      console.log(this.recipeCode);
      this.recipeService.updateRecipe(this.recipeCode, this.recipeEdit)
        .subscribe(updated => {
          if (updated) {
            console.log('Recipe updated successfully');
            console.log(this.recipeEdit);

            this.router.navigate(['/allRecipes']);
          } else {
            console.error('Error updating recipe');
          }
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipe.service';
import { Category } from '../../../category/model/category.model';
import { CategoryService } from '../../../category/category.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Ingredient } from '../model/Ingredient.model';
import { Router } from '@angular/router';
@Component({
    imports: [FormsModule, CommonModule],
    standalone: true,
    selector: 'app-add-recipe',
    templateUrl: './add-recipe.component.html',
    // styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
    recipe: Recipe =new Recipe('', new Category(0, '', ''), 0, 0, new Date(), [], [], '', '');
    ingredientInputs: Ingredient[] = [];
    preparationInputs: string[] = [''];
    categories: Category[] = [];
    counter: number=3;


    constructor(private recipeService: RecipeService, private categoryService: CategoryService, private router:Router) { }

    ngOnInit() {
        this.loadCategories();
    }

    loadCategories() {
        this.categoryService.getCategories().subscribe(categories => {
            this.categories = categories;
        });
    }

    addIngredientInput() {
        this.ingredientInputs.push(new Ingredient('', ''));
    }

    removeIngredientInput(index: number) {
        this.ingredientInputs.splice(index, 1);
    }

    addPreparationInput() {
        this.preparationInputs.push('');
    }

    removePreparationInput(index: number) {
        this.preparationInputs.splice(index, 1);
    }

    saveRecipe() {
        console.log('Recipe before adding:', this.recipe); 
        this.recipeService.getCounter().subscribe(counter => {
            this.recipe.recipeCode = counter;
        });
        console.log('Recipe after adding:', this.recipe);  
        this.recipeService.addRecipe(this.recipe).subscribe(() => {
            Swal.fire('Success', 'The recipe has been successfully added', 'success');
            this.router.navigate(['/recipeDetails']);  
        });
    }    

    save() {
        console.log(this.recipe);
        this.recipeService.addRecipe(this.recipe).subscribe(() => {
            console.log("Recipe saved successfully");
        });
    }
}

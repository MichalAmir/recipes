import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AllRecipesComponent } from './recipes/recipe/all-recipes/all-recipes.component';
import { AddRecipeComponent } from './recipes/recipe/add-recipe/add-recipe.component';
import { RecipeDetailsComponent } from './recipes/recipe/recipe-details/recipe-details.component';
import { EditRecipeComponent } from './recipes/recipe/edit-recipe/edit-recipe.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'allRecipes', component: AllRecipesComponent},
    {path: 'addRecipes', component: AddRecipeComponent},
    {path: 'recipeDetails', component: RecipeDetailsComponent},
    {path:"editRecipe", component:EditRecipeComponent}
];

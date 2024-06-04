import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../model/recipe.model';
import { RecipeService } from '../service/recipe.service';
import { UserService } from '../../../user/user.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { TimeConversionPipe } from '../../../time-conversion.pipe';

@Component({
  standalone: true,
  imports: [CommonModule,TimeConversionPipe],
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
})
export class RecipeDetailsComponent implements OnInit {
  recipe: Recipe = {} as Recipe;
  currentUser: string | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getCurrentUserFromSessionStorage();
    
    const recipeString = this.route.snapshot.paramMap.get('recipe');
    if (recipeString) {
      this.recipe = JSON.parse(recipeString);
    } else {
      console.log("There is an error: Recipe data not found in route parameters");
    }
  }

  onDeleteRecipe(recipeId: number | undefined) {
    if (typeof recipeId === 'number') {
      this.recipeService.deleteRecipe(recipeId).subscribe(deleted => {
        if (deleted) {
          Swal.fire('Success', 'The recipe has been successfully deleted', 'success');
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      });
    }
  }
  onEditRecipe(recipe: Recipe){
    this._router.navigate(['/editRecipe', { recipe: JSON.stringify(recipe) }]);
  }
  getCurrentUserFromSessionStorage() {
    if (typeof sessionStorage !== 'undefined') {
      const userString = sessionStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        this.currentUser = user.name;
        console.log(this.currentUser);
      } else {
        console.log("User data not found in sessionStorage");
      }
    }
  }
}

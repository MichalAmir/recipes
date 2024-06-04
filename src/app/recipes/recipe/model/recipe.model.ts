import { Category } from "../../../category/model/category.model";
import { Ingredient } from "./Ingredient.model";

export class Recipe {
    // static Counter: number = 3;

    recipeCode: number | undefined;
    recipeName: string;
    category: Category; // Updated to match the server
    preparationTimeMinutes: number;
    difficultyLevel: number;
    dateAdded: Date;
    ingredients: Ingredient[];
    preparationMethod: string[];
    userCode: string;
    imageUrl: string; // Updated property name

    constructor(
        recipeName: string,
        category: Category, // Updated to match the server
        preparationTimeMinutes: number,
        difficultyLevel: number,
        dateAdded: Date,
        ingredients: Ingredient[],
        preparationMethod: string[],
        userCode: string,
        imageUrl: string
    ) {
        // Recipe.Counter++;
        // this.recipeCode = ++Recipe.Counter;
        this.recipeName = recipeName;
        this.category = category;
        this.preparationTimeMinutes = preparationTimeMinutes;
        this.difficultyLevel = difficultyLevel;
        this.dateAdded = dateAdded;
        this.ingredients = ingredients;
        this.preparationMethod = preparationMethod;
        this.userCode = userCode;
        this.imageUrl = imageUrl;
    }
}
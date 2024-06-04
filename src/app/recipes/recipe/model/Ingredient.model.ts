import { Category } from "../../../category/model/category.model";

export class Ingredient {
    name: string;
    icon: string;

    constructor(name: string, icon: string) {
        this.name = name;
        this.icon = icon;
    }
}
import {Ingredient} from "./ingredient.model";

export interface RecipeModel {
  id: number;
  name: string;
  avg_preparation_time: string;
  url_image: string;
  created_at: string;
  updated_at: string;
  ingredients: Ingredient[]
}

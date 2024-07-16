import {RecipeModel} from "./recipe.model";

export interface OrderModel {
  fcm_token: string;
  request_date: string;
  recipe_id: number;
  status: string;
  updated_at: string;
  created_at: string;
  id: number;
  recipe: RecipeModel
}

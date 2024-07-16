import {Component, OnInit} from '@angular/core';
import {AnimationOptions} from "ngx-lottie";
import {ApiService} from "../../services/api.service";
import {RecipeModel} from "../../models/recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit {

  rowData: RecipeModel[] = [];
  options: AnimationOptions = {
    path: '/loading.json',
  };
  isLoading = false;

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.loadRecipies();
  }

  private loadRecipies() {
    this.isLoading = true;
    this.apiService.getRecipes(true).subscribe({
      next: value => {
        this.rowData = value;
        this.isLoading = false;
      }
    })
  }
}

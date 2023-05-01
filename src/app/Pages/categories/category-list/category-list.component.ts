import { Component, OnInit } from '@angular/core';

import {Category} from "../Shared/category.model"
import { CategoryService } from '../Shared/category.service';
import { error } from 'console';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];
  constructor(private categoryService : CategoryService) { }

  ngOnInit() {

    this.categoryService.getAll().subscribe (
      categories => this.categories  = categories, 
      error=> alert('Erro ao carregar a lista')
    )
  }

  deleteCategory (category)
  {
    const mustDelete =  confirm('Deseja realmente excluir este item '+ category.name );

    if(mustDelete)
    console.log('entrou');
    this.categoryService.delete(category.id).subscribe(
      () => this.categories = this.categories.filter(element => element != category),
      () => alert('erro ao tentar excluir')
    ) 
  }

}

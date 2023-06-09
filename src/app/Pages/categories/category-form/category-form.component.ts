import { Component, OnInit, AfterContentChecked } from '@angular/core';
import  {FormBuilder, FormControl, FormGroup , Validators } from '@angular/forms';
import {ActivatedRoute, Route, Router} from "@angular/router";


import {Category} from  "../Shared/category.model";
import { CategoryService } from '../Shared/category.service';

import {switchMap} from 'rxjs/operators';

import toastr from 'toastr';
@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})

export class CategoryFormComponent implements OnInit, AfterContentChecked {

  currentAction:  string = "edit";
  categoryForm:  FormGroup;
  pageTitle : string;

  serverErrorMessages : string [] = null;
  submittingForm  : boolean = false;
  category: Category =  new Category();



  constructor(
    private categoryService: CategoryService, 
    private route : ActivatedRoute,
    private router : Router, 
    private formBuilder : FormBuilder , 

  ) { }


  ngOnInit() {
    this.setCurrentAction();
    this.buildCategoryForm ();
    this.loadCategory();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

submitForm(){
  this.submittingForm = true;
  if(this.currentAction =="new")
    this.createCategory();
  else
    this.updateCategory();
}

//PRIVATES METHODS
private setCurrentAction() {
 this.currentAction = "edit";
 if( this.route.snapshot.url[0].path == "new")
    this.currentAction = "new";
}

private buildCategoryForm(){
  this.categoryForm= this.formBuilder.group({
    id: [null],
    name: [null, [Validators.required,   Validators.minLength(2)]],
    description: [null]
  })
}

private loadCategory(){
  if(this.currentAction == "edit")
  {
  this.route.paramMap.pipe(
    switchMap(params => this.categoryService.getById(+params.get("id")))
  )
  .subscribe(
    (category) => {
      this.category = category
      this.categoryForm.patchValue(category) ; //Seta a categoria nos campos para a edição. =>CAtegory Data to Category Form
    },
    (error) => {
      alert ('erro no Bind');
    }
  )
  
}
}

private createCategory(){
  const category: Category  = Object.assign(new Category(), this.categoryForm.value );

  this.categoryService.create(category)
    .subscribe(
      category => this.actionsForSuccess(category), 
      error => this.actionsForError(error)
    );
}


private updateCategory(){
  const category: Category  = Object.assign(new Category(), this.categoryForm.value );

  this.categoryService.update(category)
    .subscribe(
      category => this.actionsForSuccess(category), 
      error => this.actionsForError(error)
    );


}

private actionsForSuccess (category : Category){
  toastr.success("Solicitação processada com sucesso!");

  // redirect / reload componnet  page
  this.router.navigateByUrl ("categories", {skipLocationChange: true}).then (
      ()=> this.router.navigate(["categories", category.id, "edit"])
  )
}

private actionsForError(error){
  toastr.error("ocorreu um erro ao processar a sua solicitação!");
  console.log (error);

  this.submittingForm =  false;  
  if(error.status === 422)
  {
    this.serverErrorMessages = JSON.parse(error._body).errors;
  }else
  this.serverErrorMessages = ["Falha na comunicação com API"]
}



private setPageTitle() {
  if(this.currentAction =="new") 
    this.pageTitle = "Cadastro de nova Categoria"
    else{
      const categoryName  = this.category.name || "";
      this.pageTitle = "Editando a Categoria : " + categoryName;
    }
}
}


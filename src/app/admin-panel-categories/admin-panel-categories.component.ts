import { Component, OnInit, DoCheck, ElementRef, ViewChild } from '@angular/core';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-admin-panel-categories',
  templateUrl: './admin-panel-categories.component.html',
  styleUrls: ['./admin-panel-categories.component.css']
})
export class AdminPanelCategoriesComponent implements OnInit {
  categories = []
  subcategories = []
  public editable: boolean = false

  categoryModel = {
    _id: 0,
    name: ''
  }

  @ViewChild("myInput") inputEl: ElementRef;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {

    let nearestShopName = localStorage.getItem('nearestShopName')
    let shopType = localStorage.getItem('typeOfShop')

    this.categoryService.refresh.subscribe(() => {
      this.getCategories(shopType, nearestShopName)
    })
    this.getCategories(shopType, nearestShopName)

    
  }

  

  getCategories(type, name) {
    this.categoryService.getCategory(type, name).subscribe(data => {
      this.categories = data
      console.log(this.categories)
    })
  }

  onDelete(id) {
    this.categoryService.delete(id).subscribe()
  }

  onEdit(name, id) {
    this.editable = true
    this.inputEl.nativeElement.focus()
    this.categoryModel._id = id
    this.categoryModel.name = name
  }

  onUpdate() {
    this.categoryService.updateCategory(this.categoryModel).subscribe()
    this.editable = false
    this.categoryModel.name = ''
    this.categoryModel._id = 0
  }

  onCreateCategory(): void {
    this.categoryService.set(this.categoryModel.name).subscribe()
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      if(this.editable)
        this.onUpdate()
      if(!this.editable)
        this.onCreateCategory()
    }
  }
}

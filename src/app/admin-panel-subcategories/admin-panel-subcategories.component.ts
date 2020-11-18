import { Component, OnInit, DoCheck } from '@angular/core';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-panel-subcategories',
  templateUrl: './admin-panel-subcategories.component.html',
  styleUrls: ['./admin-panel-subcategories.component.css']
})
export class AdminPanelSubcategoriesComponent implements OnInit{
  public editable: boolean = false
  public index
  public category
  public subModel = {
    category: '',
    name: ''
  }
  subcategories = []
  categories = []


  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {

    let nearestShopName = localStorage.getItem('nearestShopName')
    let shopType = localStorage.getItem('typeOfShop')

    this.categoryService.refresh.subscribe(() => {
      this.getSubCategories(shopType, nearestShopName)
    })
    this.getSubCategories(shopType, nearestShopName)
  }
  getSubCategories(type, name) {
    this.categoryService.getCategory(type, name).subscribe(data => {
      this.categories = data
      for(let category of data){
        this.subcategories.push(...category.subcategories)
      }
    })
  }
  onCreateSub(): void {
      this.categoryService.setSubCategory(this.subModel.category, this.subModel.name).subscribe()
      this.subModel.name = ''
      this.subModel.category = ''
  }

  onDeleteSubCategory(subcat): void {
    let cat, index
    this.categories.forEach(category => {
      let _category = category.subcategories.find(o => o == subcat)
      if(_category) {
        this.index = category.subcategories.indexOf(subcat)
        category.subcategories.splice(index, 1)
        cat = category
      }
    })
    this.categoryService.updateCategory(cat).subscribe()
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      if(this.editable)
        this.onUpdate()
      if(!this.editable)
        this.onCreateSub()
    }
  }

  onEdit(subcategory) {
    this.editable = true
    this.subModel.name = subcategory
    this.categories.forEach(category => {
      let _category = category.subcategories.find(o => o == subcategory)
      if(_category) {
        this.index = category.subcategories.indexOf(subcategory)
        this.subModel.category = category._id
        this.category = category
      }
    })      
  }

  onUpdate() {
    this.category.subcategories[this.index] = this.subModel.name
    this.categoryService.updateCategory(this.category).subscribe()
    this.editable = false
    this.subModel.name = ''
    this.subModel.category = ''
  }

  selectorChange(categoryId) {
    this.subcategories = this.categories.find(o => o._id == categoryId).subcategories
  }

}
 
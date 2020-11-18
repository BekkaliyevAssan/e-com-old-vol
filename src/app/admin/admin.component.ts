import { Component, OnInit, DoCheck } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, DoCheck {
  option: string = "ORDERS"

  categories = []
  subcategories = []
  products = []
  orders = []
  orderProducts

  constructor(
    private prodcutService: ProductService,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  
  public categoryModel = {
    name: ''
  }

  public productModel = {
    name: '',
    image: '',
    subcategory:'',
    category: '',
    price: 0
  }

  public subModel = {
    category: '',
    name: ''
  }

  
  ngOnInit(): void {
    let manager = localStorage.getItem('manager')
    if(!manager) {
      this.router.navigate(['/login'])
    }
    
    // this.categoryService.getCategory().subscribe(data => {
    //   this.categories = data
    //   for(let category of data){
    //     this.subcategories.push(...category.subcategories)
    //   }
    // })

    this.prodcutService.GetList().subscribe(data => {
      this.products = data
    })

    // this.prodcutService.GetOrderList().subscribe(data => {
    //   this.orders = data
    //   console.log(data)      
    // })
  }

  ngDoCheck(): void {
    if(this.productModel.category !== ''){
      let category = this.categories.find(o => o.name == this.productModel.category)
      this.subcategories = category.subcategories 
    }
  }

  onCreate(): void {
    console.log(this.productModel)
    this.prodcutService.Create(this.productModel).subscribe()
  }

  selectOption(title) {
    this.option = title
    if(title == 'SUBCATEGORY'){
      for(let category of this.categories){
        this.subcategories.push(...category.subcategories)
      }
    }
  }

  onCreateCategory(): void {
    console.log(this.categoryModel)
    this.categoryService.set(this.categoryModel).subscribe(data => {
      console.log(data)
    })

    this.onUpdate()
  }

  onCreateSub(): void {
    console.log(this.subModel)
    let cat
    this.categories.forEach(category => {
      if(category.subcategories.find(subcategory => subcategory == this.subModel)){
        cat = category
      }
    })
    this.categoryService.setSubCategory(cat._id, this.subModel).subscribe(data => {
      console.log(data)
    })
  }

  onDeleteCategory(id): void {
    this.categoryService.delete(id).subscribe()

    this.ngOnInit()
  }

  onDeleteSubCategory(subcat): void {
    let cat
    this.categories.forEach(category => {
      if(category.subcategories.find(subcategory => subcategory == subcat)){
        cat = category
      }
    })
    this.categoryService.deleteSub(cat._id, subcat).subscribe()
  }

  onDeleteProduct(id): void {
    console.log(id)
    this.prodcutService.Delete(id).subscribe()
  }


  onUpdate(): void {
    this.router.navigate(['admin'])
  }
}

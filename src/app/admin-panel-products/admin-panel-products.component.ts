import { Component, OnInit, DoCheck } from '@angular/core';
import { ProductService } from '../product.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-admin-panel-products',
  templateUrl: './admin-panel-products.component.html',
  styleUrls: ['./admin-panel-products.component.css']
})
export class AdminPanelProductsComponent implements OnInit {
  orders = []
  editable: boolean = false
  subcategories = []
  categories = []
  public searchVal = ''
  searchRes = [] 
  public productModel = {
    name: '',
    image: '',
    subcategory: '',
    category: '',
    price: '',
    shopname: '',
    supplier: '',
    quantityOnShop: '',
    quantity: 1
  }

  constructor( private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productService.refresh.subscribe(() => {
      this.getProducts()
      this.onSearchChange(this.searchVal)
    })
    this.getProducts()

    let nearestShopName = localStorage.getItem('nearestShopName')
    let shopType = localStorage.getItem('typeOfShop')

    this.categoryService.getCategory(shopType, nearestShopName).subscribe(data => {
      this.categories = data
      for(let category of data){
        this.subcategories.push(...category.subcategories)
      }
    })
  }

  getProducts() {
    // this.productService.GetOrderList().subscribe(data => {
    //   this.orders = data
    // })
  }

  onBlur(): void {
    if(this.productModel.category !== ''){
      let category = this.categories.find(o => o.name == this.productModel.category)
      this.subcategories = category.subcategories 
      this.productModel.subcategory = ""
    }
  }

  onCreate(): void {
    let category = this.categories.find(o => o.name == this.productModel.category)
    this.productModel.category = category._id
    
    this.productService.Create(this.productModel).subscribe()
    this.productModel.category = ''
    this.productModel.name = ''
    this.productModel.subcategory = ''
    this.productModel.supplier = ''
    this.productModel.shopname = ''
    this.productModel.price = ''
    this.productModel.quantityOnShop = ''
    this.productModel.image = ''
  }

  onDeleteProduct(id): void {
    console.log(id)
    this.productService.Delete(id).subscribe()
  }

  onSearchChange(value) {
    this.searchVal = value
    let nearestShopName = localStorage.getItem('nearestShopName')
    let shopType = localStorage.getItem('typeOfShop')
    if(value !== null && value.length > 1) {
      this.productService.Search(value, shopType, nearestShopName).subscribe( data => {
        this.searchRes = data
      })
    }
    else if(value.length <= 1) {
      this.searchRes = []
    }
  }

  onEdit(id) {
    this.editable = true
    
    Object.defineProperty(this.productModel, "_id", 
    { value: id, writable : true, enumerable : true, configurable : true })  
    this.productService.GetById(id).subscribe(data => {
      this.productModel.category = this.categories.find(o => o._id == data.category).name
      this.onBlur()
      this.productModel.subcategory = data.subcategory
      this.productModel.name = data.name
      this.productModel.supplier = data.supplier
      this.productModel.shopname = data.shopname
      this.productModel.price = data.price.toString()
      this.productModel.quantityOnShop = data.quantityOnShop.toString()
      this.productModel.image = data.image
    })
  }

  onUpdate() {
    let category = this.categories.find(o => o.name == this.productModel.category)
    this.productModel.category = category._id

    this.productService.Update(this.productModel).subscribe()
    this.productModel.category = ''
    this.productModel.name = ''
    this.productModel.subcategory = ''
    this.productModel.supplier = ''
    this.productModel.shopname = ''
    this.productModel.price = ''
    this.productModel.quantityOnShop = ''
    this.productModel.image = ''

    this.editable = false
  }

  onDelete(id) {
    this.productService.Delete(id).subscribe()
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      if(this.editable)
        this.onUpdate()
      if(!this.editable)
        this.onCreate()
    }
  }

}
 
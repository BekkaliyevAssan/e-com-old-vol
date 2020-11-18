import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { api_url, root_url } from '../../assets/data/env'
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  // @Input() product
  @Input() type: string
  private _data
  cart
  constructor(private _productService: ProductService) { }
  public existingCart = []

  // @Input() seeAll: boolean = false
  // @Input() cart: boolean = false

  // @Input() productArray

  // public added: boolean = false

  // public cat
  public innerWidth: any
  public mobile: boolean = false
  // public selectedProduct
  // public products = []

  public url = root_url


  ngOnInit(): void {
    // this.cat = localStorage.getItem('typeOfShop') || ''
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 900) this.mobile = true

    let cart = JSON.parse(localStorage.getItem('product')) || []
    this.cart = cart
    cart.forEach(item => {
      this.existingCart.push(item._id)
    })
  }

  get product() {
    if(this._data.type == null) this._data.type = ''
    return this._data  
  }
  @Input()
  set product(value) { //setter: interceptor for input value
    // this.cart = this._productService.data
    this.cart = JSON.parse(localStorage.getItem('product')) || [] //get array of products from cart(localStorage)
    if(this.cart.some(_product => _product._id == value._id)) { //check: if "value" is already in cart. If so, change value of qnt to the identical as its in cart
    let temp = this.cart.find(o => o._id == value._id)
    value.quantity = temp.quantity
  }
  // this.data = value//import all data
  this._data = value //hz

  }  

  addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('product')) || []
    this.existingCart.push(product._id)
    if(!cart.some(_product => _product._id == product._id)) {
      this._productService.setData(product)
    }
  }
  onDelete(product) {
    let i = this.existingCart.findIndex(o => o == product._id)
    this.existingCart.splice(i, 1)
    this._productService.deleteFromCart(product)
  }
  onAdd(product) {
    this._productService.incrementQnt(product)
  }
  onSubstract(product) {
    this._productService.decrementQnt(product)
  }


  // ngAfterContentChecked() {
  //   let products = JSON.parse(localStorage.getItem("product") || "[]")
  //   this.products = products.map(item => {
  //     return (item._id)
  //   })
  // }

  // containsObject(obj, list) {
  //   var i;
  //   for (i = 0; i < list.length; i++) {
  //     if (list[i] === obj) {
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  // addItem(data) {
  //   let products = JSON.parse(localStorage.getItem("product") || "[]")
  //   if (this.containsObject(data._id, this.products)) {
  //     console.log('includes')
  //     //for future features  
  //   }
  //   else {
  //     console.log('nah')
  //     if (products.find(o => o._id == data._id)) {
  //       let i = products.findIndex(o => o._id == data._id)
  //       products[i].quantity += 1
  //       products[i].totalPrice = products[i].price * products[i].quantity
  //     } else {
  //       data.totalPrice = data.price
  //       products.push(data)
  //     }
  //     localStorage.setItem("product", JSON.stringify(products))
  //     this.products = products.map(item => {
  //       return (item._id)
  //     })
  //   }
    
  // }

  // deleteItem(product_id) {
  //   let products = JSON.parse(localStorage.getItem("product") || "[]")
  //   for (var i = 0; i < products.length; i++) {
  //     let items = products[i];
  //     if (items._id == product_id) {
  //       products.splice(i, 1);
  //       break
  //     }
  //   }
  //   products = JSON.stringify(products);
  //   localStorage.setItem("product", products);

  // }

  // onAdd(): void {
  //   let products = JSON.parse(localStorage.getItem("product") || "[]")
  //   let i = products.findIndex(o => o._id == this.product._id)
  //   products[i].quantity += 1
  //   products[i].totalPrice = products[i].price * products[i].quantity

  //   localStorage.setItem("product", JSON.stringify(products))
  // }

  // decreaseCounter() {
  //   let products = JSON.parse(localStorage.getItem("product") || "[]")
  //   let i = products.findIndex(o => o._id == this.product._id)
  //   if (this.product.quantity > 1) {
  //     products[i].quantity -= 1
  //     products[i].totalPrice = products[i].price * products[i].quantity

  //     localStorage.setItem("product", JSON.stringify(products))
  //   }
  // }

  // showMessage(info) {
  //   this.status = info
  // }


  // updateUrl() {
  //   this.src = this.default;
  // }
}

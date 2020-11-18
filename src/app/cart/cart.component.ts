import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';
import { UserService } from '../user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // public products = []
  public finalPrice: number = 0
  public innerWidth: any
  public mobile: boolean = false
  // public cat

  public productsAmount

  constructor(private _productService: ProductService, private _location: Location, private userService: UserService) {
    this._productService.totalSum$.subscribe(data => {
      this.finalPrice = data
    })

    this._productService.cart$.subscribe(data => {
      this.productsAmount = data
    })
  }
  backClicked() {
    this._location.back();
  }
  
  ngOnInit(): void {

    let data = JSON.parse(localStorage.getItem('product'))
    if(data != undefined)
      this.productsAmount = data.length
    else this.productsAmount = 0
    
    this.finalPrice = JSON.parse(localStorage.getItem('totalPrice'))
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 900) this.mobile = true 
  }

  get cat() {
    return this.userService.shopType
  }

  get lang() {
    return this.userService.lang
  }

  get products() { //getter allows quickly updata changed data that comes from service
    return this._productService.getData()
  }
}

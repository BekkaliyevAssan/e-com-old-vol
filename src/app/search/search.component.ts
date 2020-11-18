import { Component, OnInit, ViewChildren, HostListener } from '@angular/core';
import { ProductService } from '../product.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { trigger } from '@angular/animations';
import { Product } from '../../assets/interfaces/products'

import { fadeIn } from '../router-animatins';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class SearchComponent implements OnInit {
  focused: boolean = false
  constructor(private productService: ProductService, private userService: UserService, private _productService: ProductService,
              private router: Router) { 
    this._productService.cart$.subscribe(data => {
      this.badge = data
    })
  }
  public innerWidth: any
  public innerHeight: any
  public initialInnerHeight: any
  public searchVal = ''
  public prevSearchVal = ''
  public mobile: boolean = false
  public badge
  public suggestion = []
  // public cat
  // public nearestShop

  public popularQueries = []
  
  get cat() {
    return this.userService.shopType
  }
  get lang() {
    return this.userService.lang
  }

  public nearestShopName
  public nearestShopPhone
  ngAfterContentChecked() {
    // this.badge = JSON.parse(localStorage.getItem('product') || "[]")

    if(this.mobile && this.initialInnerHeight - 150 > this.innerHeight) {
      this.focused = true
      // console.log('now its less than it was')
    }
    else if(this.mobile && this.initialInnerHeight - 150 <= this.innerHeight) {
      this.focused = false
    }
  }
  

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerHeight = window.innerHeight;  
  console.log(this.innerHeight)
}
  

  searchRes = [] 
  
  @ViewChildren('input') vc;
  ngAfterViewInit() {
    if(!this.mobile)
    this.vc.first.nativeElement.focus()}
  
  ngOnInit(): void {    
    let data = JSON.parse(localStorage.getItem('product'))
    if(data != undefined)
      this.badge = data.length
    else this.badge = 0
    
    this.initialInnerHeight = window.innerHeight;
    // this.nearestShop = JSON.parse(localStorage.getItem('nearestShop') || '')
    this.nearestShopName = localStorage.getItem('nearestShopName')
    this.nearestShopPhone = localStorage.getItem('nearestShopPhone')

    // this.cat = localStorage.getItem('typeOfShop') || ''
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 900) this.mobile = true

    setInterval(() => {
      if(this.prevSearchVal !== this.searchVal && this.searchVal !== null && this.searchVal.length > 2) {
        this.productService.Search(this.searchVal, this.cat, this.nearestShopName).subscribe( data => {
            console.log(data)
            this.subcategoryList = data.subcategories
            this.supcategoryList = data.supcategories
            if(this.mobile) {
              this.searchRes = data.products
            } else {
              this.searchRes = data.products.splice(0, 4)
            }
            
            this.prevSearchVal = this.searchVal
            // this.searchRes = data.filter(item => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1) 
        })
      }
    }, 2000)

    this.productService.GetPopularProducts(this.cat, this.nearestShopName).subscribe(data => {
      this.popularQueries = data.subcategories
      this.suggestion = data.products
      this.isPopularLoaded = true
    })
  }
  public isPopularLoaded: boolean = false

  public subcategoryList = []
  public supcategoryList = []
  public productList = []

  toggleSidebar() {
    this.userService.toggleSidebarVisibility()
}

  // onFocus() {
  //   this.focused = true
  // }

  // onBlur() {
  //   setTimeout(() => {
  //     this.focused = false
  //   }, 200)
  // }
  
  // async onSearchChange(value) {
  //   this.searchVal = value
    
  //   if(value.length <= 1) {
  //     this.searchRes = []
  //     this.subcategoryList = []
  //     this.supcategoryList = []
  //   }
  // }

//   hideKeyboard(element) {
//     element.attr('readonly', 'readonly'); // Force keyboard to hide on input field.
//     element.attr('disabled', 'true'); // Force keyboard to hide on textarea field.
//     setTimeout(function() {
//         element.blur();  //actually close the keyboard
//         // Remove readonly attribute after keyboard is hidden.
//         element.removeAttr('readonly');
//         element.removeAttr('disabled');
//     }, 100);
// }

onNavigate(name, category) {
  this.router.navigate(['category/see-all/', category, name])
}
onNavigateSup(supcategory, subcategory, category) {
  this.router.navigate(['category/see-all/', category, subcategory])
  this.userService.setSupcategory(supcategory)

}
}

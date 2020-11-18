import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ProductService } from '../product.service';
import { trigger } from '@angular/animations';
import { fadeIn } from '../router-animatins'
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class HomeComponent implements OnInit {
  // public cat

  public dataLoaded: boolean = false
  public innerWidth: any
  public mobile: boolean = false
  public products = []
  public recentlyOrdered = []
  public nearestShopName = localStorage.getItem('nearestShopName')
  // public subcategories = [
  //   'Приправы/Соусы',
  //   'Шоколад',
  //   'Вода ',
  //   'Негазированые Напитки ',
  //   'Натуральный сок'
  // ]

  public cardsMagaz = [
    {"img": "./assets/img/1.png", "text": "1. Выберите магазин и соберите корзину на сайте"},
    {"img": "./assets/img/2.png", "text": "2. Сотрудник соберет заказ и передаст курьеру"},
    {"img": "./assets/img/3.png", "text": "3. Курьер доставит  вам товар, оплата наличными или картой"}
  ]
  public cardsPharm = [
    {"img": "./assets/img/11.png", "text": "1. Выберите магазин и соберите корзину на сайте"},
    {"img": "./assets/img/22.png", "text": "2. Сотрудник соберет заказ и передаст курьеру"},
    {"img": "./assets/img/3.png", "text": "3. Курьер доставит  вам товар, оплата наличными или картой"}
  ]
  categories = []

  constructor(private productService: ProductService, private router: Router, private userService: UserService, private categoryService: CategoryService) {
    if (userService.shopType == null) {
      this.userService.isSidebarVisible = false
      setTimeout(() => {
        this.userService.isSidebarVisible = true
      }, 1500)
    }

    let localCategory = localStorage.getItem('tempCat') || null
    if (localCategory == null) {
      let nearestShopName = localStorage.getItem('nearestShopName')
      let shopType = localStorage.getItem('typeOfShop')
      
      this.categoryService.getCategory(shopType, nearestShopName)
        .subscribe(data => {
          localStorage.setItem('tempCat', JSON.stringify(data))
        })
    }
   }

  // ngAfterViewChecked() {
    // window.scrollTo(0, 0);
    // }
  
    get cat() {
      return this.userService.shopType
    }

    get lang() {
      return this.userService.lang
    }

  ngOnInit(): void {
    // this.cat = localStorage.getItem('typeOfShop') || ''

    let recentlyOrdered = JSON.parse(localStorage.getItem('recentlyOrdered')) || []
    if (recentlyOrdered.length >= 4) {
      this.recentlyOrdered = recentlyOrdered.slice(Math.max(recentlyOrdered.length - 4, 1))
    }
    else {
      this.recentlyOrdered = recentlyOrdered
    }
    // console.log(this.recentlyOrdered)
    
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 900) this.mobile = true

    setTimeout(() => {
            this.dataLoaded = true
          }, 0)
    
        window.scrollTo(0, 0);
    // this.subcategories.forEach(subcat => {
    //   this.productService.GetBySubcat(subcat).subscribe(data => {
    //     if(this.mobile)
    //     this.products.push(...data.slice(0, 5))
    //     if(!this.mobile)
    //     {
    //       this.products.push(...data.slice(0, 5))
    //     }
    //     this.categories.push(data[0].category)
        
    //     setTimeout(() => {
    //       this.dataLoaded = true
    //     }, 300)
    //   })
      
    // });
    // let name = localStorage.getItem('nearestShopName')
    // let type = localStorage.getItem('typeOfShop')
    
    // console.log(this.nearestShopName, this.cat)
  }

  // ngAfterContentChecked() {
  //   this.nearestShopName = localStorage.getItem('nearestShopName')
  // }
  // ngAfterContentChecked() {
  //   this.cat = localStorage.getItem('typeOfShop') || ''  
  // }

  toggleSidebar() {
    this.userService.toggleSidebarVisibility()
  }

  redirect() {
    window.location.href = 'https://www.instagram.com/sluzhba_dostavki_nazel/'
  }
}

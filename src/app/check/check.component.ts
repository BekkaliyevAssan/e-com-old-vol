import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.css']
})
export class CheckComponent implements OnInit {
  focused: boolean = false
  trigger: boolean = false
  full: boolean = false
  public finalPrice: number

  public cat

  constructor(private productService: ProductService, private router: Router, private userService: UserService) { 
    this.productService.totalSum$.subscribe(data => {
      this.finalPrice = data

    })
  }
  public innerWidth: any
  public innerHeight: any
  public initialInnerHeight: any
  public mobile: boolean = false
  public deliveryType = 'delivery'

  isListToggled:boolean = false

  public checkInfo = {
    address: '',
    name: '',
    phone: '',
    products: [],
    saveMe: true,
    total: 0,
    apartment: '',
    floor: '',
    doorCode: '',
    comments: '',
    delivery: 0,
    orderTime: '',
    orderDate: '',
    type: '',
    shopName: '',
    deliveryType: 'delivery'
  }

  mask:any[] = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  ngAfterContentChecked() {
    if(this.mobile && this.initialInnerHeight - 150 > this.innerHeight) {
      this.focused = true
      // console.log('now its less than it was')
    }
    else if(this.mobile && this.initialInnerHeight - 150 <= this.innerHeight) {
      this.focused = false
    }
  }

  @ViewChild('content') elementView: ElementRef;

  contentHeight: number;
  
  ngAfterViewInit() {
    console.log('onResize')
      if(!this.mobile)
        this.contentHeight = this.elementView.nativeElement.offsetHeight;
      ///////////////////////need to fix
  }
  

  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.innerHeight = window.innerHeight;  
}
  currentShop
  // public products = []
  ngOnInit(): void {
    let products = JSON.parse(localStorage.getItem('product')) || []
    if(products.length == 0) {
      this.router.navigate(['/cart'])
    }
    
    this.currentShop = JSON.parse(localStorage.getItem('nearestShop'))
    this.finalPrice = JSON.parse(localStorage.getItem('totalPrice'))
    
    this.initialInnerHeight = window.innerHeight;
    this.cat = localStorage.getItem('typeOfShop') || ''
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 900) this.mobile = true
    

    
    if(localStorage.getItem('name') != null) {

      this.checkInfo.name = localStorage.getItem('name')
      this.checkInfo.phone = localStorage.getItem('phone') || ''
      this.checkInfo.address = localStorage.getItem('address') || '' 
      this.checkInfo.floor = localStorage.getItem('floor') || ''
      this.checkInfo.doorCode = localStorage.getItem('doorCode') || ''
      this.checkInfo.apartment = localStorage.getItem('apartment') || ''
      
    }

    if(
      this.checkInfo.address != '' &&
      this.checkInfo.name != '' &&
      this.checkInfo.phone != '' &&
      this.deliveryType != ''
      ) this.full = true
    else this.full = false

    // this.checkInfo.products = JSON.parse(localStorage.getItem('product') || "[]")
    // this.products = JSON.parse(localStorage.getItem('product') || "[]")
    // for (let product of this.products) {
    //   this.checkInfo.total += parseInt(product.totalPrice)
    // }
    
  }

  get products() { //getter allows quickly updata changed data that comes from service
    return this.productService.getData()
  }
  
  get lang() {
    return this.userService.lang
  }

  onSend(): void {
    let nearestShop = JSON.parse(localStorage.getItem('nearestShop'))
    this.checkInfo.products = this.products
    this.checkInfo.type = nearestShop.type
    this.checkInfo.shopName = nearestShop.name
    this.checkInfo.orderTime = new Date().toLocaleTimeString()
    this.checkInfo.orderDate = new Date().toLocaleDateString();
    this.checkInfo.total = this.finalPrice
    
    if(this.finalPrice < 10000) this.checkInfo.delivery = 300
    //price for delivery
    if (
      this.checkInfo.address !== '' &&
      this.checkInfo.name !== '' &&
      this.phonenumber(this.checkInfo.phone) &&
      this.checkInfo.deliveryType !== ''
    ) {
      this.productService.OrderProducts(this.checkInfo).subscribe()
      this.router.navigate(['cart', 'last'])  
      let recentlyOrdered = localStorage.getItem('product')
      localStorage.setItem('recentlyOrdered', recentlyOrdered)    
      localStorage.removeItem('product')
      localStorage.removeItem('totalPrice')
      
      this.productService.makeOrder()
    }
    else {
      this.full = false
    }
    
    if(this.checkInfo.saveMe == true) {
      localStorage.setItem('address', this.checkInfo.address)
      localStorage.setItem('name', this.checkInfo.name)
      localStorage.setItem('phone', this.checkInfo.phone)
      localStorage.setItem('apartment', this.checkInfo.apartment)
      localStorage.setItem('doorCode', this.checkInfo.doorCode)
      localStorage.setItem('floor', this.checkInfo.floor)
    }
    else localStorage.clear()



    // console.log(this.checkInfo)
    this.productService.makeOrder()
  }

  onFocus() {
    // this.focused = true
    this.trigger = true
  }

  onBlur() {
    // setTimeout(() => {
    //   if (this.trigger)
    //     clearTimeout()
    //   else
    //     // this.focused = false
    // }, 200)
    this.trigger = false

    if (
      this.checkInfo.address !== '' &&
      this.phonenumber(this.checkInfo.phone) &&
      this.checkInfo.name !== ''
    ) {
      this.full = true
    }
    else this.full = false
  }


  phonenumber(inputtxt) {
    let phoneno = /^(\+7|7|8)?[\s\-]?\(?[789][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm;
    if (inputtxt.match(phoneno)) {
      return true;
    }
    else {
      return false;
    }
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.onSend()
    }
  }


  // ngDoCheck() {
  //   this.finalPrice = 0
  //   for (let product of this.products){
  //     this.finalPrice += parseInt(product.totalPrice)
  //   }  
  // }

  onDeliveryTypeSelect(type) {
    // if(this.deliveryType == type) {
    //   this.deliveryType = ''
    //   this.checkInfo.deliveryType = ''
    // }
    // else {
      this.deliveryType = type
      this.checkInfo.deliveryType = type
    // }
  }
  
  scrollTo(direction) {
    if(direction == "top")
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 300)
    else 
      setTimeout(() => {
        window.scrollTo(0, innerHeight)
      }, 300)
  }
}

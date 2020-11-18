import { Component, OnInit, OnChanges, SimpleChanges, AfterContentChecked } from '@angular/core';
import { Router } from '@angular/router';
import { GeolocationService } from '../geolocation.service';
import { UserService } from '../user.service';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-prehome',
  templateUrl: './prehome.component.html',
  styleUrls: ['./prehome.component.css']
})
export class PrehomeComponent implements OnInit {
  public username
  public lat
  public lon
  public dist

  public isPharm: boolean = false

  public shopsByType = []

  public selectNearestManually
  shopNameExists: boolean
  // asideVisible: boolean;

    constructor(private userService: UserService, private geolocation: GeolocationService, private router: Router, 
                private categoryService: CategoryService) {
        // this.asideVisible = userService.isSidebarVisible;
        this.userService.shopType = localStorage.getItem('typeOfShop')
    }
    // public isBackdropToggled: boolean = false
    
    darkBackground: boolean = false
    get isSidebarVisible(): boolean { 
      if(this.lang == 'rus')
      this.username = localStorage.getItem('name') || 'Пользователь'
      else this.username = localStorage.getItem('name') || 'Пайдаланушы'
      if(this.userService.isSidebarVisible) {
        setTimeout(() => {
          this.darkBackground = true
        }, 400)
        return true
      }
      else {
        this.darkBackground = false
        return false
      }
  }

  onCloseSidebar() {
    this.userService.isSidebarVisible = false
  }

  public innerWidth: any
  public innerHeight: any
  public mobile: boolean = false

  get cat() {
    return this.userService.shopType
  }

  get lang() {
    return this.userService.lang
  }

  ngOnInit(): void {
    
    this.innerWidth = window.innerWidth;
    this.innerHeight = window.innerHeight + 70
    if (this.innerWidth < 900) this.mobile = true
    console.log(this.username)
    // this.cat = localStorage.getItem('typeOfShop')

    // if (!navigator.geolocation) {
    //   console.log('location is not supported')
    // }
    // let typeOfShop = localStorage.getItem('typeOfShop')
    // if(this.mobile) {

    //   this.geolocation.selectShop().subscribe(data => {
    //     this.shopsByType = data.filter(o => o.type == typeOfShop)
    //   })
    // }


  }
  
  // ngAfterContentChecked() {
  //   this.selectNearestManually = localStorage.getItem('hello') || 'false'
  // }

  selectShopCat(cat) {
    // if(this.mobile)
    // {
    
    //   this.geolocation.selectShop().subscribe(data => {
    //     this.shopsByType = data.filter(o => o.type == cat)
    //   })
      
    // navigator.geolocation.getCurrentPosition((position) => {
      // this.lat = position.coords.latitude
      // this.lon = position.coords.longitude
    //   this.lat = 51.251413
    //   this.lon = 51.443051
    //   console.log(
    //     `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
    //   )
    //   this.selectNearestShop(cat)
    //   this.router.navigate(['home'])
    //   localStorage.setItem('hello', 'false')
    // },
    //   function (error) {
    //     if (error.code == error.PERMISSION_DENIED) {
    //       // console.log("you denied me :-(");
    //       localStorage.setItem('hello', 'true')
    //     }
    //   })
    // }
    // else {
    //   localStorage.setItem('hello', 'true')
    //   this.geolocation.selectShop().subscribe(data => {
    //     this.shopsByType = data.filter(o => o.type == cat)
    //   })
    // }
    // localStorage.setItem('typeOfShop', cat)

    // if(this.selectNearestManually == 'true') {
    //   this.geolocation.selectShop().subscribe(data => {
    //     this.shopsByType = data.filter(o => o.type == cat)
    //   })
    // }
  }

  // public shortestDistance = 9999
  // selectNearestShop(cat) {
  //   let tempShop
  //   this.geolocation.selectShop().subscribe(data => {
  //     tempShop = data.filter(o => o.type == cat)
  //     tempShop.forEach(shop => {
  //       let distanceCounter = this.distance(this.lat, this.lon, shop.lat, shop.lon, 'K')
  //       let index
  //       if (distanceCounter < this.shortestDistance) {
  //         this.shortestDistance = distanceCounter
  //         index = tempShop.indexOf(shop)
  //         localStorage.setItem('nearestShop', JSON.stringify(tempShop[index]))
  //         localStorage.setItem('nearestShopName', tempShop[index].name)
  //         localStorage.setItem('nearestShopPhone', tempShop[index].phone)

  //       }
  //       localStorage.setItem('distanceToNearestShop', JSON.stringify(this.shortestDistance))
  //     })
  //   })
  // }

  // onShopSelect(shop) {
  //   console.log(shop)
  //   localStorage.setItem('nearestShop', JSON.stringify(shop))
  //   localStorage.setItem('nearestShopName', shop.name)
  //   localStorage.setItem('nearestShopPhone', shop.phone)
  //   this.router.navigate(['home'])
  // }

  // distance(lat1, lon1, lat2, lon2, unit) {
  //   if ((lat1 == lat2) && (lon1 == lon2)) {
  //     return 0;
  //   }
  //   else {
  //     var radlat1 = Math.PI * lat1 / 180;
  //     var radlat2 = Math.PI * lat2 / 180;
  //     var theta = lon1 - lon2;
  //     var radtheta = Math.PI * theta / 180;
  //     var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  //     if (dist > 1) {
  //       dist = 1;
  //     }
  //     dist = Math.acos(dist);
  //     dist = dist * 180 / Math.PI;
  //     dist = dist * 60 * 1.1515;
  //     if (unit == "K") { dist = dist * 1.609344 }
  //     if (unit == "N") { dist = dist * 0.8684 }
  //     return dist;
  //   }
  // }

  selected = false
  selectedShop
  onSelect(shop) {
    if(shop == 'magaz') this.isPharm = false
    else this.isPharm = true

    this.selected = true
    this.selectedShop = shop
    localStorage.setItem('typeOfShop', shop)
    this.geolocation.selectShop().subscribe(data => {
      this.shopsByType = data.filter(o => o.type == shop)
    })
  }

  onSelectShop(shop) {

    if(shop.name != 'ул. Сырыма Датова, 6а') { 
      localStorage.setItem('nearestShop', JSON.stringify(shop))
      localStorage.setItem('nearestShopName', shop.name)
      localStorage.setItem('nearestShopPhone', shop.phone)
      this.userService.toggleSidebarVisibility()
      this.selected = false
      this.userService.setShopType(shop.type)
      this.router.navigate(['/home'])

      this.categoryService.getCategory(this.cat, shop.name).subscribe(data => {
        localStorage.setItem('tempCat', JSON.stringify(data))
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { GeolocationService } from 'src/app/geolocation.service';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-desk-navbar',
  templateUrl: './desk-navbar.component.html',
  styleUrls: ['./desk-navbar.component.css']
})
export class DeskNavbarComponent implements OnInit {
  public badge
  public cat
  // public nearestShop
  public nearestShopName
  public nearestShopPhone


  public username
  public lat
  public lon
  public dist
  
  constructor( private userService: UserService,private router: Router, private geolocation: GeolocationService, private _productService: ProductService) { 
    this._productService.cart$.subscribe(data => {
      this.badge = data
    })
  }

  get isSidebarVisible(): boolean {
    return this.userService.isSidebarVisible;
  }

  get lang() {
    return this.userService.lang
  }

  toggleSidebar() {
    this.userService.toggleSidebarVisibility()
}

  ngOnInit(): void {
    
    let data = JSON.parse(localStorage.getItem('product'))
    if(data != undefined)
      this.badge = data.length
    else this.badge = 0
    console.log(this.badge, 'badge')

    this.username = localStorage.getItem('name') || 'Пользователь'

    // if (!navigator.geolocation) {
    //   console.log('location is not supported')
    // }
    // navigator.geolocation.getCurrentPosition((position) => {
    //   this.lat = position.coords.latitude
    //   this.lon = position.coords.longitude
    //   console.log(
    //     `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
    //     )
    // })
    
    

  }

  // def = {"type": "pharm", "phone": "+7(771)217‒52‒91", "name": "ул. Сырыма Датова, 6а", "lat": 51.232125, "lon": 51.437309}

  
  ngAfterContentChecked() {
    this.cat = localStorage.getItem('typeOfShop') || 'magaz'  
    // this.nearestShop = (localStorage.getItem('nearestShop') || this.def)
    this.nearestShopName = localStorage.getItem('nearestShopName')
    this.nearestShopPhone = localStorage.getItem('nearestShopPhone')
    //deleted JSON.parse hz

    // this.badge = JSON.parse(localStorage.getItem('product') || "[]")
  }
  
  
  
  // selectShop(cat) {
  //   localStorage.setItem('typeOfShop', cat)
  //   this.shortestDistance = 9999
  //   this.selectNearestShop(cat)
  // }

  public shortestDistance
  selectNearestShop(cat) {
    let tempShop 
    this.geolocation.selectShop().subscribe(data => {
      tempShop = data.filter(o => o.type == cat)
      tempShop.forEach(shop => {
        let distanceCounter = this.distance(this.lat, this.lon, shop.lat, shop.lon, 'K')
        let index
        if (distanceCounter < this.shortestDistance) 
        {
          this.shortestDistance = distanceCounter
          index = tempShop.indexOf(shop)         
          // console.log(tempShop[index])
          localStorage.setItem('nearestShop', JSON.stringify(tempShop[index]))
        }
        // this.shortestDistance = 9999
        localStorage.setItem('distanceToNearestShop', JSON.stringify(this.shortestDistance))
        // console.log(tempShop.indexOf(shop))
        // console.log(tempShop[index])
      })
    })
  }

  distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit=="K") { dist = dist * 1.609344 }
      if (unit=="N") { dist = dist * 0.8684 }
      return dist;
    }
  }

}

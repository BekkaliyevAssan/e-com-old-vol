import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterContentChecked {
  @Input() inner: boolean = false
  @Input() home: boolean = false

  public nearestShopPhone
  public nsn
  public selectToggle: boolean = false
  public cat
  constructor(private location: Location) { }
    // cities = [
    //   "Алматы", "Уральск", "Астана", "Кокшетау"
    // ]

  // public selectedCity = this.cities[0]


  ngAfterContentChecked() {
    this.cat = localStorage.getItem('typeOfShop') || 'magaz'
    // this.nsn = localStorage.getItem('nearestShopName') || 'hello argun'
    this.nearestShopPhone = localStorage.getItem('nearestShopPhone')
  }
   
  back() {
    this.location.back()
  }

  // selectCity(city) {
  //   this.selectedCity = city
  // }

}

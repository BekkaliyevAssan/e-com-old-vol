import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.css']
})
export class AdminSidebarComponent implements OnInit {
  constructor() { }
  public shopType
  public shopName
  
  ngOnInit(): void {
    let adminShop = JSON.parse(localStorage.getItem('adminShop'))
    if(adminShop.type == 'pharm') {
      this.shopType = "Аптека"
    }  else { this.shopType = "Мини-маркет" }
    this.shopName = adminShop.name
    console.log(this.shopType, this.shopName)
  }

}

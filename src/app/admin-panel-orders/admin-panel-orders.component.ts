import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-admin-panel-orders',
  templateUrl: './admin-panel-orders.component.html',
  styleUrls: ['./admin-panel-orders.component.css']
})
export class AdminPanelOrdersComponent implements OnInit {
  orders = []
  statuses = []
  statusItems

  public adminShop // to get from localStorage
  
  public status
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.refresh.subscribe(() => {
      this.getOrders()
    })
    this.getOrders()
    setInterval(() => {
      this.getOrders()
    }, 30000)
    // set 1 sec interval
    // this.statusItems()

    
    console.log(this.adminShop.name, 'admin panel')
  }
  getOrders() {
    this.adminShop = JSON.parse(localStorage.getItem('adminShop'))
    this.productService.GetOrderList(this.adminShop.name, this.adminShop.type).subscribe(data => {
      this.orders = data.reverse()
      console.log(this.orders)
    })
  }

  // countStatus() {
  //   this.productService.GetOrderList().subscribe(data => {
  //   data.forEach(order => {
  //     this.statuses.push(order.status)
      
  //     var counts = {};
  //     this.statuses.forEach(function(x) { counts[x] = (counts[x] || 0)+1; });
  //     this.statusItems = counts
  //     console.log(this.statusItems)
  //   })
  // })
  // }
  onChangeStatus(status, orderId) {
    this.status = status
    this.productService.ChangeStatus(status, orderId).subscribe()
    // this.getOrders()  
  }

}

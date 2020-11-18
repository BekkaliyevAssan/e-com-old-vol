import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../product.service';
import { trigger } from '@angular/animations';
import { fadeIn } from '../router-animatins'

@Component({
  selector: 'app-mobile-search-seeall',
  templateUrl: './mobile-search-seeall.component.html',
  styleUrls: ['./mobile-search-seeall.component.css'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class MobileSearchSeeallComponent implements OnInit {
  public isFiltrating: boolean = false
  public innerWidth: any
  public mobile: boolean
  public dataLoaded: boolean = false
  constructor(private route: ActivatedRoute,
              private productService: ProductService) { 
                this.val = this.route.snapshot.paramMap.get('val')
              }
  public val
  public prodList = []
  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 900) this.mobile = true
    
    let shopName = localStorage.getItem('nearestShopName')
    let shopType = localStorage.getItem('typeOfShop')
    this.productService.SearchForReal(this.val, shopType, shopName).subscribe(data => {
      this.prodList = data
      this.totalRecords = data.length
      this.dataLoaded = true
    })
  }

  pageChanged(value) {
    window.scrollTo(0, 0)
  }
  public totalRecords
  page = 1  
}

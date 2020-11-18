import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { trigger } from '@angular/animations';
import { fadeIn } from '../router-animatins'
import { fromEvent } from 'rxjs';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class CategoryDetailsComponent implements OnInit {
  public title
  public dataLoaded: boolean = false
  public innerWidth: any
  public mobile: boolean = false
  public products = []
  public cat
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  public id = this.route.snapshot.paramMap.get('id')
  public path
  ngOnInit(): void {
    this.cat = localStorage.getItem('typeOfShop') || ''
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 900) this.mobile = true

    this.title = this.productService.category
    // this.title = sessionStorage.getItem('tempSub')
    //quick data load from service

    let nearestShopName = localStorage.getItem('nearestShopName')
    this.categoryService.getCategory(this.cat, nearestShopName)
      .subscribe(data => {
        this.title = data.find(o => o._id == this.id)
        // console.log(this.title)
        // setTimeout(() => {
        //   this.dataLoaded = true
        // }, 0)
      })

    // this.productService.GetByCategory(this.id).subscribe(data => {
    //     this.products = data
    //     console.log(data)
    // })

  }

  onNavigate(id, subcat): void {
    // console.log(encodeURI(subcat))
    this.router.navigate(['/category/see-all/', id, encodeURI(subcat)])
    console.log(id, subcat)
  }
  
}

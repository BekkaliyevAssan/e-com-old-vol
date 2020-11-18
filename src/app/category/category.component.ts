import { Component, OnInit, setTestabilityGetter } from '@angular/core';
import { CategoryService } from '../category.service';
import { trigger } from '@angular/animations';
import { fadeIn } from '../router-animatins'
import { Router } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
})
export class CategoryComponent implements OnInit {
  public innerWidth: any
  public mobile: boolean = false

  public cat
  //filter categories
  public selectedCategoryDesk
  public selectedCategory

  public categories = []
  public dataLoaded: boolean = true
  constructor(private categoryService: CategoryService,
    private router: Router,
    private productService: ProductService) {
    let localCategory = localStorage.getItem('tempCat') || null
    if (localCategory == null) {
      
      
      
    }
  }
  ngOnInit(): void {
    let nearestShopName = localStorage.getItem('nearestShopName')
      let shopType = localStorage.getItem('typeOfShop')

    this.categoryService.getCategory(shopType, nearestShopName)
    .subscribe(data => {
      localStorage.setItem('tempCat', JSON.stringify(data))
      this.categories = data
      this.selectedCategoryDesk = data[0]
    })

    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 900) this.mobile = true

    // let nearestShopName', shop.name)
    // localStorage.setItem('nearestShopPhone    



    // this.categories = JSON.parse(localStorage.getItem('tempCat'))
    // this.selectedCategoryDesk = JSON.parse(localStorage.getItem('tempCat'))[0]


  }

  onNavigate(id, subcat): void {
    // console.log(encodeURI(subcat))
    this.router.navigate(['/category/see-all/', id, encodeURI(subcat)])
    console.log(id, subcat)
  }
  public newTab: boolean = false
  onSelect(name) {
    if (this.mobile) {
      this.productService.sendCategoryToChild(name)
      this.router.navigate(['category', name._id])
      // this.newTab = true
      // console.log(name.subcategories)
      // this.selectedCategory = name
    }
    else {
      this.selectedCategoryDesk = name
      window.scrollTo(0, 0);
    }
  }

  // ngAfterContentChecked() {
  //   this.cat = localStorage.getItem('typeOfShop') || ''  
  // }

}

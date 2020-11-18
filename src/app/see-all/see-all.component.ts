import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';
import { trigger } from '@angular/animations';
import { fadeIn } from '../router-animatins'
import { UserService } from '../user.service';


@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.css'],
  animations: [
    trigger('fadeIn', fadeIn())
  ]
}) 
export class SeeAllComponent implements OnInit, AfterViewChecked, OnDestroy {
  public title
  public subcat
  public products = []
  public tempProducts = []
  public innerWidth: any
  public mobile: boolean = false
  public dataLoaded: boolean = false 
  public isFiltrating: boolean = false
  public activeSup = ''
  public nearestShopName
  public nearestShopType

  public toggledDown: boolean = false
  
  public supcat = []
  public unique = []
  
  public totalRecords
  page = 1

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService,
    private userService: UserService
  ) {
    this.products = new Array<any>() 
    this.tempProducts = new Array<any>() 
   }

  
   @ViewChild('list', {read: ElementRef, static:false}) elementView: ElementRef;
   viewHeight: number;

  public id:string
  public subcategory = decodeURI(this.route.snapshot.paramMap.get('subcat'))


  ngAfterViewChecked() {
    // window.scrollTo(0, 0);
    }
  
    
    get memProd() { //getter allows quickly updata changed data that comes from service
      return this.productService.getData()
    }
  ngOnInit(): void {
    // let shopName = JSON.parse(localStorage.getItem('nearestShop'))   

    
    // console.log(shopName)

    this.nearestShopName = localStorage.getItem('nearestShopName')
    this.nearestShopType = localStorage.getItem('typeOfShop')

    // console.log(this.nearestShopType, this.nearestShopName)
    
    this.id = this.route.snapshot.paramMap.get('id')
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 900) this.mobile = true
    window.scrollTo(0, 0);
    
    // this.categoryService.getCategory()
    //   .subscribe(data => {
      //     this.title = data.find(o => {
        //       console.log(o.name)
        //       o.name == this.id
        //     })
        //   })
        
        this.title = this.id
        // console.log(this.title, "title")
      //  console.log(shopName)
    this.productService.GetBySubcat(this.title, this.subcategory, this.nearestShopType, this.nearestShopName).subscribe(data => {
      // console.log(this.subcategory)
      this.products = data

      console.log(this.products, 'products')
      
      this.tempProducts = data
      this.totalRecords = data.length
      console.log(this.products)
      this.products.forEach(product => {
        if(this.memProd.some(_product => _product._id == product._id)) {
          let index = this.products.indexOf(product)
          this.products[index] = this.memProd.find(o => o._id == product._id)
        }
        this.supcat.push(product.supcategory)
      })
      let unique = this.supcat.filter((item, i, ar) => ar.indexOf(item) === i);
      // console.log(unique);
      this.unique = unique

      console.log(this.supcat)
      // console.log(this.totalRecords)
      setTimeout(() => {
        this.dataLoaded = true
      }, 0)

      let supcategory = this.userService.supcategory
    if(supcategory != '') {
      this.filterBy(supcategory)
      console.log(supcategory, 'here we go')
    }
    })

    
    
  }

  getHeight() {
    this.viewHeight = this.elementView.nativeElement.offsetHeight
    console.log(this.viewHeight)
  }
  

  pageChanged(value) {
    window.scrollTo(0, 0)
  }

  filterBy(name) {

    window.scrollTo(0, 0)
    if(name != this.activeSup) {
      this.activeSup = name
      this.isFiltrating = true
      this.products = this.tempProducts
      this.products = this.products.filter(o => o.supcategory == name)
      console.log(this.products, 'data')
    }
    else {
      this.activeSup = ''
      this.products = this.tempProducts
      this.isFiltrating = false
    }
    this.totalRecords = this.products.length

  }

  ngOnDestroy() {
    this.userService.clearSupcategory()
  }
}

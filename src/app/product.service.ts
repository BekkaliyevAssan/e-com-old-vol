import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order } from '../assets/interfaces/order'
import { Product } from '../assets/interfaces/products'
import { api_url } from '../assets/data/env'
import { tap, retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private backend = `${api_url}/api/products/`

  private _refresh = new Subject<void>()

  get refresh() {
    return this._refresh
  }

  constructor(private http: HttpClient) {

    this.dataChange.subscribe((value) => {
      console.log(value)
      this.data = value
    })

    this.data = JSON.parse(localStorage.getItem('product')) || []
    this.totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0
    // this.data = JSON.parse(localStorage.getItem('product'))
  }

  private url = 'api/products/'
  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  GetList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.backend)
  }

  GetByCategory(id): Observable<Product[]> {
    return this.http.get<Product[]>(this.backend + id)
  }

  GetBySubcat(title, subcatId, type, name): Observable<Product[]> {
    console.log(title)
    console.log(subcatId)
    return this.http.post<Product[]>(this.backend + 'subcategory/', { title: title,  subcat: subcatId, type: type, name: name } , this.httpHeaders)
  }

  GetById(id): Observable<Product> {
    return this.http.get<Product>("https://be-online.kz/api/product/" + id)
  }

  GetOrderList(name, type): Observable<any> {
    return this.http.post(this.backend + 'orders/shop', { name: name, type: type }, this.httpHeaders)
    //auto refresh
  }
  public category: any = JSON.parse(sessionStorage.getItem('tempSub'))
  sendCategoryToChild(category) {
    this.category = category
    sessionStorage.setItem('tempSub', JSON.stringify(this.category))
  }

  Update(product): Observable<Product> {
    return this.http.put<Product>(this.backend, { product: product }, this.httpHeaders).pipe(
      tap(() => {
        this._refresh.next()
      })
    )
  }

  OrderProducts(orderInfo): Observable<Order> {
    return this.http.post<Order>(this.backend + 'orders/', { orderInfo }, this.httpHeaders)
  }

  Search(query, type, name): Observable<any> {
    return this.http.post(this.backend + 'search/preview/', { query: query, type: type, name: name }, this.httpHeaders)
  }

  SearchForReal(query, type, name): Observable<Product[]> {
    return this.http.post<Product[]>(this.backend + 'search', { query: query, type: type, name: name }, this.httpHeaders)
  }

  Create(product): Observable<Product> {
    return this.http.post<Product>(this.backend, { product: product }, this.httpHeaders).pipe(
      tap(() => {
        this._refresh.next()
      })
    )
  }

  Delete(id): Observable<Product> {
    return this.http.delete<Product>(this.backend + id).pipe(
      tap(() => {
        this._refresh.next()
      })
    )
  }

  ChangeStatus(status, id): Observable<any> {
    return this.http.put(this.backend + 'orders/', { status, id }, this.httpHeaders).pipe(
      tap(() => {
        this._refresh.next()
      })
    )
  }

  GetPopularProducts(type, name): Observable<any> {
    return this.http.post(this.backend + 'popular/', {type, name}, this.httpHeaders)
  }

  /////////////////////////////////////////////////////////

  private length = new Subject<number>()
  cart$ = this.length.asObservable()

  private total = new Subject<number>()
  totalSum$ = this.total.asObservable()


  data = []
  totalPrice: number = 0
  dataChange: Subject<any> = new Subject<any>()

  setData(data) {
    this.data = JSON.parse(localStorage.getItem('product')) || []
    data.totalPrice = data.price * data.quantity
    this.data.push(data)
    let products = JSON.stringify(this.data)

    localStorage.setItem('product', products)
    this.length.next(this.data.length)

    // let totalPrice = JSON.parse(localStorage.getItem('totalPrice'))
    this.totalPrice = this.totalPrice + data.totalPrice
    this.total.next(this.totalPrice)
    console.log(this.totalPrice)
    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice))
  }

  getData() {
    return this.data
  }

  incrementQnt(product) {
    console.log(this.data, 'data')
    // let products = JSON.parse(localStorage.getItem("product") || "[]")
    if (!this.data.some(_product => _product._id == product._id)) {
      product.quantity = ++product.quantity
      product.price = parseInt(product.price)
      product.totalPrice = product.price * product.quantity
    }
    else {
      let i = this.data.findIndex(o => o._id == product._id)
      this.data[i].quantity += 1
      this.data[i].totalPrice = this.data[i].price * this.data[i].quantity

      localStorage.setItem("product", JSON.stringify(this.data))
      // product.quantity = ++product.quantity

      // let totalPrice = JSON.parse(localStorage.getItem('totalPrice'))

      this.totalPrice = this.totalPrice + product.price
      this.total.next(this.totalPrice)
      localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice))
    }
  }

  decrementQnt(product) {
    // let products = JSON.parse(localStorage.getItem("product") || "[]")
    if (this.data.some(_product => _product._id == product._id)) {
      let i = this.data.findIndex(o => o._id == product._id)
      if (this.data[i].quantity > 1) {
        this.data[i].quantity -= 1
        this.data[i].totalPrice = this.data[i].totalPrice - this.data[i].price

        localStorage.setItem("product", JSON.stringify(this.data))
        // product.quantity = --product.quantity

        // let totalPrice = JSON.parse(localStorage.getItem('totalPrice'))
        this.totalPrice = this.totalPrice - product.price
        this.total.next(this.totalPrice)
        localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice))
      }
    }
    else {
      if (product.quantity > 1)
        product.quantity = --product.quantity
    }
  }

  deleteFromCart(product) {
    // let totalPrice = JSON.parse(localStorage.getItem('totalPrice'))
    this.totalPrice -= product.price * product.quantity
    this.total.next(this.totalPrice)


    localStorage.setItem('totalPrice', JSON.stringify(this.totalPrice))

    // let products = JSON.parse(localStorage.getItem("product") || "[]")
    this.data.forEach(item => {
      if (item._id == product._id) {
        product.quantity = 1
        let i = this.data.indexOf(item)
        this.data.splice(i, 1)
      }
    })
    this.length.next(this.data.length)
    console.log(this.data, 'should be this')
    // this.data = this.data
    localStorage.setItem("product", JSON.stringify(this.data))
  }

  makeOrder() {
    this.length.next(0)
    this.total.next(0)
    this.totalPrice = 0
  }
}

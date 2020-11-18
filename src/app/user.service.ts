import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../assets/interfaces/user'
import { api_url } from '../assets/data/env'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  isSidebarVisible: boolean
  sidebarVisibilityChange: Subject<boolean> = new Subject<boolean>()    

  shopType
  shopTypeChange: Subject<string> = new Subject<string>()

  lang
  langChange: Subject<string> = new Subject<string>()

  
  constructor(private http: HttpClient) {
    this.sidebarVisibilityChange.subscribe((value) => {
      this.isSidebarVisible = value
    })  

    this.shopTypeChange.subscribe((value) => {
      this.shopType = value
    })

    this.langChange.subscribe((value) => {
      this.lang = value
    })
    this.lang = localStorage.getItem('lang') || 'rus'
  }

  toggleSidebarVisibility() {
    this.sidebarVisibilityChange.next(!this.isSidebarVisible);
  }

  setShopType(data) {
    this.shopTypeChange.next(data)
    console.log(this.shopType)
  }

  private url = api_url
  
  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  Login(loginInfo): Observable<any> {
    return this.http.post<any>(this.url+'/api/user/login', {user: loginInfo}, this.httpHeaders)
  }

  Register(registerInfo): Observable<User> {
    return this.http.post<User>(this.url+'register', registerInfo, this.httpHeaders)
  }

  isLogged() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  getShop() {
    return JSON.parse(localStorage.getItem('nearestShop'))
  } 
  supcategory: string = ''
  setSupcategory(supcategory) {
    this.supcategory = supcategory
    console.log(supcategory, this.supcategory)
  }
  clearSupcategory() {
    this.supcategory = ''
  }
  onLangChange(lang) {
    this.langChange.next(lang)
    localStorage.setItem('lang', lang)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ICategory } from 'src/assets/interfaces/category';
import { api_url } from '../assets/data/env'
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _url: string = "assets/data/category.json"
  private httpHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  private _refresh = new Subject<void>()

  get refresh() {
    return this._refresh
  }
  private backend = `${api_url}/api/categories/`
 
  constructor(private http: HttpClient) { }

  getCategory(type, name):Observable<ICategory[]> { 
    return this.http.post<ICategory[]>(this.backend + 'shop/', {type: type, name: name}, this.httpHeaders)
  }

  set(category): Observable<any> {
    return this.http.post(this.backend, {name: category}, this.httpHeaders).pipe(
      tap(() => {
        this._refresh.next()
      })
    )
  }

  updateCategory(category): Observable<any> {
    return this.http.put(this.backend, {category: category}, this.httpHeaders).pipe(
      tap(() => {
        this._refresh.next()
      })
    )
  }

  setSubCategory(cat, subcat): Observable<ICategory> {
    return this.http.post<ICategory>(this.backend+'subcategory/', { name: subcat, category: cat}, this.httpHeaders).pipe(
      tap(() => {
        this._refresh.next()
      })
    )
  }

  updateSubCategory(subcategory): Observable<any> {
    return this.http.put(this.backend, subcategory,this.httpHeaders).pipe(
      tap(() => {
        this._refresh.next()
      })
    )
  }

  delete(id): Observable<ICategory> {
    return this.http.delete<ICategory>(this.backend + id).pipe(
      tap(() => {
        this._refresh.next()
      })
    )
  }

  deleteSub(cat, subcat): Observable<ICategory> {
    return this.http.post<ICategory>(this.backend + cat + '/subcategory/', { subcategory: subcat}, this.httpHeaders)
  }
}

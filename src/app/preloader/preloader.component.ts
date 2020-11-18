import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrls: ['./preloader.component.css']
})
export class PreloaderComponent implements OnInit {
  public cat
  constructor() { }

  ngOnInit(): void {
    this.cat = localStorage.getItem('typeOfShop') || '' 
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public badge
  public cat
  @Input() focused: boolean = false
  constructor(private userServiec: UserService) { }

  get lang() {
    return this.userServiec.lang
  }

  ngOnInit(): void {
    this.cat = localStorage.getItem('typeOfShop') || ''
  }
  ngAfterContentChecked() {
    this.badge = JSON.parse(localStorage.getItem('product') || "[]")
  }

}

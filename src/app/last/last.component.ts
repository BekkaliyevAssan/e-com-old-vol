import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-last',
  templateUrl: './last.component.html',
  styleUrls: ['./last.component.css']
})
export class LastComponent implements OnInit {
  public cat
  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.cat = localStorage.getItem('typeOfShop') || ''
  }

  get lang() {
    return this.userService.lang
  }
  
  goToCategory() {
    this.router.navigate([`/category`], { relativeTo: this.route, skipLocationChange: true });
  }

}

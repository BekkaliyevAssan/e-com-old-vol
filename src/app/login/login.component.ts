import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  public loginModel = {
    password: '',
    email: ''
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.Login(this.loginModel).subscribe(
      res => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('manager', res.user)
        let userShop = JSON.stringify(res.user.shop)
        localStorage.setItem('adminShop', userShop)
        if(res.token) {
          this.router.navigate(['/admin-panel'])
        }
      }
    )

  }
}

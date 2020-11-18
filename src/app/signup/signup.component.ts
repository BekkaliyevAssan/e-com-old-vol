import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userService: UserService) { }

  public signUpModel = {
    email: '',
    name: '',
    password: ''
  }
  
  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.signUpModel)
    this.userService.Register(this.signUpModel)
  }

}

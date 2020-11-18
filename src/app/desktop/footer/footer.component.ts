import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public selectedLang: string
  public innerWidth: any
  public mobile: boolean
  constructor(private userService: UserService) {
    this.selectedLang = localStorage.getItem('lang') || 'rus'
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if(this.innerWidth < 900) this.mobile = true
  }

  get language() {
    return this.userService.lang
  }

  onSelectLang(lang) {
    this.selectedLang = lang
    this.userService.onLangChange(lang)
  }

}

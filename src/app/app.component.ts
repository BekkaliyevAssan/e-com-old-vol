import { Component, OnChanges, OnInit, AfterContentInit, AfterContentChecked } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { filter } from 'rxjs/operators';
import { slideInAnimation } from './router-animatins'
import { UserService } from './user.service';

declare var gtag

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent implements OnInit, AfterContentChecked {
  title = 'online-shop';
  public innerWidth: any
  public mobile: boolean = false
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  public path: string
  public inProgress: boolean = false
  //need to switch
  constructor(
    private userService: UserService,
    private router: Router
  ) {
    const navEndEvents = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    navEndEvents.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-178687371-1', {
        'page_path': event.urlAfterRedirects
      });

    })
  }

  ngOnInit() {
    // let currentLang = localStorage.getItem('lang')
    // console.log(currentLang)
    // if(currentLang == null) localStorage.setItem('lang', 'rus')
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 900) this.mobile = true
  }
  ngAfterContentChecked() {
    // this.getShop()
    let arr = (window.location.href.split('/'))
    this.path = arr[arr.length - 1]
  }

  // getShop() {
  //   if(this.path != 'prehome')
  //   if(!this.userService.getShop()) {
  //     this.router.navigate(['/prehome'])
  //   }
  // }
  //need to test

}

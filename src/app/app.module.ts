import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { SeeAllComponent } from './see-all/see-all.component';
import { CheckComponent } from './check/check.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LastComponent } from './last/last.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DeskNavbarComponent } from './desktop/desk-navbar/desk-navbar.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminPanelOrdersComponent } from './admin-panel-orders/admin-panel-orders.component';
import { AdminPanelCategoriesComponent } from './admin-panel-categories/admin-panel-categories.component';
import { AdminPanelSubcategoriesComponent } from './admin-panel-subcategories/admin-panel-subcategories.component';
import { AdminPanelProductsComponent } from './admin-panel-products/admin-panel-products.component';
import { PrehomeComponent } from './prehome/prehome.component';
import { SvgComponent } from './svg/svg.component';
import { ButtonComponent } from './button/button.component';
import { FooterComponent } from './desktop/footer/footer.component';
import { SliderComponent } from './slider/slider.component'

import {NgxPaginationModule} from 'ngx-pagination'; 
import {TextMaskModule} from 'angular2-text-mask'

import { CarouselModule } from 'ngx-owl-carousel-o';
import { PreloaderComponent } from './preloader/preloader.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { InfoComponent } from './info/info.component';
import { TestAnimationComponent } from './test-animation/test-animation.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { MobileSearchSeeallComponent } from './mobile-search-seeall/mobile-search-seeall.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    SearchComponent,
    CartComponent,
    HeaderComponent,
    CategoryDetailsComponent,
    ProductCardComponent,
    SeeAllComponent,
    CheckComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    LastComponent,
    NavbarComponent,
    DeskNavbarComponent,
    AdminPanelComponent,
    AdminSidebarComponent,
    AdminPanelOrdersComponent,
    AdminPanelCategoriesComponent,
    AdminPanelSubcategoriesComponent,
    AdminPanelProductsComponent,
    PrehomeComponent,
    SvgComponent,
    ButtonComponent,
    FooterComponent,
    SliderComponent,
    PreloaderComponent,
    InfoComponent,
    TestAnimationComponent,
    PersonalInfoComponent,
    DeliveryInfoComponent,
    MobileSearchSeeallComponent
  ],
  imports: [
    BrowserModule,
    CarouselModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    TextMaskModule
  ],
  providers: [AuthGuard,
              {
                provide: HTTP_INTERCEPTORS,
                useClass: TokenInterceptorService,
                multi: true
              }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

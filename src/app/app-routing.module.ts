import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { SearchComponent } from './search/search.component';
import { CartComponent } from './cart/cart.component';
import { CategoryDetailsComponent } from './category-details/category-details.component';
import { SeeAllComponent } from './see-all/see-all.component';
import { CheckComponent } from './check/check.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AdminComponent } from './admin/admin.component';
import { LastComponent } from './last/last.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { AdminPanelOrdersComponent } from './admin-panel-orders/admin-panel-orders.component';
import { AdminPanelCategoriesComponent } from './admin-panel-categories/admin-panel-categories.component';
import { AdminPanelSubcategoriesComponent } from './admin-panel-subcategories/admin-panel-subcategories.component';
import { AdminPanelProductsComponent } from './admin-panel-products/admin-panel-products.component';
import { PrehomeComponent } from './prehome/prehome.component'
import { AuthGuard } from './auth.guard';
import { InfoComponent } from './info/info.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { DeliveryInfoComponent } from './delivery-info/delivery-info.component';
import { MobileSearchSeeallComponent } from './mobile-search-seeall/mobile-search-seeall.component';

const routes: Routes = [
  //hello
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  // {path: 'prehome', component: PrehomeComponent, data: {animation: 'Prehome'}},
  {path: 'home', component: HomeComponent, data: {animation: 'Home'}},
  {path: 'category', component: CategoryComponent, data: { animation: 'Category' }},
  {path: 'category/:id', component: CategoryDetailsComponent, data: { animation: 'CategoryDetails' }},
  {path: 'category/see-all/:id/:subcat', component: SeeAllComponent, data: { animation: 'SeeAll' }},
  {path: 'search', component: SearchComponent, data: { animation: 'Search' }},
  {path: 'search/mobile-search-seeall/:val', component: MobileSearchSeeallComponent, data: { animation: 'MobileSearch' }},
  {path: 'cart', component: CartComponent, data: { animation: 'Cart' }},
  {path: 'cart/check', component: CheckComponent, data: { animation: 'CartNext' }},
  {path: 'login', component: LoginComponent, data: { animation: 'Login' }},
  {path: 'signup', component: SignupComponent, data: { animation: 'Signup' }},
  // {path: 'admin', component: AdminComponent},
  {path: 'admin-panel', component: AdminPanelComponent, canActivate: [AuthGuard], children: [
    {path: 'orders', component: AdminPanelOrdersComponent},
    {path: 'categories', component: AdminPanelCategoriesComponent},
    {path: 'subcategories', component: AdminPanelSubcategoriesComponent},
    {path: 'products', component: AdminPanelProductsComponent}
  ]},
  {path: 'cart/last', component: LastComponent, data: { animation: 'Last' }},

  {path: 'info', component: InfoComponent, children: [
    {path: '', component: PersonalInfoComponent, pathMatch: 'full'},
    {path: 'delivery-info', component: DeliveryInfoComponent}
  ]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { AuthorizeRoleGuard } from 'src/api-authorization/auth-role-access/authorization-role-can-access.component';
import { PerformanceService } from 'src/app/services/performanceService';
import { PerformancesList } from 'src/app/performance/performances.component';
import { PerformanceItem } from 'src/app/performance/performance.item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerformanceFilter } from 'src/app/performance/performance.filter.component';
import { PerformanceDetail } from 'src/app/performance/performance.details.component';
import { RoleService } from 'src/app/services/roleService';
import { CreateEdit } from 'src/app/admin/admin.component';
import { HowTo } from 'src/app/details/how-to.component';
import { Contacts } from 'src/app/details/contacts.component';
import { AboutUs } from 'src/app/details/about-us.component';
import { UserOrders } from 'src/app/user-pages/user-orders.component';
import { LoginComponent } from 'src/api-authorization/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PerformancesList,
    PerformanceItem,
    PerformanceFilter,
    PerformanceDetail,
    CreateEdit,
    HowTo,
    Contacts,
    AboutUs,
    UserOrders
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ApiAuthorizationModule,
    NgbModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'details/:id', component: PerformanceDetail },
      { path: 'admin/:id', component: CreateEdit, canActivate: [AuthorizeRoleGuard] },
      { path: 'how-to-book', component: HowTo },
      { path: 'contacts', component: Contacts },
      { path: 'about-us', component: AboutUs },
      { path: 'my-orders', component: UserOrders }
    ],
      { relativeLinkResolution: 'legacy' })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true },
    AuthorizeRoleGuard,
    PerformanceService,
    RoleService,
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

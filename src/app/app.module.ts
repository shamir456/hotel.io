import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import {map} from 'rxjs/operators';
import {MatButtonModule,MatNativeDateModule,MatDatepickerModule ,MatProgressSpinnerModule, MatCardModule ,MatCheckboxModule, MatInputModule, MatMenuTrigger, MatMenuModule, MatTabsModule} from '@angular/material';
import 'hammerjs';
import { FormsModule } from '@angular/forms';
import { MyaccountComponent } from './myaccount/myaccount.component';


import {LoginService} from '../app/services/login.service';
import {UserService} from '../app/services/user.service';
import {HotelService} from '../app/services/hotel.service';
import { BookingService} from '../app/services/booking.service';

import {DataTablesModule,DataTableDirective} from '../../node_modules/angular-datatables';
import { Observable } from 'rxjs/';
import { ObserversModule } from '@angular/cdk/observers';
import {Http,Headers, HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { DataFilterPipe} from '../app/hotels-list/data-filter.pipe';
import {NgbModule, NgbRating} from '@ng-bootstrap/ng-bootstrap';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

import { BookingComponent } from './booking/booking.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { HotelsListComponent } from './hotels-list/hotels-list.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    MyaccountComponent,



    BookingComponent,
    MyProfileComponent,

    HotelsListComponent,
    DataFilterPipe,
    HotelDetailComponent


  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule, MatCheckboxModule,FormsModule,
    MatInputModule,
    MatMenuModule,
    MatTabsModule,
    HttpModule,
    HttpClientModule,
    MatCardModule,
    NgbModule,
    MatProgressSpinnerModule,
    DataTablesModule,
    MatDatepickerModule,
    MatNativeDateModule





  ],
  providers: [
    LoginService,
    UserService,
    HotelService,
    BookingService,



  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

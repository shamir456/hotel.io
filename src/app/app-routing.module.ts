import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component'
import {MyaccountComponent}  from '../app/myaccount/myaccount.component';
import {XyzComponent} from '../app/xyz/xyz.component';

import { MyProfileComponent } from '../app/my-profile/my-profile.component';
import {HotelsListComponent} from '../app/hotels-list/hotels-list.component';
import {HotelDetailComponent} from '../app/hotel-detail/hotel-detail.component';


const routes: Routes = [
  {path:'',    component: HomeComponent },
  {path:'xyz', component: XyzComponent },
  {path: 'account', component: MyaccountComponent},
  
  {path: 'myProfile' , component:MyProfileComponent},
  {path : 'hotelList' , component:HotelsListComponent},
  {path : 'hotelDetail/:id' , component:HotelDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

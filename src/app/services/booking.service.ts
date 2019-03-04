import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AppConst} from '../constants/app-const';
import { List } from 'lodash';
import { log } from 'util';



@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private serverPath:string=AppConst.serverPath;


  constructor(private http:Http) { }

  sendbookinginfo(user_id:number, hotel_id:number, checkin:string, checkout:string, room_id:any, bill:number) {
    let url = this.serverPath + "booking/rooms";
    let bookInfo = {
      "user_id" :user_id,
      "hotel_id": hotel_id,
      "checkin":checkin,
      "checkout":checkout,
      "room_id":room_id,
      "bill":bill


    };

    console.log("Displaying book info");
    console.log(bookInfo);
    console.log("hellooooooo");
    

    let tokenHeader = new Headers({
      'Content-Type' : 'application/json',
      'x-auth-token' : localStorage.getItem("Xauth")
    });

    return this.http.post(url, JSON.stringify(bookInfo), {headers:tokenHeader});
  }















}

import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import {AppConst} from '../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private serverPath:string=AppConst.serverPath;

  constructor(private http:Http) { }

  getHotelList(){
    let url = this.serverPath+'hotel';
  
    let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem('Xauth')
  	});
    return this.http.get(url, {headers : tokenHeader});
  }


  getHotel(id:number){
    let url = this.serverPath+'hotel/'+id;
  
    let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem('Xauth')
  	});

  	return this.http.get(url, {headers : tokenHeader});
  }

  searchHotel(keyword:string){
    let url = this.serverPath+'hotel/searchBook';
  
    let tokenHeader = new Headers({
  		'Content-Type' : 'application/json',
  		'x-auth-token' : localStorage.getItem('Xauth')
  	});

  	return this.http.post(url, keyword ,{headers : tokenHeader});
  }

}

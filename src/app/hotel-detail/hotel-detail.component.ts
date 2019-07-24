import { Component, OnInit } from '@angular/core';
import {Hotel} from '../model/hotel';
import {HotelService} from '../services/hotel.service';
import {Params,ActivatedRoute,Router} from '@angular/router';
import {Http} from '@angular/http';
import {BookingService} from '../services/booking.service';
import {AppConst} from '../constants/app-const';
import {UserService } from '../services/user.service'
import { LoginService } from '../services/login.service';
import {User} from '../model/user';
import { count } from 'rxjs/operators';
import { toInteger, isNumber, padNumber } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  private hotelId:number;
   hotel:Hotel= new Hotel();
  private serverPath = AppConst.serverPath;
   roomList : any =[];
   no_of_delux_available:number=0;
   no_of_economical_available:number=0;

  public selected_delux_no:number;
  public selected_econo_no:number;
  public checkIn:string;
  public checkout:string;
  public bookingSucces:boolean=false;
  public deluxe_selection_error=false;
  public economic_selection_error=false;
  public loginService=false;
  Deluxe_price:any;
  economic_price:any;
  loading=false;

   user:User;

  completeform=true;
   roomarr:any=[];
   today= new Date();
   bill:number;
  public booking_id:any;
  constructor(
    public bookingService:BookingService,
    public hotelService:HotelService,
    public userService:UserService,
    private router: Router,
    private http:Http,
    private route :ActivatedRoute) {}


    deluxno(arr:any){
      var count:number=0;
      for(var i=0; i<arr.length;i++){
        if ((arr[i].room_name)==="Deluxe"){
          count++;
        }
      }
      console.log(count);
      return count;
    }


    deluxprice(arr:any){
      var count:number=0;
      for(var i=0; i<arr.length;i++){
        if ((arr[i].room_name)==="Deluxe"){
          return arr[i].price;
        }
      }
    }
    econoprice(arr:any){

      for(var i=0; i<arr.length;i++){
        if ((arr[i].room_name)==="Economic"){
          return arr[i].price;
        }
      }
    }


    econo(arr:any){
      var count:number=0;
      for(var i=0; i<arr.length;i++){
        if ((arr[i].room_name)==="Economic"){
          count++;
        }
      }
      console.log(count);
      return count;
    }

    doneBooking(){
      this.loading=true;
      this.completeform=true;

      console.log(this.selected_delux_no);
      console.log(this.selected_econo_no);

      var d_count=0;
      var e_count=0
      var j=0;
      this.deluxe_selection_error=false;
      this.economic_selection_error=false;
      this.bill=0;


      console.log(this.checkIn);

      if(this.selected_delux_no> this.no_of_delux_available){
        this.deluxe_selection_error=true;
        this.loading=false;
        return;

      }else{
        if(this.selected_econo_no> this.no_of_economical_available){
          this.economic_selection_error=true;
          this.loading=false;
          return;
        }
      }


      for(var i=0; i<this.roomList.length; i++){
        if (((this.roomList[i].room_name)=="Deluxe") && (d_count<this.selected_delux_no)&& (this.selected_delux_no != 0)){
          if((this.roomList[i].isenabled)==true){

            this.bill=this.bill + parseInt(this.roomList[i].price);
            this.roomarr[j]=this.roomList[i].id;
            d_count++;
            j++;
          }
        }

        if (((this.roomList[i].room_name)=="Economic") && (e_count<this.selected_econo_no) && (this.selected_econo_no != 0))
        {
          if((this.roomList[i].isenabled)==true){
            this.bill=this.bill+ parseInt(this.roomList[i].price);
            this.roomarr[j]=this.roomList[i].id;
            j++;
            e_count++;
          }
        }
       //(document.getElementById("rooms") as HTMLDivElement).id=this.roomarr;


      }
      console.log(this.roomarr);
      console.log(this.bill);


      if(this.checkIn==undefined || this.checkout==undefined || this.roomarr.length==0){
        console.log("ghnta jae ga");
        this.completeform=false;
        this.loading=false;
        return;
      }else{


      this.bookingService.sendbookinginfo( this.user.id,this.hotelId ,this.checkIn,this.checkout,this.roomarr ,this.bill).subscribe(
        res => {
         console.log("send booking info response");
          console.log(res.text());
          this.booking_id=res.json().booking_id;
          console.log(this.booking_id);
          this.loading=false;
          this.bookingSucces=true

        },
        error => {

          console.log(error.text());
          console.log("aaa gya error");
          this.loading=false;
          let errorMessage = error.text();

        }
        );
      }

 }



 getCurrentUser() {
  this.userService.getCurrentUser().subscribe(
    res => {
      console.log("THIS.USER name");
      this.user=(res.json());
      console.log(this.user.username);

      console.log("sjkidlfgis");
      console.log(this.user.id);
      if (this.user.id==null){
        this.router.navigate(['account']);
      }

    },
    err => {
      console.log("not login")
      console.log(err);
    }
  );
}




  ngOnInit() {
    console.log("sajdasl;kjd");




    this.route.params.forEach((params: Params)=>{
     this.hotelId=Number.parseInt(params['id']);
    console.log(this.hotelId);


    });
     this.hotelService.getHotel(this.hotelId).subscribe(
    res=>{

       this.hotel=res.json();
       this.roomList=this.hotel.rooms;
       console.log("asdjhksadsa");
       console.log("displaying rooms");
       console.log(this.roomList);
       console.log(this.roomList.length);









       this.no_of_delux_available= this.deluxno(this.roomList);
       this.no_of_economical_available=this.econo(this.roomList);
        console.log(this.hotel);
        this.Deluxe_price = this.deluxprice(this.roomList);
        this.economic_price=this.econoprice(this.roomList);
    },
     error=>{
      console.log(error);

    }



);


    this.getCurrentUser();

  }
   modal= document.getElementById('id01');


    // When the user clicks anywhere outside of the modal, close it

}



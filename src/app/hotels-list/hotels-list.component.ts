import { Component, OnInit } from '@angular/core';
import {Hotel} from '../model/hotel';
import {HotelService} from '../services/hotel.service';
import {UserService} from '../services/user.service';
import {Params,ActivatedRoute,Router} from '@angular/router';
import {Http} from '@angular/http';
import {AppConst} from '../constants/app-const';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../services/login.service';
import {User} from '../model/user';

class person{
  public name;
  public place;
}


@Component({
  selector: 'app-hotels-list',
  templateUrl: './hotels-list.component.html',
  styleUrls: ['./hotels-list.component.css']
})
export class HotelsListComponent implements OnInit {
  public filterQuery="";
  public rowsOnpage=5;

   selectedHotel:Hotel;
   hotelList: any=[];
  private serverPath= AppConst.serverPath;

  user: User;




  constructor(
    public hotelService:HotelService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute,
    private userService: UserService,
    config: NgbRatingConfig
  ){

    config.max=5;
  }

  onSelect(hotel:Hotel){
    this.selectedHotel=hotel;
    console.log(hotel);

    this.userService.getCurrentUser().subscribe(
      res => {
        console.log("THIS.USER name");
        this.user=(res.json());
        console.log(this.user.username);
        if (this.user.id!=null){
          this.router.navigate(['/hotelDetail',this.selectedHotel.id]);

        }else{
          this.router.navigate(['account']);
        }


      },
      err => {
        console.log("not login")
        console.log(err);
        this.router.navigate(['account']);

      }
    );
  }

  onRate(hotel:Hotel)
  {
    this.selectedHotel=hotel;

  }











  ngOnInit() {



    //(document.getElementById('myTable') as HTMLTableElement).id = this.datarray;
   console.log("afhdflafldhs");

    this.route.queryParams.subscribe(
      params=>{
        if(params['hotelList']){
          console.log("filtered book list");
          this.hotelList=JSON.parse(params['hotelList']);
          //(document.getElementById('data-table') as HTMLTableElement).id = this.hotelList;

        }else{
          console.log("kjdahsdjhaslkd");

           this.hotelService.getHotelList().subscribe(
             res=>{
               console.log("djkashdadhhdal");

               console.log(res.json());
               this.hotelList=res.json();
               console.log("my id");

               console.log(this.hotelList);
               //(document.getElementById('myTable') as HTMLTableElement).id = this.hotelList;
             },
             err =>{
              console.log(err);
            }


          );
        }

      }
    );
  }
  }



  $(window).scroll(function() {
    $('.fadedfx').each(function(){
    var imagePos = $(this).offset().top;

    var topOfWindow = $(window).scrollTop();
      if (imagePos < topOfWindow+500) {
        $(this).addClass("fadeIn");
      }
    });
  });

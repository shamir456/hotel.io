import { Component, OnInit } from '@angular/core';
import {Hotel} from '../model/hotel';
import {HotelService} from '../services/hotel.service';
import {Params,ActivatedRoute,Router} from '@angular/router';
import {Http} from '@angular/http';
import {AppConst} from '../constants/app-const';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';

import { LoginService } from '../services/login.service';

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
 
  private selectedHotel:Hotel;
  private hotelList: any=[];
  private serverPath= AppConst.serverPath;
  



  constructor(
    private hotelService:HotelService,
    private router:Router,
    private http:Http,
    private route:ActivatedRoute,
    config: NgbRatingConfig
  ) {
    
    config.max=5;
    config.readonly=true;
    
    


  }
  
  onSelect(hotel:Hotel){
    this.selectedHotel=hotel;
    console.log(hotel);
    
    this.router.navigate(['/hotelDetail',this.selectedHotel.id]);
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
               (document.getElementById('myTable') as HTMLTableElement).id = this.hotelList;
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



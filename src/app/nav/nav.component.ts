import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  private loggedin=false;

   constructor( private loginService: LoginService  , private router: Router) {  }


   logout() {
  	this.loginService.logout().subscribe(
  		res => {
        location.reload();
        this.router.navigate(['']);

  		},
  		err => {
        console.log(err);
        this.router.navigate(['account']);
        
  		}
  	);
  }


  ngOnInit() {
      this.loginService.checkSession().subscribe(
        res=>{
             console.log(res);
          this.loggedin=true;
        },
        err=>{
          console.log(err);
          this.loggedin=false;
        }
        
      );
  }

}

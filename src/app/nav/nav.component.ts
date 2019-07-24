import { Component, OnInit } from '@angular/core';
import { LoginService} from '../services/login.service';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../model/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public loggedin=false;
  public user:User;

   constructor( public loginService: LoginService  , private router: Router, public userService:UserService,) {  }


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
      this.loginService.checkSession().subscribe(
        res=>{
             console.log(res);
          this.loggedin=true;
          this.getCurrentUser();
        },
        err=>{
          console.log(err);
          this.loggedin=false;
        }

      );
  }

}

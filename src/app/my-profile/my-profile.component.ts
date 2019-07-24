import { Component, OnInit } from '@angular/core';
import {AppConst} from '../../app/constants/app-const';
import { UserService } from '../../app/services/user.service';
import {LoginService} from '../../app/services/login.service';
import {User} from '../model/user';
import { from } from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

	private serverPath = AppConst.serverPath;
	 dataFetched = false;
	 loginError:boolean;
	 loggedIn:boolean;
	 credential = {'username':'', 'password':''};

	 user: User = new User();
	 updateSuccess: boolean;
	 newPassword: string;
	 incorrectPassword: boolean;
   currentPassword: string;
   confirmpassword:string;
   usernameExists=false;
   emailexists=false;
   passwordmismatch=false;
   emptyform=false;

   loading=false;

  constructor(
  	public loginService: LoginService,
  	public userService: UserService,
  	private router: Router
    ) { }



  onUpdateUserInfo () {
    this.loading=true;
    this.incorrectPassword=false;
    this.usernameExists=false;
    this.emailexists=false;
    this.passwordmismatch=false;
    this.emptyform=false;



    if(this.user.firstName == "" || this.user.lastName== "" || this.user.username == "" || this.currentPassword == null || this.user.email=="" || this.newPassword==null || this.confirmpassword==null ){
      console.log("error firnate empty")
      this.emptyform=true;
      this.loading=false;
    }else{


    if(this.newPassword != this.confirmpassword){
      this.passwordmismatch=true;
      this.loading=false;
    }else{
      this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
        res => {
          console.log("fgudsa");
          console.log(this.user);
          console.log(res.text());
          this.loading=false;
          this.updateSuccess=true;
          this.incorrectPassword=false;
          this.usernameExists=false;
          this.emailexists=false;
          this.usernameExists=false

        },
        error => {

          console.log(error.text());
          let errorMessage = error.text();
          if(errorMessage==="Incorrect current password!") this.incorrectPassword=true;
          if(errorMessage==="Username not found!")this.usernameExists=true;
          if(errorMessage==="Email not found!")this.emailexists=true;
          this.loading=false;
        }
      );
    }
  }
  }

  getCurrentUser() {
  	this.userService.getCurrentUser().subscribe(
  		res => {


        console.log("khasjdhajks");

        this.user.firstName=res.json().firstname;
        this.user.lastName=res.json().lastname;
        this.user.id=res.json().id;
        this.user.email=res.json().email;
        this.user.username=res.json().username;
        console.log("sjkidlfgis");
        this.dataFetched = true;
        console.log(this.user);
  		},
  		err => {
  			console.log(err);
  		}
  	);
  }

  ngOnInit() {
  	this.loginService.checkSession().subscribe(
  		res => {
  			this.loggedIn = true;
  		},
  		error => {
  			this.loggedIn = false;
  			console.log("inactive session");
  			this.router.navigate(['/myAccount']);
  		}
  	);

  	this.getCurrentUser();
  }

}

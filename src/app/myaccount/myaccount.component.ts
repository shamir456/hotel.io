import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import {LoginService} from '../services/login.service';
import {UserService} from '../services/user.service';
import {AppConst} from '../constants/app-const';
import { Observable } from 'rxjs';
import { getToken } from '@angular/router/src/utils/preactivation';
import {Http,HttpModule} from '@angular/http' 
import { httpFactory } from '@angular/http/src/http_module';
@Component({
  selector: 'app-my-account',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  private serverPath = AppConst.serverPath;
   loginError:boolean = false;
   loggedIn = false;
   credential = {'username':'', 'password':''};
   name="moiz";

   emailSent: boolean =false;
   usernameExists:boolean;
   emailExists:boolean;
   username:string;                                                         
   email:string;

   emailNotExists: boolean =false;
   forgetPasswordEmailSent: boolean;
   recoverEmail:string;  
  

  constructor(
  	public loginService: LoginService,
  	public userService: UserService,
  	private router: Router
	) { }
	  
	

  onlogin() {
  	this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
  		res => {
			  console.log(res.json().token);
		localStorage.setItem('Xauth',res.json().token);
		
      	this.loggedIn = true;
  		location.reload();
  		this.router.navigate(['/']);
  		}, 
  		error => {
			console.log(error);
  			this.loggedIn = false;
  			this.loginError = true;
  		}
  	);
  }

  onNewAccount() {
  	this.usernameExists = false;
  	this.emailExists = false;
  	this.emailSent = false;

  	this.userService.newUser(this.username, this.email).subscribe(
  		res => {
  			console.log(res);
  			this.emailSent = true;
  		}, 
  		error => {
  			console.log(error.text());
  			let errorMessage = error.text();
  			if(errorMessage==="usernameExists") this.usernameExists=true;
  			if(errorMessage==="mailExists") this.emailExists=true;
  		}
  	);
  }

  
  public get loggedin(){
	  return this.loggedIn;
  }
  

  onForgetPassword() {
  	this.forgetPasswordEmailSent = false;
  	this.emailNotExists = false;

  	this.userService.retrievePassword(this.recoverEmail).subscribe(
  		res => {
  			console.log(res);
  			this.forgetPasswordEmailSent = true;
  		},
  		error => {
  			console.log(error.text());
  			let errorMessage = error.text();
  			if(errorMessage==="email not found") this.emailNotExists=true;
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
		}
	);
}



}

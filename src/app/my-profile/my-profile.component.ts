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

  constructor(
  	public loginService: LoginService,
  	public userService: UserService,
  	private router: Router
    ) { }
    
  

  onUpdateUserInfo () {
  	this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
  		res => {
        console.log("fgudsa");
        console.log(this.user);
  			console.log(res.text());
        this.updateSuccess=true;
        
  		},
  		error => {
        
  			console.log(error.text());
  			let errorMessage = error.text();
  			if(errorMessage==="Incorrect current password!") this.incorrectPassword=true;
  		}
  	);
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

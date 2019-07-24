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
   loading= false;

   emailSent: boolean =false;
   usernameExists:boolean;
   emailExists:boolean;
   username:string;
   email:string;

   emailNotExists: boolean =false;
   forgetPasswordEmailSent: boolean;
   recoverEmail:string;

    L_IN=true;
    S_UP=false;
    F_PASS= false;



  constructor(
  	public loginService: LoginService,
  	public userService: UserService,
  	private router: Router
	) { }




    loginclick(){
      this.L_IN=true;
      this.S_UP=false;
      this.F_PASS= false;
    }

    signupclick(){
      this.L_IN=false;
      this.S_UP=true;
      this.F_PASS= false;
    }

    forgetpassclick(){
      this.L_IN=false;
      this.S_UP=false;
      this.F_PASS= true;
    }



  onlogin() {
    this.loading=true;
  	this.loginService.sendCredential(this.credential.username, this.credential.password).subscribe(
  		res => {
			  console.log(res.json().token);
		localStorage.setItem('Xauth',res.json().token);
        this.loading=false;
        this.loggedIn = true;
        window.location.reload();

  		},
  		error => {
			console.log(error);
  			this.loggedIn = false;
        this.loginError = true;
        this.loading=false;
  		}
  	);
  }

  onNewAccount() {
    this.loading=true;
  	this.usernameExists = false;
  	this.emailExists = false;
  	this.emailSent = false;

  	this.userService.newUser(this.username, this.email).subscribe(
  		res => {
  			console.log(res);
        this.loading=false;
        this.emailSent = true;

  		},
  		error => {
  			console.log(error.text());
        let errorMessage = error.text();
        this.loading=false;
  			if(errorMessage==="usernameExists") this.usernameExists=true;
  			if(errorMessage==="mailExists") this.emailExists=true;
  		}
  	);
  }


  public get loggedin(){
	  return this.loggedIn;
  }


  onForgetPassword() {
    this.loading=true;
  	this.forgetPasswordEmailSent = false;
  	this.emailNotExists = false;

  	this.userService.retrievePassword(this.recoverEmail).subscribe(
  		res => {
        console.log(res);
        this.loading=false;
  			this.forgetPasswordEmailSent = true;
  		},
  		error => {
        console.log(error.text());
        this.loading=false;
  			let errorMessage = error.text();
  			if(errorMessage==="email not found") this.emailNotExists=true;
  		}
  	);
  }

  ngOnInit() {
	this.loginService.checkSession().subscribe(
		res => {
      this.loggedIn = true;
       this.router.navigate(['/hotelList']);

		},
		error => {
			this.loggedIn = false;
		}
  );


  (function($) {
    "use strict";

	// Options for Message
	//----------------------------------------------
  var options = {
	  'btn-loading': '<i class="fa fa-spinner fa-pulse"></i>',
	  'btn-success': '<i class="fa fa-check"></i>',
	  'btn-error': '<i class="fa fa-remove"></i>',
	  'msg-success': 'All Good! Redirecting...',
	  'msg-error': 'Wrong login credentials!',
	  'useAJAX': true,
  };

	// Login Form
	//----------------------------------------------
	// Validation
  $("#login-form").validate({
  	rules: {
      lg_username: "required",
  	  lg_password: "required",
    },
  	errorClass: "form-invalid"
  });

	// Form Submission
  $("#login-form").submit(function() {
  	remove_loading($(this));

		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  dummy_submit_form($(this));

		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });

	// Register Form
	//----------------------------------------------
	// Validation
  $("#register-form").validate({
  	rules: {
      reg_username: "required",
  	  reg_password: {
  			required: true,
  			minlength: 5
  		},
   		reg_password_confirm: {
  			required: true,
  			minlength: 5,
  			equalTo: "#register-form [name=reg_password]"
  		},
  		reg_email: {
  	    required: true,
  			email: true
  		},
  		reg_agree: "required",
    },
	  errorClass: "form-invalid",
	  errorPlacement: function( label, element ) {
	    if( element.attr( "type" ) === "checkbox" || element.attr( "type" ) === "radio" ) {
    		element.parent().append( label ); // this would append the label after all your checkboxes/labels (so the error-label will be the last element in <div class="controls"> )
	    }
			else {
  	  	label.insertAfter( element ); // standard behaviour
  	  }
    }
  });

  // Form Submission
  $("#register-form").submit(function() {
  	remove_loading($(this));

		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  dummy_submit_form($(this));

		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });

	// Forgot Password Form
	//----------------------------------------------
	// Validation
  $("#forgot-password-form").validate({
  	rules: {
      fp_email: "required",
    },
  	errorClass: "form-invalid"
  });

	// Form Submission
  $("#forgot-password-form").submit(function() {
  	remove_loading($(this));

		if(options['useAJAX'] == true)
		{
			// Dummy AJAX request (Replace this with your AJAX code)
		  // If you don't want to use AJAX, remove this
  	  dummy_submit_form($(this));

		  // Cancel the normal submission.
		  // If you don't want to use AJAX, remove this
  	  return false;
		}
  });

	// Loading
	//----------------------------------------------
  function remove_loading($form)
  {
  	$form.find('[type=submit]').removeClass('error success');
  	$form.find('.login-form-main-message').removeClass('show error success').html('');
  }

  function form_loading($form)
  {
    $form.find('[type=submit]').addClass('clicked').html(options['btn-loading']);
  }

  function form_success($form)
  {
	  $form.find('[type=submit]').addClass('success').html(options['btn-success']);
	  $form.find('.login-form-main-message').addClass('show success').html(options['msg-success']);
  }

  function form_failed($form)
  {
  	$form.find('[type=submit]').addClass('error').html(options['btn-error']);
  	$form.find('.login-form-main-message').addClass('show error').html(options['msg-error']);
  }

	// Dummy Submit Form (Remove this)
	//----------------------------------------------
	// This is just a dummy form submission. You should use your AJAX function or remove this function if you are not using AJAX.
  function dummy_submit_form($form)
  {
  	if($form.valid())
  	{
  		form_loading($form);

  		setTimeout(function() {
  			form_success($form);
  		}, 2000);
  	}
  }

})














}



}

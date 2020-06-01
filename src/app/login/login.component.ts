import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../auth/authentication.service';
import * as $ from 'jquery';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginform: FormGroup;
  submitted = false;
  success = false;
  invalidLogin = false;
  
  constructor(private formBuilder: FormBuilder,
    private authservice: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      passWord: ['', Validators.required]
    });

    $(document).ready(function(){
        $(".slasheye").hide();
      
      $(".notslashed").click(function(){
        $(this).hide();
        $(".slasheye").show();
        $('#password').attr("type", "text");
      });

      $(".slasheye").click(function(){
        $(this).hide();
        $(".notslashed").show();
        $('#password').attr("type", "password");
      });
    });

    // redirect to home if already logged in
    if(this.authservice.currentRoleGetter()){
      console.log(this.authservice.currentRoleGetter());
      const currentRole = this.authservice.currentRoleGetter();
      this.router.navigateByUrl('/' + currentRole);
    }
    else
      this.router.navigateByUrl('/login');
  }

  onSubmit(logindetails) {
    this.submitted = true;
    
    if (this.loginform.invalid){
      return;
    }

    this.success = true;
    this.authservice.signIn(logindetails)
      .subscribe(result =>{
        if(result){
          var currentRole = this.authservice.currentRoleGetter();

          this.invalidLogin = false;
          console.log(currentRole);
          if(currentRole !== null){
            this.router.navigateByUrl('/'+ currentRole);
          }
          else{
            this.router.navigateByUrl('/');
          }
        }  
        else
          this.invalidLogin = true;
      },
      error =>{
          console.log(error);
          
          if(error.status === 500){
            this.invalidLogin = true;
          }
      })
    }
    
  
    backbtnClicked(){
      this.router.navigateByUrl('/');
    }



    


}

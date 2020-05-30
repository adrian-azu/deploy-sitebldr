import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators, FormControlName } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../auth/authentication.service';

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
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.loginform = this.formBuilder.group({
      email: ['', Validators.required],
      passWord: ['', Validators.required]
    });
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
            this.invalidLogin = false;
            console.log("routing...");
          }
          else
            //this.invalidLogin = true;
            console.log("ekis");
          
        },
        error =>{
          console.log("error");
        })
    }
    
  



}

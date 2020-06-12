import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, RequiredValidator } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

import { countryData } from './countryData';
import * as $ from 'jquery';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regiform: FormGroup;
  submitted = false;
  country = countryData;
  invalidform;

  constructor(private formBuilder: FormBuilder,
  private router: Router,) {}

  ngOnInit(): void {
    this.regiform = this.formBuilder.group({
      firstName: ['', 
        [ Validators.required,
          Validators.pattern('^[A-Za-z . \s_-]+$')]
      ],

      lastName: [
        '', 
        [ Validators.required, 
          Validators.pattern('^[A-Za-z . \s_-]+$')]
      ],

      companyName: ['',
        [ Validators.required,
          Validators.pattern('^[A-Za-z0-9 \s ._&-]+$') ]
      ],

      country: ['', Validators.required],

      email : ['',
        [ Validators.required,
          Validators.email ]
      ],
      password: ['', Validators.required],
      confirmpass: ['', Validators.required]
    });
  
    $(document).ready(function(){
      $(".slasheye-p").hide();
      $(".slasheye-cp").hide();
    
      $(".notslashed-p").click(function(){
        $(this).hide();
        $(".slasheye-p").show();
        $('#password').attr("type", "text");
      });

      $(".slasheye-p").click(function(){
        $(this).hide();
        $(".notslashed-p").show();
        $('#password').attr("type", "password");
      });

      //for confirmp pass
      $(".notslashed-cp").click(function(){
        $(this).hide();
        $(".slasheye-cp").show();
        $('#confirmpass').attr("type", "text");
      });

      $(".slasheye-cp").click(function(){
        $(this).hide();
        $(".notslashed-cp").show();
        $('#confirmpass').attr("type", "password");
      });
    });
  
  }

  passwordchecker(){
    let password = this.regiform.get('password').value;
    let cfpassword = this.regiform.get('confirmpass').value;

    if (password === cfpassword){
      return true;
    }
    else
      return false;
  }

  
  onSubmit(accountdetails) {
    console.log(accountdetails);
    
    this.submitted = true;
    
    if(this.emptyFieldChecker() == true){
      this.invalidform = true;
      return;
    }
    if (this.passwordchecker() == false){
      console.log("password checker is false");
      return;
    }
    if (this.regiform.invalid){
      console.log("form is invalid");
      return;
    }
    
    console.log(this.passwordchecker());
    this.invalidform = false;
  }

  backbtnClicked(){
    this.router.navigateByUrl('/');
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : countryData.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {name: string}) => x.name;

  //for the meantime, cant access validators.required through regiform as whole
  emptyFieldChecker(){
    let fn = this.regiform.get('firstName').value;
    let ln = this.regiform.get('lastName').value;
    let cn = this.regiform.get('companyName').value;
    let cntry = this.regiform.get('country').value;
    let em = this.regiform.get('email').value;
    let ps = this.regiform.get('password').value;
    let cf = this.regiform.get('confirmpass').value;

    if(fn === '' || ln === '' || cn === '' || cntry === '' || em === '' || ps === '' || ps === '' || cf === ''){
      return true;
    }
    else
      return false;
  }


}
  
  


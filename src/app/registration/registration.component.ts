import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import { RegisterService } from './register.service';

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
  duplicateEmail = false;

  constructor(private formBuilder: FormBuilder,
  private router: Router, private register: RegisterService) {}

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

      company: ['',
        [ Validators.required,
          Validators.pattern('^[A-Za-z0-9 \s ._&-]+$') ]
      ],

      email : ['',
        [ Validators.required,
          Validators.email ]
      ],

      
      password: ['', Validators.required],
      confirmpass: ['', Validators.required],
      country: ['', Validators.required]
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
      return;
    }
    if(this.checkStrength() == "weak"){
      return;
    }
    if (this.regiform.invalid){
      return;
    }
    
    this.invalidform = false;
    
    this.register.onRegister(accountdetails)
    .subscribe(data =>{
      if(data == true){
        this.router.navigateByUrl('/verifyemail');
      }
    },
    error =>{
      //console.log(error);
      if(error.status === 500){
        this.duplicateEmail = true;
      }
  });
    
  }

  backbtnClicked(){
    this.router.navigateByUrl('/');
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : countryData.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5))
    )

  formatter = (x: {name: string}) => x.name;

  //for the meantime, cant access validators.required through regiform as whole
  emptyFieldChecker(){
    let fn = this.regiform.get('firstName').value;
    let ln = this.regiform.get('lastName').value;
    let cn = this.regiform.get('company').value;
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
  level:string;
  checkStrength(){
    let weaklvl2 = /^(?=.*?[A-Z])/;
    let weaklvl = /^(?=.*?[a-z])/;
    let fairlvl = /^(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/;
    let goodlvl = /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,16}$/;
    let stronglvl = /^(?=.*?[#?!@$%^&*-])(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).{8,16}$/;

    let password = this.regiform.get('password').value;
    if(stronglvl.test(password)===true){
      return this.level = "strong";
    }
    else if(goodlvl.test(password)===true){
      return this.level = "good"
    }

    else if(fairlvl.test(password) === true){
      return this.level="fair";
    }
    else if(weaklvl.test(password) === true){
      return this.level="weak";
    }
    else if(weaklvl2.test(password) === true){
      return this.level="weak";
    }
    else
      return this.level = null;
  }

}
  
  


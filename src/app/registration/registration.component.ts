import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';
import { AbstractControl, ValidationErrors } from "@angular/forms"

import { countryData } from './countryData';
import * as $ from 'jquery';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regiform: FormGroup;
  country = countryData;
  constructor(private formBuilder: FormBuilder,
  private router: Router) {}

  ngOnInit(): void {
    
    this.regiform = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      companyName: [''],
      bansa: [''],
      email:[''],
      password: [''],
      confirmpass:['']
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

    console.log(password);
    console.log(cfpassword);
    if (password === cfpassword){
      return true;
    }
    else
      return false;
  }

  
  onSubmit(accountdetails) {
    console.log(this.regiform.value);
    console.log(this.passwordchecker());
  }

  backbtnClicked(){
    this.router.navigateByUrl('/');
  }


  public bansa: any;
  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.country.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  formatter = (x: {name: string}) => x.name;

  
}

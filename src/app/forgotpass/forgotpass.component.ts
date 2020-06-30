import { Component, OnInit } from '@angular/core';
import { Form, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.css']
})
export class ForgotpassComponent implements OnInit {
  passwordForm:FormGroup
  submitted=false;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      email: ['']
    })
  }

  

  onSubmit(clientdetails){
    console.log("mamamo");
    this.submitted=true;
  }
}

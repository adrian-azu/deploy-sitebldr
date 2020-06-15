import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {
  verifyForm: FormGroup;
  

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.verifyForm = this.formBuilder.group({
      verifyCode: ['']
    })
  }

}

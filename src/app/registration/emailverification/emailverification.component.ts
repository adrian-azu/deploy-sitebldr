import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { RegisterService } from '../register.service';

@Component({
  selector: 'emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {
  verifyForm: FormGroup;
  
  constructor(private formBuilder: FormBuilder,
    private register: RegisterService) { }

  ngOnInit(): void {
    this.verifyForm = this.formBuilder.group({
      code: ['', 
        [ Validators.required,
          Validators.pattern('^[0-9]')]
      ]
    })

    this.register.tempGetter();
    //console.log (this.register.currentVisitorValue());
  }

  onVerify(clientdetails){
    let client = this.register.tempGetter();
    let enteredCode = this.verifyForm.get('code').value;

    if(client.code === enteredCode){
      console.log("iroute sa client!");
    }
  }

}

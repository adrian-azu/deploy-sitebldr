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
  correctCode = true;
  
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
    console.log(this.register.codeGetter())
    //console.log (this.register.currentVisitorValue());
  }

  onVerify(clientdetails){
    
    let client = this.register.codeGetter();
    let enteredCode = this.verifyForm.get('code').value;

    if(client === enteredCode){
      this.correctCode = true;
      
      this.register.finallyClient()
        .subscribe(data =>{
          console.log(data);
        });
      
      console.log("iroute sa client!");
      //localStorage.removeItem('code');
    }
    else
      this.correctCode = false;
  }


  resending(e){
    e.preventDefault();
    this.correctCode = true;
    this.register.resendingVisitor()
      .subscribe(data =>{
        console.log("resending results", data);
      })
    console.log("i am resending");
  }

}

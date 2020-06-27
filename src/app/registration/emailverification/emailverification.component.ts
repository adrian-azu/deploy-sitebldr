import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModalConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RegisterService } from '../register.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'emailverification',
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {
  verifyForm: FormGroup;
  submitted=false;
  correctCode = true;
  duplicateEmail = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private register: RegisterService,
    config: NgbModalConfig, 
    private modalService: NgbModal) { 
    
      config.backdrop = 'static';
      config.keyboard = false;
    }

  ngOnInit(): void {
    this.verifyForm = this.formBuilder.group({
      code: ['', 
        [ Validators.required,
          Validators.pattern('^[0-9]')]
      ]
    })
  }

  onVerify(clientdetails){
    let client = this.register.codeGetter();
    let enteredCode = this.verifyForm.get('code').value;

    this.submitted = true;
    if(client !== enteredCode){
      this.correctCode = false;
      return;
    }

    if(client === enteredCode){
      this.correctCode = true;
      
      this.register.finallyClient()
        .subscribe(data =>{
          console.log(data);
        });
    }
  }


  resending(e){
    e.preventDefault();
    this.correctCode = true;
    this.register.resendingVisitor()
      .subscribe(data =>{
        //console.log("resending results", data);
      },
      error =>{
          if(error.status === 500){
            this. duplicateEmail = true;
            localStorage.removeItem('temp');
            localStorage.removeItem('code');
          }
      })
  }

  open(content) {
    this.submitted = true;
    let client = this.register.codeGetter();
    let enteredCode = this.verifyForm.get('code').value;
    if(client === enteredCode){
      this.correctCode = true;
      this.modalService.open(content);
    }
  }

  Onproceed(){
    this.router.navigateByUrl('/login');
    this.modalService.dismissAll();
    localStorage.removeItem('temp');
    localStorage.removeItem('code');
  }

  

}

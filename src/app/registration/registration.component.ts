import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  regiform: FormGroup;
  
  constructor(private router: Router) { }
  ngOnInit(): void {
  }


  backbtnClicked(){
    this.router.navigateByUrl('/');
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/auth/authentication.service';
@Component({
  selector: 'app-adminaccount',
  templateUrl: './adminaccount.component.html',
  styleUrls: ['./adminaccount.component.css']
})
export class AdminaccountComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }
  currentUser:any;

  
  ngOnInit(): void {
    this.auth.currentUser.subscribe(x => this.currentUser = x);
  }

  logout(){
    this.auth.signOut();
  }
}

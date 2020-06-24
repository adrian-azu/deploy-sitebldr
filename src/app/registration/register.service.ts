import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private regiServer = 'http://localhost:8080/backsite/register.php';
  private verifyServer = 'http://localhost:8080/backsite/verification.php';
  private resendCode = 'http://localhost:8080/backsite/resend-confirmation.php';
  private currentVisitorSubject: BehaviorSubject<any>;
  public currentVisitor: Observable<any>;


  constructor(private http: HttpClient) { 
    this.currentVisitorSubject = new BehaviorSubject<any>(localStorage.getItem('temp'));
    this.currentVisitor = this.currentVisitorSubject.asObservable();
  }

  onRegister(accountdetails){
    return this.http.post<any>(this.regiServer, accountdetails).pipe(
      map(result =>{
        console.log(result);
        if(result && result.code){
          this.currentVisitorSubject.next(result);
          localStorage.setItem('temp', JSON.stringify(result));
          //console.log(this.currentVisitorSubject.value , 'behaviorsubject');
          //console.log(this.currentVisitor);
          return true;
        }
        else
          return false;
      })
    )
  }

  tempGetter(){
    let x = JSON.parse(localStorage.getItem('temp'));
    console.log(x, 'verification');
    return x;
  }

  public get currentVisitorValue(){
    return this.currentVisitor;
  }

  
}

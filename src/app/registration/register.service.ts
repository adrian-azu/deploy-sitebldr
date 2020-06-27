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


  constructor(private http: HttpClient) { }

  onRegister(accountdetails){
    return this.http.post<any>(this.regiServer, accountdetails).pipe(
      map(result =>{

        if(result && result.code){
          localStorage.setItem('code', result.code);
          localStorage.setItem('temp', JSON.stringify(accountdetails));
          return true;
        }
        else
          return false;
      })
    )
  }

  tempGetter(){
    let x = JSON.parse(localStorage.getItem('temp'));
    return x;
  }

  codeGetter(){
    let x = localStorage.getItem('code');
    return x;
  }

  finallyClient(){
    let x = this.tempGetter();
    return this.http.post<any>(this.verifyServer, x);
  }

  resendingVisitor(){
    let x = this.tempGetter();
    return this.http.post<any>(this.regiServer, x).pipe(
      map(result =>{
        
        if(result && result.code){
          localStorage.setItem('code', result.code);
          localStorage.setItem('temp', JSON.stringify(x));
          return true;
        }
        else
          return false;
      })
    );

  }

  
}

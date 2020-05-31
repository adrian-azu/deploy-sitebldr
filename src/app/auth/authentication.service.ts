import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authServer = "http://localhost:8080/backsite/login-api.php"

  constructor(private http: HttpClient) { }

  signIn(logindetails){
    return this.http.post<any>(this.authServer, logindetails).pipe(
      map(data => {
        if(data && data.jwt){
          console.log(data);
          localStorage.setItem('token', data.jwt);
          return true;
        }
        else
          return false;
      })
    )
  }

  currentRoleGetter(){
    const token = localStorage.getItem('token');
    
    if(token){
      const decodedToken = jwt_decode(token);
      const tokenPayload = decodedToken['data'];
      console.log(tokenPayload.role);
      return tokenPayload.role
    }
    else
      return null;
  }


  




}

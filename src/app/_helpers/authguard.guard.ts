import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { AuthenticationService } from '../auth/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(public auth: AuthenticationService, public router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot): boolean {
  
    const expectedRole = route.data.expectedRole;
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    const tokenPayload = decodedToken['data'];
    
    if(this.auth.isAuthenticated() === true){
      if(tokenPayload.role === expectedRole){
        return true;
      }
      else{
        this.router.navigateByUrl('/'+ tokenPayload.role);
        return false;
      }
    }
  }
}

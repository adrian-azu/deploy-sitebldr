import { Injectable } from '@angular/core';
import { AuthenticationService } from '../auth/authentication.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    let currentUser = this.auth.currentUserValue;
    if (currentUser && currentUser.token) {
        request = request.clone({
            setHeaders: { 
                Authorization: `Bearer ${currentUser.token}`
            }
        });
    }
    return next.handle(request);
  }
}

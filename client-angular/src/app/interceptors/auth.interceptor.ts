import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpEvent, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import {Observable} from "rxjs";
import { tap, catchError } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const user = this.authService.userValue;
    const isLoggedIn = user && user.token;
    let authReq = req;

    if (isLoggedIn) {
      authReq = req.clone({ 
        headers: req.headers.set('Authorization', user.token)
      });
    }

    return next.handle(authReq).pipe(
      catchError(
        err =>
          new Observable<HttpEvent<any>>(observer => {
            if (err instanceof HttpErrorResponse) {
              const errResp = <HttpErrorResponse>err;
              if ((errResp.status === 401) || (errResp.status === 403)) {
                this.authService.logout();
              }
            }
            observer.error(err);
            observer.complete();
          })
      )
    );      
  }
}
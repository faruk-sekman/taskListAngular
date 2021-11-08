import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';


import { environment } from '../../../../environments/environment';
import { AuthenticationService } from '../../_services/authentication.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    request = request.clone({
      headers,
      responseType: 'json',
      withCredentials: false
    });

    const user = this.authenticationService.userValue;
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(environment.apiAuthUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((err: any) => {
        return throwError(err);
      })
    );

  }
}

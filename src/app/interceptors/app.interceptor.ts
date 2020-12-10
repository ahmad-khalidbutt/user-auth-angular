import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(public auth: AuthService) {}
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let apiToken = localStorage.getItem('auth_tkn');
    if (apiToken) {
      return next.handle(
        httpRequest.clone({
          setHeaders: { Authorization: this.auth.getToken() },
        })
      );
    } else {
      return next.handle(httpRequest);
    }
  }
}

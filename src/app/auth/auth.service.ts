import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp!: number;
  username!: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private uriseg = 'http://localhost:4000/users';
  private decodedToken: any;

  constructor(private http: HttpClient) {
    let authMeta = localStorage.getItem('auth_meta');
    this.decodedToken = JSON.parse(authMeta) || new DecodedToken();
  }

  public register(userData: any): Observable<any> {
    const URI = this.uriseg + '/register';
    return this.http.post(URI, userData);
  }

  public login(userData: any): Observable<any> {
    const URI = this.uriseg + '/authenticate';
    return this.http.post(URI, userData).pipe(
      map((token) => {
        return this.saveToken(token);
      })
    );
  }

  private saveToken(token: any): any {
    this.decodedToken = jwt.decodeToken(token.token);
    this.decodedToken.username = token.username;
    localStorage.setItem('auth_tkn', token.token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  public logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedToken.exp));
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

  public getToken(): any {
    let authToken = localStorage.getItem('auth_tkn');
    if (authToken) {
      return `Bearer ${authToken}`;
    }
  }
}

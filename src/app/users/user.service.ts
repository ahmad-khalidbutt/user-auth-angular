import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private uriseg = 'http://localhost:4000/users';

  constructor(private http: HttpClient) {}
  public getUsers(): Observable<any> {
    const URI = this.uriseg + '/';
    return this.http.get(URI).pipe(
      map((users) => {
        return users;
      })
    );
  }

  public deleteUser(id: number): Observable<any> {
    const URI = `${this.uriseg}/${id}`;
    return this.http.delete(URI);
  }

  public getCurrentUser(): Observable<any> {
    const URI = this.uriseg + '/current';
    return this.http.get(URI).pipe(
      map((user) => {
        return user;
      })
    );
  }

  public updateUser(id, userData): Observable<any> {
    const URI = `${this.uriseg}/${id}`;
    return this.http.put(URI, userData);
  }
}

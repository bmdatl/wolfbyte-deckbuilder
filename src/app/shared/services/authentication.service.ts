import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { LocalStorageService } from './local-storage.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
  constructor(
    private http: Http,
    private ls: LocalStorageService
  ) { }

  login(email: string, password: string) {
    return this.http.post('/users/authenticate', { email: email, password: password })
      .map((response: Response) => {
        // login successful if jwt token in response
        let user = response.json();
        if (user && user.token) {
          // store user and jwt in local storage to keep user logged in
          this.ls.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  logout() {
    this.ls.removeItem('currentUser');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $authObservable : Subject<any> = new Subject();

  constructor(private _httpClient : HttpClient,
              private _router : Router,
              private _cookieService : CookieService) { }

  signup(authDetails : any) {
    this._httpClient.post('http://localhost:3000/signup', authDetails).subscribe((data: any) => {
      // console.log(data);
      this._router.navigate(['/login']);
    });
  }  

  login(authDetails : any) {
    this._httpClient.post('http://localhost:3000/login', authDetails).subscribe((data: any) => {
      if (data.isLoggedIn) {
        this._cookieService.set('token', data.token);
        this.$authObservable.next(true);
        this._router.navigate(['/home']);
      } else {
        alert("Invalid username/password!")
      };
    });
  }

  logout() {
    this._cookieService.delete('token');
    this.$authObservable.next(false);
    this._router.navigate(['/login']);
  }

  checkUserStatus() {
    return this._cookieService.get('token');
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLoggedIn : boolean = false;

  constructor(private _authService : AuthService) { }

  ngOnInit() {
    if (this._authService.checkUserStatus()) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
    this._authService.$authObservable.subscribe((data) => {
      this.isLoggedIn = data;
    })
  }

  logout() {
    this._authService.logout();
  }
}

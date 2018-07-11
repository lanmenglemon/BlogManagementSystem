import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [AuthService]
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;

  constructor(private _authService : AuthService, private _formBuilder : FormBuilder) { }

  ngOnInit() {
    this.signupForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signup() {
    this._authService.signup(this.signupForm.value);
  }
}

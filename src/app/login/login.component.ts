import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogin: boolean;
  isRegister: boolean;
  registerForm: FormGroup;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.registerForm = this.fb.group({
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    });
    this.loginForm = this.fb.group({
      account: '',
      password: ''
    });
  }

  ngOnInit() {
    this.isLogin = true;
    this.isRegister = false;
  }

  // show registration form and hide login form
  newAccount() {
    this.isLogin = false;
    this.isRegister = true;
    this.registerForm = this.createRegistrationForm();
    // return false to prevent default action of going to the href
    return false;
  }

  // show login form and hide registration form
  returningAccount() {
    this.isLogin = true;
    this.isRegister = false;
    this.loginForm = this.createLoginForm();
    // return false to prevent default action of going to the href
    return false;
  }

  createRegistrationForm() {
    return this.fb.group({
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    })
  }

  createLoginForm() {
    return this.fb.group({
      account: '',
      password: ''
    })
  }

  login(form) {
    let formValues = form.value;
    console.log(formValues);
  }

  createAccount(form) {
    let formValues = form.value;
    console.log(formValues);
  }



}

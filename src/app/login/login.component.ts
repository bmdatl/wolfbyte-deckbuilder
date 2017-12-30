import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { User } from '../shared/entities/user';

import { AlertService } from '../shared/services/alert.service';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UserService } from '../shared/services/user.service';

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

  doLogout: false;

  returnUrl: string;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
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
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.route.data['value'].logout) {
      this.logout();
    }
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
    let email = formValues.account,
        password = formValues.password;

    this.loading = true;
    this.authService.login(email, password)
      .subscribe(user => {
        this.router.navigate(['home']);
      },
        err => {
          this.alertService.error(err);
          this.loading = false;
        });

  }

  logout() {
    this.authService.logout();
  }

  createAccount(form) {
    this.loading = true;
    let formValues = form.value;
    delete formValues['passwordConfirmation'];

    this.userService.create(formValues)
      .subscribe(user => {
        this.alertService.success('Registration successful', true);
        this.router.navigate(['/search']);
      },
      err => {
        this.alertService.error(err);
        this.loading = false;
      });
  }



}

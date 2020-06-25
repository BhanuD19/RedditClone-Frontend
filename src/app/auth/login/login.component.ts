import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginRequestPayload} from './login-request.payload';
import {AuthService} from '../shared/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload
  isError: boolean;
  registerSuccessMessage: string;

  constructor(private authService: AuthService, private router: Router,
              private toastr: ToastrService, private activatedRoute: ActivatedRoute) {
    this.loginRequestPayload = {
      username : '',
      password : ''
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.activatedRoute.queryParams.subscribe(params => {
      if(params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup successful');
        this.registerSuccessMessage = 'Please check your inbox for activation mail'
          + ' and activate your account before you login!';
      }
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
      console.log('Login Successful');
      if (data) {
        this.isError = false;
        this.router.navigateByUrl('');
        this.toastr.success('Login Successful');
      }
    }, error => {
      this.isError = true;
      throwError(error);
    });
  }
}

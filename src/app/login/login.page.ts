import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  ngOnInit() {}

  logIn(email, password) {
    this.authService
      .SignIn(email.value, password.value)
      .then((res) => {
        setTimeout(() => {
          if (this.authService.isEmailVerified) {
            this.router.navigate(['']);
          } else {
            window.alert('Email is not verified');
            return false;
          }
        }, 100);
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
}

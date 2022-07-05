import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogin(form : NgForm): void {
    const value = form.value;
    const { email, password} = value;
    this.authService.signIn(email, password);
  }

  onGoogleLogin() :void {
    this.authService.googleAuth()
  }
}

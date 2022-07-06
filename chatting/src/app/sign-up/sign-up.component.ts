import {Component, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
  }

  onSignUp(form: NgForm): void {
    const value = form.value;
    const {email, password, displayName} = value;
    this.authService.signUp(email, password, displayName).then(_ => {
      form.onReset();
    });
  }

}

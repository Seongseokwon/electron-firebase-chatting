import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'chatting';
  isLogin =false;

  userInfoSubscription!: Subscription;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.userInfoSubscription = this.authService.userLoginSubscription.subscribe(res => {
      this.isLogin = res !== null
    })
  }

  onLogout(): void {
    this.authService.signOut();
  }
}

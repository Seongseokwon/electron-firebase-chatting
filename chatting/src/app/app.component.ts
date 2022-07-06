import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Subscription} from "rxjs";
import {User} from "./shared/services/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'chatting';
  isLogin = false;

  userInfo: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    isLogin: false
  }
  userInfoSubscription!: Subscription;

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.userLoginSubscription.next('');
    this.userInfoSubscription = this.authService.userLoginSubscription.subscribe(res => {
      if(res !== null && res !== undefined) {
        const user: User = {
          uid : res.uid,
          isLogin: res.isLogin,
          photoURL: res.photoURL,
          displayName: res.displayName,
          email: res.email,
        }
        this.userInfoSetting(user);
        this.isLogin = true;
      }else {
        this.isLogin =false;
      }

    })
  }

  userInfoSetting(user: User): void {
    this.userInfo = user;
  }

  onLogout(): void {
    this.authService.signOut(this.userInfo.uid);
  }
}

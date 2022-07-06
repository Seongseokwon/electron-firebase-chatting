import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {User} from "../shared/services/user";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {

  myInfo: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    isLogin: false
  }
  userInfoSubscription!: Subscription;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userLoginSubscription();
  }

  ngOnDestroy() :void{
    this.userInfoSubscription.unsubscribe();
  }

  userLoginSubscription() :void {
    this.userInfoSubscription = this.authService.userLoginSubscription.subscribe(res => {
      if(res !== null && res !== undefined){
        this.myInfo = {
          uid: res.uid,
          isLogin: res.isLogin,
          photoURL: res.photoURL,
          displayName: res.displayName,
          email: res.email,
        };

        console.log(this.myInfo.photoURL);
      }
    });
  }
}

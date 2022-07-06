import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Observable, Subscription} from "rxjs";
import {User} from "./shared/services/user";
import {AngularFireDatabase, AngularFireObject} from "@angular/fire/compat/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'chatting';
  isLogin = false;

  userInfo: User = {
    uid: '',
    email: '',
    displayName: '',
    photoURL: '',
    isLogin: false
  }
  usersRef!: AngularFireObject<any>;
  userList!: Observable<any[]>;
  userInfoSubscription!: Subscription;

  constructor(
    public db : AngularFireDatabase,
    private authService: AuthService
  ) {
  }


  ngOnInit(): void {
    // this.usersRef = this.db.object('user');
    // this.usersRef.snapshotChanges().subscribe(action => {
    //   console.log(action.type);
    //   console.log(action.key);
    //   console.log(action.payload.val());
    // })

    this.userLoginSubscription();
  }

  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }

  // 현재 로그인한 사용자 정보를 변수에 담아준다.
  userInfoSetting(user: User): void {
    this.userInfo = user;
  }

  // 로그인 여부를 판단하기 위한 subscription 을 실행시키고,
  // 정보를 userInfoSetting 함수로 전달 해 준다.
  userLoginSubscription() :void {
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
        this.isLogin = res.isLogin;
      }else {
        this.isLogin =false;
      }
    });
  }

  // 로그아웃
  onLogout(): void {
    this.authService.signOut(this.userInfo.uid);
  }
}

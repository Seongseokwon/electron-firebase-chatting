import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import * as auth from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    })
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        window.alert(error.message);
      })
  }

  signUp(email: string, password: string){
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        console.log(result);
      })
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then(res => {
      console.log(res);
    })
  }

  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        window.alert(error);
      })
  }


}

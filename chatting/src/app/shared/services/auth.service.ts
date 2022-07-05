import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import * as auth from 'firebase/auth';
import {User} from "./user";
import {BehaviorSubject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;
  userLoginSubscription = new BehaviorSubject<any>(null);

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        console.log(user);
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
        this.userLoginSubscription.next(result.user);
        this.setUserData(result.user);
        this.ngZone.run(() => {
          this.router.navigate(['chatting']);
        })

      })
      .catch(error => {
        window.alert(error.message);
      })
  }

  signUp(email: string, password: string){
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.setUserData(result.user);
      })
      .catch(error => {
        window.alert(error.message);
      })
  }

  googleAuth() {
    return this.authLogin(new auth.GoogleAuthProvider()).then(res => {
      console.log(res);
    })
  }

  setUserData(user: any) {
    console.log(user);
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData : User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }

    return userRef.set(userData, {
      merge: true
    })
  }

  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(result => {
        this.setUserData(result.user);
      })
      .catch(error => {
        window.alert(error);
      })
  }

  signOut()  {
    return this.afAuth.signOut().then(() => {
      this.userLoginSubscription.next(null);
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }


}

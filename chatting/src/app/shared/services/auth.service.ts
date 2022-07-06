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

        this.userData = user;
        this.userData['isLogin'] = true;
        this.userLoginSubscription.next(this.userData);
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
        const userInfo: User = {
          uid: result.user?.uid!,
          isLogin: true,
          photoURL: result.user?.photoURL!,
          displayName: result.user?.displayName!,
          email: result.user?.email!,
        }
        this.setUserData(userInfo);
        this.ngZone.run(() => {
          this.router.navigate(['user']);
        });

      })
      .catch(error => {
        window.alert(error.message);
      })
  }

  signUp(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        const userInfo: User = {
          uid: result.user?.uid!,
          isLogin: false,
          photoURL: result.user?.photoURL!,
          displayName: result.user?.displayName!,
          email: result.user?.email!,
        }
        this.setUserData(userInfo);
        this.ngZone.run(() => {
          this.router.navigate(['sign-in']);
        })
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

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      isLogin: user.isLogin
    }

    return userRef.set(userData, {
      merge: true
    })
  }

  authLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then(result => {
        const userInfo: User = {
          uid: result.user?.uid!,
          isLogin: true,
          photoURL: result.user?.photoURL!,
          displayName: result.user?.displayName!,
          email: result.user?.email!,
        }
        this.setUserData(userInfo);
        this.ngZone.run(() => {
          this.router.navigate(['user']);
        })
      })
      .catch(error => {
        window.alert(error);
      })
  }

  signOut(uid: string) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${uid}`
    );
    userRef.update({isLogin : false});
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
  }


}

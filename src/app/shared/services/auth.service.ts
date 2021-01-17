import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData?: any;
  userUID?: any;
  userEmail?: any;

  constructor(
    private afAuth: AngularFireAuth,
    private ngZone: NgZone,
    private router: Router,
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.userData = user;
      if(user) {
        localStorage.setItem('user', JSON.stringify(user));
        // JSON.parse(localStorage.getItem('user'));
        console.log(user.uid);
        this.userUID = user.uid;
        this.userEmail = user.email;
      } else {
        localStorage.setItem('user', null);
        // JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  async signIn(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
    } catch(error) {
      window.alert(error.message);
    }
  }

  async signUp(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        window.alert('Successfully registered!');
        this.emailVerification();
      });
    } catch(error) {
      window.alert(error.message);
    }
  }


  get isLoggedIn(): boolean {
    console.log(this.userData);
    console.log(this.userUID);
    return (this.userData !== null) ? true : false;
    // && this.userData.emailVerified === true
  }

  async emailVerification() {
    try {
      (await this.afAuth.currentUser).sendEmailVerification();
      this.ngZone.run(() => {
        this.router.navigate(['email-verification']);
      });
    } catch(error) {
      window.alert(error.message);
    }
  }

  async forgotPassword(email: string) {
    console.log(email);
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      window.alert('Password reset email has been sent!');
      this.ngZone.run(() => {
        this.router.navigate(['login']);
      })
    } catch(error) {
      window.alert(error.message);
    }
  }

  async signOut() {
    try {
      await this.afAuth.signOut();
      this.ngZone.run(() => {
        this.router.navigate(['login']);
      });
    } catch(error) {
      window.alert(error.message);
    }
  }
}

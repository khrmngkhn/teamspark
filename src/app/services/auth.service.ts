import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {}

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signup(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  getUser() {
    return this.auth.currentUser; // Mevcut kullanıcıyı almak için
  }
}

import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { doc, setDoc,getDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private auth: Auth, private firestore: Firestore) {
    // Mevcut kullanıcıyı izlemek için BehaviorSubject kullanıyoruz.
    this.currentUserSubject = new BehaviorSubject<any>(this.auth.currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // Giriş yapma
  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.currentUserSubject.next(userCredential.user); // Giriş yapan kullanıcıyı güncelle
      return userCredential;
    } catch (error) {
      console.error('Login failed', error);
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  }

  // Kayıt olma
  async signup(email: string, password: string) {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      await setDoc(doc(this.firestore, "users", userCredential.user.uid), {
        email: email,
        createdAt: new Date()
      });
      this.currentUserSubject.next(userCredential.user); // Kayıtlı kullanıcıyı güncelle
      return userCredential;
    } catch (error) {
      console.error('Signup failed', error);
      throw error; // Hata durumunda hatayı fırlatıyoruz
    }
  }

  // Mevcut kullanıcıyı al
  getUser() {
    return this.auth.currentUser;
  }

  // Çıkış yapma
  async logout() {
    try {
      await this.auth.signOut();
      this.currentUserSubject.next(null); // Çıkış yaptıktan sonra kullanıcıyı null yapıyoruz
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  async getUserFromFirestore() {
    const user = this.auth.currentUser;
    if (user) {
      const userRef = doc(this.firestore, 'users', user.uid); // Kullanıcı verilerini almak için 'users' koleksiyonunda arama yapıyoruz
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        return docSnap.data(); // Kullanıcı verilerini döndürüyoruz
      } else {
        console.log('No such document!');
        return null;
      }
    } else {
      console.log('No user is signed in.');
      return null;
    }
  }

  async updateUserInfo(newData: any) {
    const user = this.auth.currentUser;
    if (user) {
      const userRef = doc(this.firestore, 'users', user.uid); // Kullanıcı verilerini güncellemek için
      await setDoc(userRef, newData, { merge: true }); // Mevcut verilerle birleştirerek güncelleme yapıyoruz
    }
  }

}

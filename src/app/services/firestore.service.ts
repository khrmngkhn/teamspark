import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service'; // Firebase Auth Servisi

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: Firestore, private authService: AuthService) {}

  async addUserToFirestore(email: string, group: string, subgroup: string) {
    const user = this.authService.getUser(); // Kullanıcı bilgisi Firebase Auth'dan alınıyor
    try {
      await addDoc(collection(this.firestore, 'users'), {
        uid: user?.uid,
        email: email,
        group: group,
        subgroup: subgroup,
      });
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }
}

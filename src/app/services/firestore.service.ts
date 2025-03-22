import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc,updateDoc ,doc,getDoc,query,orderBy,limit,getDocs} from '@angular/fire/firestore';
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
  async updateUser(userId: string, points: number) {
    const userRef = doc(this.firestore, 'users', userId);
    try {
      await updateDoc(userRef, {
        totalPoints: points
      });
      console.log("Kullanıcı bilgisi güncellendi.");
    } catch (e) {
      console.error("Kullanıcı güncellenirken hata oluştu:", e);
    }
  }

 
  async getUserInfo(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        console.log("Kullanıcı verisi:", docSnap.data());
      } else {
        console.log("Kullanıcı bulunamadı.");
      }
    } catch (e) {
      console.error("Kullanıcı bilgileri alınırken hata oluştu:", e);
    }
  }

  async addPointsToUser(userId: string, points: number) {
    try {
      const userRef = doc(this.firestore, 'users', userId);
      await updateDoc(userRef, {
        totalPoints: points
      });
      console.log("Puanlar başarıyla eklendi.");
    } catch (e) {
      console.error("Puan eklenirken hata oluştu:", e);
    }
  }
  
  async createWeeklyTask(taskName: string, points: number) {
    try {
      const taskRef = await addDoc(collection(this.firestore, 'tasks'), {
        taskName,
        points,
        completed: false
      });
      console.log("Görev başarıyla oluşturuldu:", taskRef.id);
    } catch (e) {
      console.error("Görev oluşturulurken hata oluştu:", e);
    }
  }
//Ödül Ekleme 
async addReward(userId: string, rewardName: string, pointsRequired: number) {
  try {
    const rewardRef = await addDoc(collection(this.firestore, 'rewards'), {
      userId,
      rewardName,
      pointsRequired
    });
    console.log("Ödül başarıyla eklendi:", rewardRef.id);
  } catch (e) {
    console.error("Ödül eklenirken hata oluştu:", e);
  }
}

//Haftalık Aylık Ödül Tablosu
async getWeeklyLeaderboard() {
  const q = query(collection(this.firestore, 'users'), orderBy("totalPoints", "desc"), limit(10));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}
}

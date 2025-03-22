import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FirestoreService } from '../../services/firestore.service';
import {FormsModule} from '@angular/forms'

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {
  email: string = '';
  password: string = '';
  group: string = '';
  subgroup: string = '';

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  register() {
    this.authService.signup(this.email, this.password).then(() => {
      // Kullanıcı kaydını tamamladıktan sonra Firestore'a da ekle
      this.firestoreService.addUserToFirestore(this.email, this.group, this.subgroup);
    }).catch(err => {
      console.error('Error signing up', err);
    });
  }

}

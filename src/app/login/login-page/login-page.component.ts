import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from'@angular/forms'
import { RouterModule } from '@angular/router';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';  // Firestore servisi


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule,RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  async login() {
    debugger
    try {
      await this.authService.login(this.email, this.password);
      // Giriş başarılı olduğunda yönlendirme yapabilirsiniz
      alert("Giriş Yapıldı")
    } catch (error) {
      console.error('Login error: ', error);
    }
  }

  async signup() {
    debugger
    try {
      await this.authService.signup(this.email, this.password);
      // Kayıt başarılı olduğunda yönlendirme yapabilirsiniz
      alert("Kayıt Başarılı")
    } catch (error) {
      console.error('Signup error: ', error);
    }
  }
}
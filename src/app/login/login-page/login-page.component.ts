import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {FormsModule} from'@angular/forms'

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password).catch(err => {
      console.error('Login failed', err);
    });
  }

}

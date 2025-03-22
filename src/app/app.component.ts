import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports:[RouterModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    this.authService.currentUser.subscribe(user => {
      debugger
      this.currentUser = user;
    });
   }
  title = 'teamspark';
  
}
 
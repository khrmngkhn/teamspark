import { Routes } from '@angular/router';
import { LoginPageComponent } from './login/login-page/login-page.component';
 
export const routes: Routes = [
    {path: 'login', component: LoginPageComponent},
    // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, // AuthGuard ile korunan sayfa

 ];

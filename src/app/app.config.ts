import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';  // Firebase Auth sağlamak için
import { environment } from '../environment/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // Firestore'u sağlamak için

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment.firebase)), // Firebase app'ı sağla
    provideAuth(() => getAuth()), // Firebase Auth'u sağla
    provideFirestore(() => getFirestore()) // Firestore sağlama

  ]
};

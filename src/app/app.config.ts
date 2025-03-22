import { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { initializeApp } from 'firebase/app'; // FirebaseApp için doğru import
import { getAuth } from 'firebase/auth'; // FirebaseAuth için doğru import
import { getFirestore } from 'firebase/firestore'; // FirebaseFirestore için doğru import
import { environment } from '../environment/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: 'FirebaseApp', // 'FirebaseApp' yerine bir string kullanabiliriz
      useFactory: () => initializeApp(environment.firebase),
    },
    {
      provide: 'FirebaseAuth', // 'FirebaseAuth' yerine bir string kullanabiliriz
      useFactory: () => getAuth(),
    },
    {
      provide: 'FirebaseFirestore', // 'FirebaseFirestore' yerine bir string kullanabiliriz
      useFactory: () => getFirestore(),
    }
  ]
};

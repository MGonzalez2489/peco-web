import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from '@core/interceptors';
import { RequestService } from '@core/services/_request.service';
import { PecoStoreProvider } from '@store/store.module';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideExperimentalZonelessChangeDetection(),

    //
    RequestService,
    //
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,

        options: {
          darkModeSelector: 'none',
        },
      },
    }),
    ...PecoStoreProvider,
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};

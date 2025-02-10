import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { RequestService } from '@core/services/_request.service';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { PecoStoreProvider } from '@store/store.module';
import { jwtInterceptor } from '@core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideExperimentalZonelessChangeDetection(),

    //
    RequestService,
    //
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
    ...PecoStoreProvider,
  ],
};

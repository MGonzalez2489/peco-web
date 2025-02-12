import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '@store/reducers';

// export const userDataResolver: ResolveFn<boolean> = (route, state) => {
//   return true;
// };
export const userDataResolver: ResolveFn<boolean> = (route, state) => {
  store$ = inject(Store<AppState>);
};

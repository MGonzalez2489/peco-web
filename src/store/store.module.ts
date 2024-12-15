import { NgModule } from '@angular/core';
import { environment } from '@envs/environment';

//ngrx
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppReducers } from './reducers';
import { AppEffects } from './effects';

let imports: any = [
  StoreModule.forRoot(AppReducers),
  EffectsModule.forRoot(AppEffects),
];
let providers: any[] = [];
let declarations: any[] = [];

if (!environment.production) {
  imports = [...imports, StoreDevtoolsModule.instrument({ maxAge: 500 })];
}

@NgModule({
  imports,
  providers,
  declarations,
})
export class AppStoreModule {}

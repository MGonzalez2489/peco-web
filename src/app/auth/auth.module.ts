import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { RegisterComponent } from './pages/register/register.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const matControls = [MatFormFieldModule, MatInputModule, MatButtonModule];

@NgModule({
  declarations: [SignInComponent, RegisterComponent],
  imports: [CommonModule, AuthRoutingModule, ReactiveFormsModule, matControls],
})
export class AuthModule {}

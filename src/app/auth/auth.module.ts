import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PruebasPageComponent } from './pages/pruebas-page/pruebas-page.component';



@NgModule({
  declarations: [
    RegisterPageComponent,
    LoginPageComponent,
    LayoutPageComponent,
    PruebasPageComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
  ]
})
export class AuthModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { PruebasPageComponent } from './pages/pruebas-page/pruebas-page.component';

const routes: Routes = 
[
  {
    path: '',
    component: LayoutPageComponent,
    children: 
    [
      {path: 'register', component: RegisterPageComponent},
      {path: 'pruebas', component: PruebasPageComponent},
      {path: 'login', component: LoginPageComponent},
      {path: '**', redirectTo: 'register'},
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

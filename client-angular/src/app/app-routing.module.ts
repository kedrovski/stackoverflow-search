import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RestoreComponent } from './components/restore/restore.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from '../app/services/auth.guard';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent 
  },
  { 
    path: 'signup', 
    component: SignupComponent 
  },
  { 
    path: 'restore',
    component: RestoreComponent
  },
  {
    path: 'search',
    canActivate: [AuthGuard],
    loadChildren: () => import('./search/search.module').then(m => m.SearchModule)
  },

  // otherwise redirect to login
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindComponent } from './find/find.component';
import { StackauthComponent } from './stackauth/stackauth.component';
import { ResultComponent } from './result/result.component';
import { InfoComponent } from './info/info.component'


const routes: Routes = [
  { path: '', component: FindComponent },
  { path: 'auth', component: StackauthComponent },
  { path: 'result/:query', component: ResultComponent },
  { path: 'info/:id', component: InfoComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }

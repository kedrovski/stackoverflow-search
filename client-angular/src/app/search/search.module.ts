import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { FindComponent } from './find/find.component';
import { StackauthComponent } from './stackauth/stackauth.component';
import { ResultComponent } from './result/result.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { InfoComponent } from './info/info.component';


@NgModule({
  declarations: [FindComponent, StackauthComponent, ResultComponent, SidebarComponent, InfoComponent],
  imports: [
    CommonModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }

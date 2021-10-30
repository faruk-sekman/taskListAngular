import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from "../../_core/shared.module";
import {NgxPaginationModule} from 'ngx-pagination';

import {VoteService} from '../../_core/_services/vote.service';

import {HomeComponent} from './home.component';
import {ItemListComponent} from '../item-list/item-list.component';
import {PopupComponent} from '../common/popup/popup.component';
import { VoteBoxComponent } from '../vote-box/vote-box.component';


@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SharedModule,
    NgxPaginationModule
  ],
  exports: [
    CommonModule, FormsModule, ItemListComponent
  ],
  declarations: [
    HomeComponent,
    ItemListComponent,
    PopupComponent,
    VoteBoxComponent
  ],
  providers: [
    VoteService
  ]
})
export class HomeModule {
}

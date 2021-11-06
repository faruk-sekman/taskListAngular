import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";

import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';
import {NgxPaginationModule} from 'ngx-pagination';

// components
import {HeaderComponent} from '../components/common/header/header.component';
import {NotificationComponent} from '../components/common/notification/notification.component';
import {PopupComponent} from '../components/common/popup/popup.component';
import { LoadingComponent } from '../components/common/loading/loading.component';
import { VoteBoxComponent } from '../components/common/vote-box/vote-box.component';
import { ItemListComponent } from '../components/item-list/item-list.component';


// _services
import {VotesDataService} from './_services/votes-data.service';
import {VoteService} from './_services/vote.service';
import {GlobalService} from './_services/global.service';

@NgModule({
  imports: [
    CommonModule, RouterModule, NgxPaginationModule, FormsModule,
    HttpClientInMemoryWebApiModule.forRoot(
      VotesDataService, {dataEncapsulation: false},
    )
  ],
  declarations: [
    NotificationComponent,
    HeaderComponent,
    LoadingComponent,
    VoteBoxComponent,
    ItemListComponent,
    PopupComponent
  ],
  exports: [
    CommonModule, RouterModule, FormsModule, HeaderComponent, NotificationComponent, LoadingComponent, VoteBoxComponent, PopupComponent, ItemListComponent
  ]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: SharedModule
      , providers: [
        VoteService,
        GlobalService
      ]
    }
  }
}

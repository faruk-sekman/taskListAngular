import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api';

// components
import {HeaderComponent} from '../components/common/header/header.component';
import {NotificationComponent} from '../components/common/notification/notification.component';
import { LoadingComponent } from '../components/common/loading/loading.component';


// _services
import {InMemoryDataService} from './_services/in-memory-data.service';
import {VoteService} from './_services/vote.service';
import {GlobalService} from './_services/global.service';

@NgModule({
  imports: [
    CommonModule, RouterModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, {dataEncapsulation: false}
    )
  ],
  declarations: [
    NotificationComponent,
    HeaderComponent,
    LoadingComponent
  ],
  exports: [
    CommonModule, RouterModule, HeaderComponent, NotificationComponent, LoadingComponent
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

import {NgModule} from '@angular/core';

import {HomeRoutingModule} from './home-routing.module';
import {SharedModule} from "../../_core/shared.module";

import {HomeComponent} from './home.component';


@NgModule({
  imports: [
    HomeRoutingModule,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
  ]
})
export class HomeModule {
}

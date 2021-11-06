import {NgModule} from '@angular/core';

import {MyVotedRoutingModule} from './my-voted-routing.module';
import {SharedModule} from "../../_core/shared.module";

import {MyVotedComponent} from './my-voted.component';


@NgModule({
  imports: [
    MyVotedRoutingModule,
    SharedModule,
  ],
  declarations: [
    MyVotedComponent
  ],
  providers: [
  ]
})
export class MyVotedModule {
}

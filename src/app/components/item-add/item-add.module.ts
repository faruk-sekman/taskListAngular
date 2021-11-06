import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {SharedModule} from '../../_core/shared.module';
import {ItemAddRoutingModule} from './item-add-routing.module';


import {ItemAddComponent} from './item-add.component';

@NgModule({
  imports: [
    CommonModule,
    ItemAddRoutingModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    CommonModule, FormsModule
  ],
  declarations: [
    ItemAddComponent
  ],
  providers: [
  ]
})
export class ItemAddModule {
}

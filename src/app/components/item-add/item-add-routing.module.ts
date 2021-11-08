import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ItemAddComponent} from './item-add.component';
import {AuthGuard} from "../../_core/_helpers/auth.guard";
import {RoleModel} from "../../_core/_models/role.model";

const routes: Routes = [
  {
    path: '', component: ItemAddComponent,
    canActivate: [AuthGuard],
    data: { roles: [RoleModel.Admin] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemAddRoutingModule {
}

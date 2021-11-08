import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyVotedComponent} from './my-voted.component';
import {AuthGuard} from "../../_core/_helpers/auth.guard";
import {RoleModel} from "../../_core/_models/role.model";

const routes: Routes = [
  {
    path: '', component: MyVotedComponent,
    canActivate: [AuthGuard],
    data: { roles: [RoleModel.Admin, RoleModel.User] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyVotedRoutingModule {
}

import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MyVotedComponent} from './my-voted.component';

const routes: Routes = [
  {
    path: '', component: MyVotedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyVotedRoutingModule {
}

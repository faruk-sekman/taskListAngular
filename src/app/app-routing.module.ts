import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';

import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'votes',
    pathMatch: 'full'
  },
  {
    path: 'votes',
    loadChildren: () => import('./components/home/home.module').then(mod => mod.HomeModule)
  },
  {
    path: 'item',
    loadChildren: () => import('./components/item/item-add.module').then(mod => mod.ItemAddModule)
  },
  {
    path: 'my-voted',
    loadChildren: () => import('./components/my-voted/my-voted.module').then(mod => mod.MyVotedModule)
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent
  },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {
}

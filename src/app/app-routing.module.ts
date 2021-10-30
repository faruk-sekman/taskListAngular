import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './components/common/page-not-found/page-not-found.component';

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
    path: 'item-add',
    loadChildren: () => import('./components/item-add/item-add.module').then(mod => mod.ItemAddModule)
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

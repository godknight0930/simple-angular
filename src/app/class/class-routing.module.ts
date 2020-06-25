import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassComponent } from './class.component';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
  { path: 'view/:id', loadChildren: () => import('./view/view.module').then(m => m.ViewModule) },
  { path: 'add', loadChildren: () => import('./add/add.module').then(m => m.AddModule) },
  { path: 'edit/:id', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassRoutingModule { }

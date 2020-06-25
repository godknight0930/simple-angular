import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentComponent } from './student.component';

const routes: Routes = [
  { path: '', component: StudentComponent },
  { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
  { path: 'add', loadChildren: () => import('./add/add.module').then(m => m.AddModule) },
  { path: 'edit/:id', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }

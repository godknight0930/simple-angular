import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewRoutingModule } from './view-routing.module';
import { ViewComponent } from './view.component';


@NgModule({
  declarations: [ViewComponent],
  imports: [
    CommonModule,
    ViewRoutingModule
  ]
})
export class ViewModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PiluleRoutingModule } from './pilule-routing.module';

import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PiluleRoutingModule,
    HttpClientModule
  ]
})
export class PiluleModule { }

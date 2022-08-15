import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, LandingpageComponent],
  imports: [CommonModule, SharedModule, RouterModule],
  exports: [HeaderComponent, LandingpageComponent],
})
export class CoreModule {}

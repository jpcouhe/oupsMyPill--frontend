import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SharedModule } from '../shared/shared.module';
import { LandingpageComponent } from './components/landingpage/landingpage.component';

@NgModule({
  declarations: [HeaderComponent, LandingpageComponent],
  imports: [CommonModule, SharedModule],
  exports: [HeaderComponent, LandingpageComponent],
})
export class CoreModule {}

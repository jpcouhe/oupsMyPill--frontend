import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './core/components/landingpage/landingpage.component';

const routes: Routes = [
  {
    path: 'get-started', component: LandingpageComponent
  },
  {
    path:'', redirectTo:'get-starded', pathMatch:"full"
  },
  {
    path: "**", redirectTo:'get-started'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

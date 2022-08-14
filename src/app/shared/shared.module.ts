import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './components/form/form.component';
import { CalendarComponent } from './components/calendar/calendar.component';

@NgModule({
  declarations: [FormComponent, CalendarComponent],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  exports: [MaterialModule, ReactiveFormsModule,FormComponent],
})

export class SharedModule {}
